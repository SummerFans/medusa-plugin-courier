import { OrderService, Order, Customer, Fulfillment } from "@medusajs/medusa";
import { Options, EventBusResponse, TemplateLocale } from "../../types";
import { Courier, CourierClient } from "@trycourier/courier";
import { getMessageOption, getTemplateIdOption } from "../../lib/message";

import template from "../../templates/orders";

export default async (
  { logger, orderService, customerService, fulfillmentService },
  data: any,
  client: CourierClient,
  options: Options
): Promise<EventBusResponse> => {
  let order: Order;
  let fulfillment: Fulfillment;
  let customer: Customer;
  let templateData: any = {};
  let courierOption: Courier.SendMessageRequest;

  try {
    order = await orderService.retrieveWithTotals(data.id);
    fulfillment = await fulfillmentService.retrieve(data.fulfillment_id);
    customer = await customerService.retrieve(order.customer_id);

    if (
      options.template &&
      options.template[OrderService.Events.SHIPMENT_CREATED]
    ) {
      if (
        typeof options.template[OrderService.Events.SHIPMENT_CREATED] ===
        "string"
      ) {
        courierOption = getTemplateIdOption(
          data.email,
          templateData,
          options.template[OrderService.Events.SHIPMENT_CREATED]
        );
      } else {
        courierOption = getTemplateIdOption(
          data.email,
          templateData,
          options.template[OrderService.Events.SHIPMENT_CREATED][
            data.locale || TemplateLocale.EN_US
          ]
        );
      }
    } else {
      courierOption = getMessageOption(
        data.email,
        templateData,
        `#{${order.display_id}} Your Order has Shippend!`,
        template.SHIPMENT_CREATED(templateData)
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
