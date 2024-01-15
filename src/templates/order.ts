import { Courier } from "@trycourier/courier";
import { Options, TemplateLocale } from "../types";
import { OrderService } from "@medusajs/medusa";

const orderTemplates = {};

orderTemplates[OrderService.Events.PLACED] = async (
  locale: TemplateLocale,
  options: Options
): Promise<Courier.Content> => {
  switch (locale) {
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
        title: "#{{display_id}} Order Confirmation - Thanks for Shopping!",
        version: "2022-01-01",
        elements: [
          {
            type: "divider",
            color: "#eeeeee",
          },
          {
            type: "text",
            content: "Thanks you for your order!",
            align: "center",
            text_style: "h1",
            bold: "true",
          },
          {
            type: "text",
            content: `Thank you for choosing ${options.store_name}! Your order has been successfully placed and is now being processed.`,
            align: "left",
          },
          {
            type: "divider",
            color: "#eeeeee",
          },
          {
            type: "group",
            // content: "* {{$.item.title}} listed {{$.item.total}}",
            loop: "data.items",
            elements: [
              {
                type: "text",
                content: "{{$.item.title}}({{$.item.quantity}}x) - {{$.item.total}}",
                align: "left",
              },
              {
                type: "image",
                src: "{{$.item.thumbnail}}",
                width: "50px",
                align: "left",
                altText: "{{$.item.title}}",
              },
              {
                type: "divider",
                color: "#eeeeee",
              },
            ]
          },
          {
            type:"text",
            content:"Subtotal: {{subtotal}} {{currency_code}} | Shipping: {{shipping_total}} {{currency_code}} | Taxes:{{tax_total}}{{currency_code}}",
            align:"right",
            text_style: "subtext",
          },
          {
            type: "text",
            content: "Total: {{total}} {{currency_code}}",
            align: "right",
            color: "#000000",
          },
          {
            type: "action",
            style: "button",
            content: "ORDER DETAILS",
            href: `${options.store_url}/order/confirmed/{{id}}`,
          },
          {
            type: "divider",
            color: "#eeeeee",
          },
          {
            type: "text",
            content: "Sit back and relax; we're on it!",
            align: "left",
            text_style: "subtext",
          },
          {
            type: "text",
            content: "Thanks for choosing us!",
            align: "left",
            text_style: "subtext",
          },
          {
            type: "text",
            content: "Best wishes,",
            align: "left",
            text_style: "subtext",
          },
          {
            type: "text",
            content: `The ${options.store_name||''} Team`,
            align: "left",
            text_style: "subtext",
          }
        ],
      };
  }
};
export default orderTemplates;