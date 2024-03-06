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
        title: `Welcome to the ${option.store_name} Community`,
        version: "2022-01-01",
        elements: [
          {
            type: "text",
            content: "Welcome",
            align: "center",
            text_style: "h1",
            color: "#000000",
          },
          {
            type: "divider",
            color: "#eeeeee",
          },
          {
            type: "text",
            content: "Dear {{first_name}} {{last_name}}",
            align: "left",
          },
          {
            type: "text",
            content: "Congratulations on joining",
            align: "left",
          },
          {
            type: "text",
            content:
              "Your account is all set up, and you're ready to explore a world of exciting products. Start shopping now and enjoy the convenience of ",
            align: "left",
          },
          {
            type: "text",
            content:
              "If you have any questions or need assistance, feel free to reach out to our support team.",
            align: "left",
          },
          {
            type: "text",
            content: "Happy shopping!",
            align: "left",
          },
          {
            type: "text",
            content: "Best regards,",
            align: "left",
          },
          {
            type: "text",
            content: `${option.store_name} ,Team`,
            align: "left",
          },
          {
            type: "action",
            style: "button",
            content: "Start Shopping",
            href: `${option.store_url}`,
          },
        ],
      };
  }
};

customerTemplates[CustomerService.Events.PASSWORD_RESET] = async (
  locale: TemplateLocale,
  option: Options
  ): Promise<Courier.Content> => {
  return {
    title: "Password Reset",
    version: "2022-01-01",
    elements: [
      {
        type: "text",
        content: "Password Reset",
        align: "center",
        text_style: "h1",
        color: "#000",
      },
      {
        type: "divider",
        color: "#eeeeee",
      },
      {
        type: "text",
        content: "Dear {{first_name}} {{last_name}}",
        align: "left",
        bold: "true",
        color: "#000",
      },
      {
        type: "text",
        content: "Forgot your password?",
        align: "left",
      },
      {
        type: "text",
        content:"We received a request to reset the password for your account.",
        align: "left",
      },
      {
        type: "text",
        content:
          "To reset your password, click on the button below:",
        align: "left",
      },
      {
        type: "action",
        style: "button",
        content: "Reset Password",
        href: `${option.store_url}/reset-password?token={{token}}`,
      },
      {
        type: "text",
        content: "Or copay and paste the following link into your browser:",
        align: "left",
        text_style: "subtext"
      },
      {
        type: "text",
        content: `${option.store_url}/reset-password?token={{token}}`,
        align: "left",
        text_style: "subtext"
      },
     
    ]
  };
};

export default customerTemplates;
