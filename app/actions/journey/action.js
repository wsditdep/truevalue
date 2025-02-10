"use server";

import { auth } from "@/app/auth";
import { AccountChange } from "@/modals/AccountChange";
import { Commission } from "@/modals/Commission";
import { Journey } from "@/modals/Journey";
import { JourneyHistory } from "@/modals/JourneyHistory";
import { Order } from "@/modals/Order";
import { Setting } from "@/modals/Setting";
import { User } from "@/modals/User";
import { connectToDB } from "@/utils/connection";
import generateOrderId from "@/utils/generateOrderId";

export const submitJourney = async () => {
    try {
        await connectToDB();
        const { user } = await auth();

        if (!user) {
            return {
                message: `Something went wrong!`,
                status: 404,
                type: "danger"
            };
        }

        const authenticatedUser = await User.findOne({ _id: user?._id });

        if (!authenticatedUser) {
            return {
                message: `Unauthorized, data not found!`,
                status: 404,
                type: "danger"
            };
        }

        if (!authenticatedUser?.allow_rob_order) return {
            message: `Can not place your order at this time, Please contact customer care.`,
            status: 404,
            type: "danger"
        };

        if (authenticatedUser?.balance < 0) return {
            message: `Insufficient balance to place this order!`,
            status: 502,
            type: "danger"
        };

        if (authenticatedUser?.daily_available_order === authenticatedUser?.today_order) return {
            message: `Destinations completed at current tier level`,
            status: 502,
            type: "danger"
        };

        // check journey product
        let journeyProduct;
        let journeyStageArray;
        let isJourney;
        if (authenticatedUser?.journey !== null) {
            const journey = await Journey.findById(authenticatedUser?.journey);

            const userJourney = journey?.journey;
            const userCurrentStage = authenticatedUser?.today_order;

            const stages = userJourney.map(item => Number(item.stage));
            journeyStageArray = stages;

            isJourney = stages.includes(userCurrentStage);

            if (isJourney) {
                const journeyProducts = userJourney?.filter(item => Number(item.stage) === userCurrentStage);
                journeyProduct = journeyProducts[0];
            }
        }

        const journeyHistory = await JourneyHistory.findById(authenticatedUser?.journeyHistory);

        const collectAllHistory = journeyHistory?.JourneyHistory;
        const pendingProduct = collectAllHistory?.filter(product => product.status === "pending");
        const withoutPendingList = collectAllHistory?.filter(product => product.status !== "pending");

        let isPendingProductObject = pendingProduct[0];

        if (pendingProduct?.length !== 0 && isPendingProductObject && Object.keys(isPendingProductObject).length > 1) {
            const newObj = {
                ...isPendingProductObject,
                status: "completed"
            }

            const updateArray = [...withoutPendingList, newObj]

            await JourneyHistory.findByIdAndUpdate(authenticatedUser?.journeyHistory, {
                JourneyHistory: updateArray
            });
        } else {

            return {
                message: "ERROR!",
                status: 404,
                type: "danger",
            };
        }

        const commission = await Commission.findOne({ membership_name: authenticatedUser?.membership_level });
        const commissionRate = commission?.commission_rate;

        const refundAmount = isPendingProductObject?.productPrice;
        const calculateCommission = commissionRate * isPendingProductObject?.productPrice;
        const calculatedRefundAmount = authenticatedUser?.balance + refundAmount;
        const calculateStage = authenticatedUser?.today_order + 1;

        const calculateFinalBalance = calculatedRefundAmount + calculateCommission;
        // const calculateFinalCommission = authenticatedUser?.today_commission + calculateCommission;

        // let deductedAmount = Number(collectAllHistory[0].productPrice) * Number(commissionRate) || 0;
        // let calReturnAmount = authenticatedUser?.balance + authenticatedUser?.froze_amount + authenticatedUser?.today_commission;
        // let finalCalAmount = calReturnAmount - deductedAmount;

        let calBalance;
        let calFrozeAmount;
        let ticketCommission;
        var isNextJourney;

        if (isPendingProductObject?.isJourneyProduct) {

            const currentJourneyProduct = isPendingProductObject;
            const isNext = journeyStageArray[0] - currentJourneyProduct.stage;

            if (isNext !== 1) {
                // calBalance = (authenticatedUser?.froze_amount + authenticatedUser?.ticket_commission) - extraHold;
                calBalance = authenticatedUser?.froze_amount + authenticatedUser?.ticket_commission;
                calFrozeAmount = 0;
                ticketCommission = 0;
                isNextJourney = false;

                // const balanceAfterOp = authenticatedUser?.balance + authenticatedUser?.froze_amount;
                const balanceAfterOp = authenticatedUser?.froze_amount;
                await AccountChange.create({
                    username: authenticatedUser?.username,
                    phone_number: authenticatedUser?.phone_number,
                    amount: balanceAfterOp,
                    after_operation: balanceAfterOp,
                    account_type: "frozeAmount"
                });

                await AccountChange.create({
                    username: authenticatedUser?.username,
                    phone_number: authenticatedUser?.phone_number,
                    amount: authenticatedUser?.ticket_commission,
                    after_operation: calBalance,
                    account_type: "orderCommission"
                });

            } else {
                calBalance = authenticatedUser?.balance;
                calFrozeAmount = authenticatedUser?.froze_amount;
                ticketCommission = authenticatedUser?.ticket_commission;    
                isNextJourney = true;
            }

            await User.findByIdAndUpdate(authenticatedUser?._id, {
                balance: calBalance?.toFixed(2),
                today_order: calculateStage,
                froze_amount: calFrozeAmount,
                ticket_commission: ticketCommission,
            });

            // await AccountChange.create({
            //     username: authenticatedUser?.username,
            //     amount: calculateCommission,
            //     after_operation: calculateFinalBalance,
            //     account_type: "orderCommission"
            // });

            // creating orider history::begin
            const order_id_val = await generateOrderId();
            const order_amount_val = isPendingProductObject?.productPrice * commission?.ticket_commission;
            const calculated_order_amount_val = order_amount_val + isPendingProductObject?.productPrice;

            // giving the commission to upline user
            const setting = await Setting.findOne();
            const uplineCommissionRate = (setting?.first_member) / 100;

            const uplineUserCommission = isPendingProductObject?.productPrice * commission?.ticket_commission;
            const uplineFinealCommission = uplineUserCommission * uplineCommissionRate;

            const uplineUserAccount = await User.findOne({ id: authenticatedUser?.parent_id });

            await AccountChange.create({
                username: uplineUserAccount?.username,
                phone_number: uplineUserAccount?.phone_number,
                amount: uplineUserAccount?.balance,
                after_operation: uplineUserAccount?.balance + uplineFinealCommission,
                account_type: "upperUserCommission"
            });

            await User.findByIdAndUpdate(uplineUserAccount?._id, {
                balance: uplineUserAccount?.balance + uplineFinealCommission,
            });

            await Order.create({
                order_id: order_id_val,
                username: authenticatedUser?.username,
                phone_number: authenticatedUser?.phone_number,
                product_name: isPendingProductObject?.productName,
                product_price: isPendingProductObject?.productPrice,
                order_amount: calculated_order_amount_val,
                order_commission: order_amount_val,
                order_quantity: 1
            });

        } else {
            await User.findByIdAndUpdate(authenticatedUser?._id, {
                balance: calculateFinalBalance?.toFixed(2),
                today_order: calculateStage,
                // today_commission: calculateFinalCommission,
            });

            await AccountChange.create({
                username: authenticatedUser?.username,
                phone_number: authenticatedUser?.phone_number,
                amount: calculateCommission,
                after_operation: calculateFinalBalance,
                account_type: "orderCommission"
            });

            // creating orider history::begin
            const order_id_val = await generateOrderId();
            const order_amount_val = isPendingProductObject?.productPrice * commission?.commission_rate;
            const calculated_order_amount_val = order_amount_val + isPendingProductObject?.productPrice;

            // giving the commission to upline user
            const setting = await Setting.findOne();
            const uplineCommissionRate = (setting?.first_member) / 100;

            const uplineUserCommission = isPendingProductObject?.productPrice * commission?.commission_rate;
            const uplineFinealCommission = uplineUserCommission * uplineCommissionRate;

            const uplineUserAccount = await User.findOne({ id: authenticatedUser?.parent_id });

            await AccountChange.create({
                username: uplineUserAccount?.username,
                phone_number: uplineUserAccount?.phone_number,
                amount: uplineUserAccount?.balance,
                after_operation: uplineUserAccount?.balance + uplineFinealCommission,
                account_type: "upperUserCommission"
            });

            await User.findByIdAndUpdate(uplineUserAccount?._id, {
                balance: uplineUserAccount?.balance + uplineFinealCommission,
            });

            await Order.create({
                order_id: order_id_val,
                username: authenticatedUser?.username,
                phone_number: authenticatedUser?.phone_number,
                product_name: isPendingProductObject?.productName,
                product_price: isPendingProductObject?.productPrice,
                order_amount: calculated_order_amount_val,
                order_commission: order_amount_val,
                order_quantity: 1
            });

        }

        return {
            message: "Successful",
            status: 201,
            type: "success",
            isNextJourney
        };
    } catch (error) {
        console.log(error)
    }
}

export const validateStartJourney = async () => {
    try {
        await connectToDB();
        const { user } = await auth();

        if (!user) {
            return {
                message: `Something went wrong!`,
                status: 404,
                type: "danger"
            };
        }

        const authenticatedUser = await User.findOne({ _id: user?._id });

        if (!authenticatedUser) {
            return {
                message: `Unauthorized, data not found!`,
                status: 404,
                type: "danger"
            };
        }

        if (!authenticatedUser?.allow_rob_order) return {
            message: `Can not place your order at this time, Please contact customer care.`,
            status: 404,
            type: "danger"
        };

        // check order grabing allowed
        const setting = await Setting.findOne();
        const isTimeAllow = setting.is_order_grabing_allow;

        if (!isTimeAllow) return {
            message: `Can not place your order at this time, Please contact customer care.`,
            status: 404,
            type: "danger"
        };

        const commission = await Commission.findOne({ membership_name: authenticatedUser?.membership_level });
        const account_balance_limit = commission?.account_balance_limit;
        const maxStage = commission?.order_quantity;

        if (authenticatedUser?.today_order >= maxStage) {
            return {
                message: "Destinations completed at current tier level",
                status: 200,
                type: "danger"
            };
        }

        // if (authenticatedUser?.journeyHistory === null) {
        //     if (authenticatedUser?.today_order === 0) {
        //         if (authenticatedUser?.balance < account_balance_limit) {
        //             return {
        //                 message: "Insufficient balance!",
        //                 status: 404,
        //                 type: "danger"
        //             };
        //         }
        //     }
        // }

        if (authenticatedUser?.journeyHistory !== null) {
            const allUserHistoryRes = await JourneyHistory.findById(authenticatedUser?.journeyHistory);
            const allUserHistoryArray = allUserHistoryRes?.JourneyHistory;

            const isPendingHistory = allUserHistoryArray?.filter(item => item.status === "pending");
            if (isPendingHistory?.length !== 0) {
                return {
                    message: "Validation completed!",
                    status: 101,
                    type: "success"
                };
            } else {

                if (authenticatedUser?.journey !== null) {

                    const journey = await Journey.findById(authenticatedUser?.journey);
                    const userJourney = journey?.journey;
                    const userCurrentStage = authenticatedUser?.today_order;
                    const stages = userJourney.map(item => Number(item.stage));

                    let isNext = stages[0] - userCurrentStage;

                    if (userJourney?.length === 0) {
                        isNext = 14456456456;
                    }

                    if (isNext === 1) {

                    } else {
                        if (authenticatedUser?.balance < account_balance_limit) {
                            return {
                                message: "Insufficient balance!",
                                status: 404,
                                type: "danger"
                            };
                        }
                    }
                } else {
                    if (authenticatedUser?.balance < account_balance_limit) {
                        return {
                            message: "Insufficient balance!",
                            status: 404,
                            type: "danger"
                        };
                    }
                }
            }
        } else {
            if (authenticatedUser?.balance < account_balance_limit) {
                return {
                    message: "Insufficient balance!",
                    status: 404,
                    type: "danger"
                };
            }
        }

        const uplineUserAccount = await User.findOne({ id: authenticatedUser?.parent_id });

        if (!uplineUserAccount) return {
            message: "No upline user, please contact customer support!",
            status: 404,
            type: "danger"
        }

        return {
            message: "Validation completed!",
            status: 201,
            type: "success"
        };
    } catch (error) {
        console.log(error)
    }
}