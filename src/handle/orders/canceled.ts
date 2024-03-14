import { OrderService, Order, Customer } from "@medusajs/medusa";
import { Options, EventBusResponse, TemplateLocale } from "../../types";
import { Courier, CourierClient } from "@trycourier/courier";
import { getMessageOption, getTemplateIdOption } from "../../lib/message";

import template from "../../templates/orders";

export default async (
  { logger, orderService, customerService },
  data: any,
  client: CourierClient,
  options: Options
): Promise<EventBusResponse> => {
  logger.debug("Order placed event, OrderId:" + data.id);

  let order: Order;
  let customer: Customer;
  let templateData: any = {};
  let courierOption: Courier.SendMessageRequest;

  try {
    order = await orderService.retrieveWithTotals(data.id);
    customer = await customerService.retrieve(order.customer_id);

    templateData = {
      store_url: options.store_url,
      id: order.id,
      display_id: order.display_id,
      shipping_address: order.shipping_address,
      billing_address: order.billing_address,
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
    if (options.template && options.template[OrderService.Events.CANCELED]) {
      if (typeof options.template[OrderService.Events.CANCELED] === "string") {
        courierOption = getTemplateIdOption(
          data.email,
          templateData,
          options.template[OrderService.Events.CANCELED]
        );
      } else {
        courierOption = getTemplateIdOption(
          data.email,
          templateData,
          options.template[OrderService.Events.CANCELED][
            data.locale || TemplateLocale.EN_US
          ]
        );
      }
    } else {
      courierOption = getMessageOption(
        data.email,
        templateData,
        `[#${order.display_id}] Order Confirmation - Thanks for Shopping`,
        template.CANCELED(templateData)
      );
    }

    const send = await client.send(courierOption);

    logger.debug(
      `notification push success, orderId: ${data.id} sentId: ${send.requestId}`
    );
  } catch (e) {
    logger.error(`notification push failed: ${e.message}, orderId: ${data.id}`);
    return {
      to: order.email,
      status: "failed",
      data: {
        ...templateData,
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
