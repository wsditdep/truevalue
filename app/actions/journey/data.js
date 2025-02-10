"use server";

import { Product } from "@/modals/Product"
import { auth } from "@/app/auth";
import { connectToDB } from "@/utils/connection";
import { Commission } from "@/modals/Commission";
import { User } from "@/modals/User";
import { JourneyHistory } from "@/modals/JourneyHistory";
import { Journey } from "@/modals/Journey";
import { AccountChange } from "@/modals/AccountChange";

export const fetchProduct = async () => {
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

        if (authenticatedUser?.daily_available_order === authenticatedUser?.today_order) return {
            message: `Destinations completed at current tier level`,
            status: 502,
            type: "danger"
        };

        // check journey product
        let journeyProduct;
        if (authenticatedUser?.journey !== null) {
            const journey = await Journey.findById(authenticatedUser?.journey);

            const userJourney = journey?.journey;
            const userCurrentStage = authenticatedUser?.today_order + 1;

            const stages = userJourney.map(item => Number(item.stage));

            const isJourney = stages.includes(userCurrentStage);

            if (isJourney) {
                const journeyProducts = userJourney?.filter(item => Number(item.stage) === userCurrentStage);
                journeyProduct = journeyProducts[0];
            }
        }

        const membership = await Commission.findOne({ membership_name: authenticatedUser?.membership_level });
        if (!membership) return {
            message: `Membership not found!`,
            status: 404,
            type: "danger"
        };

        var minRange = authenticatedUser?.match_min / 100;
        var maxRange = authenticatedUser?.match_max / 100

        let product;
        let products;
        let randomIndex;
        let historyProduct;

        let commission;
        let totalValue;
        let hasPendingProduct;

        if (journeyProduct?.isJourneyProduct) {
            // if journey run this 
            const checkPending = await JourneyHistory.findById(authenticatedUser?.journeyHistory);

            const collectAllProducts = checkPending?.JourneyHistory;
            hasPendingProduct = collectAllProducts?.some(product => product.status === "pending");

            if (hasPendingProduct) {
                const pendingProduct = collectAllProducts.filter(product => product.status === "pending");
                product = pendingProduct[0];
            } else {
                // calculate commission
                product = journeyProduct;

                commission = product?.productPrice * membership?.ticket_commission;
                // totalValue = product?.productPrice + commission;
                totalValue = product?.productPrice;

                // creating user journey history
                product.status = "pending"
                historyProduct = product;
            }

            if (authenticatedUser?.journeyHistory === null) {
                // connect user and journey history for the first submission
                const history = await JourneyHistory.create({
                    JourneyHistory: historyProduct
                })

                await User.findByIdAndUpdate(authenticatedUser?._id, {
                    journeyHistory: history?._id,
                });
            } else {

                // updating new submission history
                product = journeyProduct;
                const journeyHistory = await JourneyHistory.findById(authenticatedUser?.journeyHistory);

                const collectAllHistory = journeyHistory?.JourneyHistory;
                const withoutPendingList = collectAllHistory?.filter(product => product.status !== "pending");

                const createdAt = new Date();

                const newObj = {
                    ...product,
                    status: "pending",
                    createdAt: createdAt
                }
                const updateArray = [...withoutPendingList, newObj]

                await JourneyHistory.findByIdAndUpdate(authenticatedUser?.journeyHistory, {
                    JourneyHistory: updateArray
                });

                // removing the product from journey
                const journies = await Journey.findById(authenticatedUser?.journey);
                const collectAllJourney = journies?.journey;
                const removedTheUsedJourney = collectAllJourney?.filter(journey => journey._id !== product._id)

                const updatedJourneyArray = [...removedTheUsedJourney];

                await Journey.findByIdAndUpdate(authenticatedUser?.journey, {
                    journey: updatedJourneyArray
                });

            }

        } else {
            // if not journey run this 
            // check for pending product

            const checkPending = await JourneyHistory.findById(authenticatedUser?.journeyHistory);

            const collectAllProducts = checkPending?.JourneyHistory;
            hasPendingProduct = collectAllProducts?.some(product => product.status === "pending");

            if (hasPendingProduct) {
                const pendingProduct = collectAllProducts.filter(product => product.status === "pending");
                product = pendingProduct[0];
            } else {
                const pipeline = [
                    {
                        "$match": {
                            "$and": [
                                {
                                    "productPrice": {
                                        "$exists": true,
                                        "$gte": authenticatedUser?.balance * minRange,
                                        "$lte": authenticatedUser?.balance * maxRange
                                    }
                                }
                            ]
                        }
                    },
                    // {
                    //     "$sample": { "size": 1 }
                    // }
                ];

                products = await Product.aggregate(pipeline);
                let relocatePorducts = products;

                // remove the dublication
                if (checkPending !== null) {
                    const allHistoryProducts = checkPending?.JourneyHistory || [];

                    const allHistoryProductIds = allHistoryProducts.map(product => product._id.toString());
                    products = products.filter(product => !allHistoryProductIds.includes(product._id.toString()));

                    if (products?.length === 0) {
                        const allHistoryProducts = checkPending?.JourneyHistory || [];
                        const returnedIDAlt = allHistoryProducts.map(product => product._id.toString());
                        const returnedID = returnedIDAlt?.slice(-4);
                        products = relocatePorducts.filter(product => !returnedID.includes(product._id.toString()));

                        if (products?.length === 0) {
                            products = relocatePorducts
                        }
                    }
                } else {
                    products = relocatePorducts
                }

                if (authenticatedUser?.balance < membership?.account_balance_limit) {
                    return {
                        message: "Insufficient balance!",
                        status: 405,
                        type: "danger"
                    };
                }

                randomIndex = Math.floor(Math.random() * products.length);
                product = products[randomIndex];

                if (products.length === 0) return {
                    message: `Product not found!`,
                    status: 404,
                    type: "danger"
                };

                // creating user journey history
                product.status = "pending"
                historyProduct = product;
            }

            if (authenticatedUser?.journeyHistory === null) {
                // connect user and journey history for the first submission
                const history = await JourneyHistory.create({
                    JourneyHistory: historyProduct
                })

                await User.findByIdAndUpdate(authenticatedUser?._id, {
                    journeyHistory: history?._id,
                });
            } else {

                // updating new submission history
                const journeyHistory = await JourneyHistory.findById(authenticatedUser?.journeyHistory);

                const collectAllHistory = journeyHistory?.JourneyHistory;
                const withoutPendingList = collectAllHistory?.filter(product => product.status !== "pending");

                const createdAt = new Date();

                const newObj = {
                    ...product,
                    status: "pending",
                    createdAt: createdAt
                }

                const updateArray = [...withoutPendingList, newObj]

                await JourneyHistory.findByIdAndUpdate(authenticatedUser?.journeyHistory, {
                    JourneyHistory: updateArray
                });
            }

            // calculate commission

            if (product?.isJourneyProduct) {
                commission = product?.productPrice * membership?.ticket_commission;
                // totalValue = product?.productPrice + commission;
                totalValue = product?.productPrice;
            } else {
                commission = product?.productPrice * membership?.commission_rate;
                // totalValue = product?.productPrice + commission;
                totalValue = product?.productPrice;
            }
        }

        // updating the db
        let calculateBalance;
        let calculateCommission;
        let calculatedCommission

        if (hasPendingProduct) {

        } else {
            if (journeyProduct?.isJourneyProduct) {

                let deduction = journeyProduct?.productPrice * membership?.ticket_commission;
                // calculateBalance = (authenticatedUser?.balance - product?.productPrice) - deduction;
                calculateBalance = (authenticatedUser?.balance - product?.productPrice);
                calculateCommission = product?.productPrice * membership?.ticket_commission;
                calculatedCommission = authenticatedUser?.today_commission + calculateCommission;

                let negativeValue;
                let netFrozeAmount;
                let calFrozeAmount;

                if (authenticatedUser?.balance > product?.productPrice) {
                    negativeValue = authenticatedUser?.balance - product?.productPrice;
                    netFrozeAmount = product?.productPrice;
                    calFrozeAmount = authenticatedUser?.froze_amount + Math.abs(netFrozeAmount);
                } else {
                    // negativeValue = authenticatedUser?.balance - product?.productPrice;
                    // netFrozeAmount = product?.productPrice - Math.abs(negativeValue);
                    // calFrozeAmount = authenticatedUser?.froze_amount + Math.abs(netFrozeAmount);

                    // new

                    if (authenticatedUser?.froze_amount === 0) {
                        negativeValue = authenticatedUser?.balance - product?.productPrice;
                        netFrozeAmount = product?.productPrice - Math.abs(negativeValue);
                        calFrozeAmount = authenticatedUser?.froze_amount + Math.abs(netFrozeAmount);
                    } else {
                        negativeValue = authenticatedUser?.balance - product?.productPrice;
                        // netFrozeAmount = product?.productPrice - Math.abs(negativeValue);
                        calFrozeAmount = authenticatedUser?.froze_amount;
                    }

                }

                await User.findByIdAndUpdate(authenticatedUser?._id, {
                    balance: calculateBalance?.toFixed(2),
                    froze_amount: calFrozeAmount?.toFixed(2),
                    today_commission: calculatedCommission?.toFixed(2),
                    ticket_commission: (authenticatedUser?.ticket_commission ?? 0) + deduction
                });

                await AccountChange.create({
                    username: authenticatedUser?.username,
                    phone_number: authenticatedUser?.phone_number,
                    amount: product?.productPrice,
                    after_operation: calculateBalance?.toFixed(2),
                    account_type: "transaction",
                });

            } else {

                calculateBalance = authenticatedUser?.balance - product?.productPrice;
                calculateCommission = product?.productPrice * membership?.commission_rate;
                calculatedCommission = authenticatedUser?.today_commission + calculateCommission;

                await User.findByIdAndUpdate(authenticatedUser?._id, {
                    balance: calculateBalance?.toFixed(2),
                    today_commission: calculatedCommission?.toFixed(2)
                });

                await AccountChange.create({
                    username: authenticatedUser?.username,
                    phone_number: authenticatedUser?.phone_number,
                    amount: product?.productPrice,
                    after_operation: calculateBalance?.toFixed(2),
                    account_type: "transaction",
                });
            }
        }

        return {
            message: `Fetched!`,
            status: 201,
            type: "success",
            data: {
                product: product ? JSON.parse(JSON.stringify(product)) : null,
                commission: commission ? JSON.parse(JSON.stringify(commission)) : null,
                totalValue: totalValue ? JSON.parse(JSON.stringify(totalValue)) : null,
            }
        };

    } catch (error) {
        console.log(error)
    }
}

