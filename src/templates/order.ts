import { Courier } from "@trycourier/courier";
import { TemplateLocale } from "../types";
import { OrderService } from "@medusajs/medusa";

const orderTemplates = {};

orderTemplates[OrderService.Events.PLACED] = async (
  locale: TemplateLocale
): Promise<Courier.Content> => {

  switch (locale) {
    case TemplateLocale.DE_DE:
      return {
        title: "#{{display_id}}Order Placed",
        body: "Order Placed",
      };
    case TemplateLocale.ZH_CN:
      return {
        title: "#{{display_id}}订单已创建",
        body: "订单已创建",
      };
    default:
      // en-US
      return {
        title: "#{{display_id}}Order Placed",
        body: "Order Placed",
      };
  }
};
export default orderTemplates;