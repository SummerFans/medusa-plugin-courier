import { Courier } from "@trycourier/courier";
import { Options, TemplateLocale } from "../types";
import { OrderService } from "@medusajs/medusa";

const orderTemplates = {};

orderTemplates[OrderService.Events.PLACED] = async (
  locale: TemplateLocale,
  options: Options
): Promise<Courier.Content> => {
  switch (locale) {
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
                type: "image",
                src: "{{$.item.thumbnail}}",
                width: "50px",
                align: "right",
                altText: "{{$.item.title}}",
              },
              {
                type: "text",
                content: "{{$.item.title}}",
                align: "left",
              },
              {
                type: "text",
                content: "{{$.item.description}}",
                align: "left",
                text_style: "subtext",
              },
              {
                type: "text",
                content: "{{$.item.unit_price}}{{currency_code}} x {{$.item.quantity}}",
                align: "left",
                text_style: "subtext",
              },
            ]
          },
          {
            type: "divider",
            color: "#eeeeee",
          },
          {
            type:"text",
            content:"Subtotal: {{subtotal}} {{currency_code}} | Shipping: {{shipping_total}} {{currency_code}} | Taxes:{{tax_total}} {{currency_code}}",
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