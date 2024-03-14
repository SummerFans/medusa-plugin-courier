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
  let templateData: any = {};
  let courierOption: Courier.SendMessageRequest;

  try {
    order = await orderService.retrieveWithTotals(data.id);

    templateData = {
      store_url: options.store_url,
      id: order.id,
    };

    // If option exists templateId, then use templateId
    if (options.template && options.template[OrderService.Events.ITEMS_RETURNED]) {
      if (typeof options.template[OrderService.Events.ITEMS_RETURNED] === "string") {
        courierOption = getTemplateIdOption(
          data.email,
          templateData,
          options.template[OrderService.Events.ITEMS_RETURNED]
        );
      } else {
        courierOption = getTemplateIdOption(
          data.email,
          templateData,
          options.template[OrderService.Events.ITEMS_RETURNED][
            data.locale || TemplateLocale.EN_US
          ]
        );
      }
    } else {
      courierOption = getMessageOption(
        data.email,
        templateData,
        `[#${order.display_id}] Order Confirmation - Thanks for Shopping`,
        template.ITEMS_RETURNED(templateData)
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
