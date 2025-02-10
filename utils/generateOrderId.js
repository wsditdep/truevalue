import { Order } from "@/modals/Order";

async function generateOrderId() {
  let uniqueNumber = '';

  const maxNumber = await Order.findOne().sort({ order_id: -1 });
  const nextMaxNumber = (maxNumber?.order_id || 0) + 1;
  uniqueNumber = nextMaxNumber;

  return uniqueNumber;
}

export default generateOrderId;
