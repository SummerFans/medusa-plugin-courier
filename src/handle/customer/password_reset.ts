import { Customer, CustomerService } from "@medusajs/medusa";
import { EventBusResponse, Options, TemplateLocale } from "../../types";
import { Courier, CourierClient } from "@trycourier/courier";
import { getMessageOption, getTemplateIdOption } from "../../lib/message";

import template from "../../templates/customer";

export default async function (
  { logger },
  data: any,
  client: CourierClient,
  options: Options
): Promise<EventBusResponse> {
  let template_data: any = {};
  let courierOption: Courier.SendMessageRequest;

  try {
    logger.debug("Customer created event, CustomerId:" + data.id);

    template_data = {
      store_url: options.store_url,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      token: data.token,
      id: data.id,
    };

    // If option exists templateId, then use templateId
    if (
      options.template &&
      options.template[CustomerService.Events.PASSWORD_RESET]
    ) {
      if (
        typeof options.template[CustomerService.Events.PASSWORD_RESET] ===
        "string"
      ) {
        courierOption = getTemplateIdOption(
          data.email,
          template_data,
          options.template[CustomerService.Events.PASSWORD_RESET]
        );
      } else {
        courierOption = getTemplateIdOption(
          data.email,
          template_data,
          options.template[CustomerService.Events.PASSWORD_RESET][
            data.locale || TemplateLocale.EN_US
          ]
        );
      }
    } else {
      courierOption = getMessageOption(
        data.email,
        template_data,
        "Reset Password",
        template.PASSWORD_RESET(template_data)
      );
    }

    console.debug("Password Reset Sending...");

    // Send Email
    await client.send(courierOption);
  } catch (e) {
    return {
      to: data.email,
      status: "failed",
      data: {
        // any data necessary to send the email
        // for example:
        ...template_data,
      },
    };
  }

  logger.debug(
    "Customer created event, CustomerId:" + data.id + " send success"
  );

  return {
    to: data.email,
    status: "done",
    data: {
      // any data necessary to send the email
      // for example:
      content: courierOption.message,
      ...data,
    },
  };
}
