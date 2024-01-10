import { OrderService, Order, Customer } from "@medusajs/medusa";
import { InjectedDependencies, EventBusResponse } from "../types";
import { CourierClient } from "@trycourier/courier";
// import SendGrid from "@sendgrid/mail"

const orderEventBus = {};

// Order Placed Handle
orderEventBus[OrderService.Events.PLACED] = async (
  { logger, orderService, customerService }: InjectedDependencies,
  data: any,
  client: CourierClient
): Promise<EventBusResponse> => {
  logger.debug("Order placed event, OrderId:" + data.id);

  let order: Order;
  let customer: Customer;
  let template_data: any = {};
  try {
    order = await orderService.retrieveWithTotals(data.id);
    customer = await customerService.retrieve(order.customer_id);

    template_data= {
      display_id: order.display_id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      updated_at: order.updated_at.toLocaleDateString(),
      currency_code: order.currency_code,
      subtotal: (order.subtotal/100).toFixed(2),
      total: (order.total/100).toFixed(2),
      items: order.items.map((item) => {
        return {
          title: item.title,
          description: item.description,
          thumbnail: item.thumbnail,
          quantity: item.quantity,
          unit_price: (item.unit_price/100).toFixed(2),
          original_total: (item.original_total/100).toFixed(2),
          total: (item.unit_price/100).toFixed(2),
        }
      }),
    }

    template_data.content = {
      title: "#{{display_id}} Order Placed",
      body: "Your order has been placed",
    }

    await client.send({
      message: {
        to: {
          data: template_data,
          email: order.email,
        },
        content: template_data.content,
        routing: {
          method: "single",
          channels: ["email"],
        },
      },
    });
  } catch (e) {
    logger.error(`notification push failed: ${e.message}, orderId: ${data.id}`);
    return {
      to: order.email,
      status: "failed",
      data: {
        ...template_data
      },
    };
  }

  return {
    to: order.email,
    status: "done",
    data: {
      // any data necessary to send the email
      // for example:
      ...template_data,
    },
  };
};

export default orderEventBus;
