import { Courier } from "@trycourier/courier";
import { Options, TemplateLocale } from "../types";
import { CustomerService } from "@medusajs/medusa";

const customerTemplates = {};

customerTemplates[CustomerService.Events.CREATED] = async (
  locale: TemplateLocale,
  option: Options
): Promise<Courier.Content> => {
  switch (locale) {
    default:
      return {
        title: `Welcome to ${option.store_name||'E-commerce'} - Complete Your Registration`,
        version: "2022-01-01",
        elements: [
          {
            type:"text",
            content:"Welcomem your account has been created successfully",
            align:"center",
            text_style: "h1",
          },
          {
            "type": "divider",
            "color": "#eeeeee"
          },
          {
            type:"text",
            content:"Dear {{first_name}} {{last_name}}",
            align:"left",
          },
          {
            type:"text",
            content:"Congratulations on joining",
            align:"left",
          },
          {
            type: "text",
            content: "Your account is all set up, and you're ready to explore a world of exciting products. Start shopping now and enjoy the convenience of ",
            align: "left",
          },
          {
            type:"text",
            content:"If you have any questions or need assistance, feel free to reach out to our support team.",
            align:"left",
          },
          {
            type:"text",
            content:"Happy shopping!",
            align:"left",
          },
          {
            type:"text",
            content:"Best regards,",
            align:"left",
          },
          {
            type:"text",
            content:`${option.store_name||'E-commerce'} ,Team`,
            align:"left",
          },
          {
            type: "action",
            style: "button",
            content: "Login",
            href: `${option.store_url}/account`,
          },
        ],
      };
  }
};

export default customerTemplates;