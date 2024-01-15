import { Courier } from "@trycourier/courier";
import { Options, TemplateLocale } from "../types";
import { OrderService } from "@medusajs/medusa";

const orderTemplates = {};

orderTemplates[OrderService.Events.PLACED] = async (
  locale: TemplateLocale,
  options: Options
): Promise<Courier.Content> => {
  switch (locale) {
    case TemplateLocale.DE_DE:
      return {
        title: "#{{display_id}} Order Placed",
        body: "Order Placed",
        version: "2022-01-01",
        elements: [
          {
            type: "action",
            style: "button",
            content: "ORDER DETAILS",
            href: `${options.store_url}/order/confirmed/{{id}}`,
          },
        ],
      };
    case TemplateLocale.ZH_CN:
      return {
        title: "#{{display_id}} 订单已创建",
        body: "订单已创建",
        version: "2022-01-01",
        elements: [
          {
            type: "action",
            style: "button",
            content: "订单详情",
            href: `${options.store_url}/order/confirmed/{{id}}`,
          },
        ],
      };
    default:
      // en-US
      return {
        title: "#{{display_id}} Order Placed",
        body: "Order Placed",
        version: "2022-01-01",
        elements: [
          {
            type: "action",
            style: "button",
            content: "ORDER DETAILS",
            href: `${options.store_url}/order/confirmed/{{id}}`,
          },
        ],
      };
  }
};
export default orderTemplates;
