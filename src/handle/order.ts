import {
  OrderService,
  Order,
} from "@medusajs/medusa";
import { InjectedDependencies, EventBusResponse } from "../types";
// import SendGrid from "@sendgrid/mail"


const orderEventBus = {};


// Order Placed Handle
orderEventBus[OrderService.Events.PLACED] = async (
  { logger, orderService }: InjectedDependencies,
  data: any
): Promise<EventBusResponse> => {
  logger.debug("Order placed event, OrderId:" + data.id);

  let order: Order;
  try {
    order = await orderService.retrieve(data.id);

    /** Use SendGrid to send email **/
    // await SendGrid.send(sendOptions)
    // .then(() => {
    //   status = "sent"
    // })
    // .catch((error) => {
    //   status = "failed"
    //   this.logger_.error(error)
    // })

  } catch (e) {
    logger.error("notification push failed, orderId:" + data.id);
    return {
      to: order.email,
      status: "failed",
      data: {
        // any data necessary to send the email
        // for example:
        subject: "Good",
      },
    };
  }

  logger.debug("notification push success, orderId:" + data.id);
  return {
    to: order.customer_id,
    status: "done",
    data: {
      // any data necessary to send the email
      // for example:
      ...order,
      subject: "Good!",
    },
  };
}

export default orderEventBus;
