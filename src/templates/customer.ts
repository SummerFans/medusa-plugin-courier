import { Courier } from "@trycourier/courier";
import { TemplateLocale } from "../types";
import { CustomerService } from "@medusajs/medusa";

const customerTemplates = {};

customerTemplates[CustomerService.Events.CREATED] = async (
  locale: TemplateLocale
): Promise<Courier.Content> => {
  switch (locale) {
    case TemplateLocale.DE_DE:
      return {
        title: "Account created successfully",
        body: "Account created successfully",
      };
    case TemplateLocale.ZH_CN:
      return {
        title: "账户创建成功",
        body: "账户创建成功",
      };
    default:
      // en-US
      return {
        title: "Account created successfully",
        body: "Account created successfully",
      };
  }
};

export default customerTemplates;