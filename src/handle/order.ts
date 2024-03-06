import { OrderService, Order, Customer } from "@medusajs/medusa";
import {
  Options,
  EventBusResponse,
  TemplateFunction,
  TemplateLocale,
} from "../types";
import { Courier, CourierClient } from "@trycourier/courier";
// import SendGrid from "@sendgrid/mail"

const orderEventBus = {};

// Order Placed Handle
orderEventBus[OrderService.Events.PLACED] = async (
  { logger, orderService, customerService },
  data: any,
  client: CourierClient,
  options: Options,
  templateVal: TemplateFunction
): Promise<EventBusResponse> => {
  logger.debug("Order placed event, OrderId:" + data.id);

  let order: Order;
  let customer: Customer;
  let template_data: any = {};
  let courierOption: Courier.SendMessageRequest;

  try {
    order = await orderService.retrieveWithTotals(data.id);
    customer = await customerService.retrieve(order.customer_id);

    template_data = {
      id: order.id,
      display_id: order.display_id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      updated_at: order.updated_at.toLocaleDateString(),
      created_at: order.created_at.toLocaleDateString(),
      currency_code: order.currency_code,
      subtotal: (order.subtotal / 100).toFixed(2),
      shipping_total: (order.shipping_total / 100).toFixed(2),
      tax_total: (order.tax_total / 100).toFixed(2),
      total: (order.total / 100).toFixed(2),
      items: order.items.map((item) => {
        return {
          title: item.title,
          description: item.description,
          thumbnail: item.thumbnail,
          quantity: item.quantity,
          unit_price: (item.unit_price / 100).toFixed(2),
          original_total: (item.original_total / 100).toFixed(2),
          total: (item.unit_price / 100).toFixed(2),
        };
      }),
    };

    // If option exists templateId, then use templateId
    if (options.template && options.template[OrderService.Events.PLACED]) {
      if (typeof options.template[OrderService.Events.PLACED] === "string") {
        courierOption = {
          message: {
            to: {
              data: template_data,
              email: order.email,
            },
            // ! The templateId here needs to be created in Courier's UI
            template: options.template[OrderService.Events.PLACED] as string,
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
        };
      } else {
        courierOption = {
          message: {
            to: {
              data: template_data,
              email: order.email,
            },
            // ! data.locale is null
            template:
              options.template[OrderService.Events.PLACED][
                data.locale || TemplateLocale.EN_US
              ],
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
        };
      }
    } else {
      courierOption = {
        message: {
          to: {
            data: template_data,
            email: order.email,
          },
          // ! data.locale is null
          content: await templateVal(
            data.locale || TemplateLocale.EN_US,
            options
          ),
          routing: {
            method: "single",
            channels: ["email"],
          },
        },
      };
    }
    const send = await client.send(courierOption);
    logger.debug(`notification push success, orderId: ${data.id} sentId: ${send.requestId}`);

  } catch (e) {
    logger.error(`notification push failed: ${e.message}, orderId: ${data.id}`);
    return {
      to: order.email,
      status: "failed",
      data: {
        ...template_data,
      },
    };
  }

  return {
    to: order.email,
    status: "done",
    data: {
      message: courierOption.message,
    },
  };
};

export default orderEventBus;
