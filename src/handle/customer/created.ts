import { Customer, CustomerService } from "@medusajs/medusa";
import { EventBusResponse, Options, TemplateLocale } from "../../types";
import { Courier, CourierClient } from "@trycourier/courier";
import { getMessageOption, getTemplateIdOption } from "../../lib/message";

export default async function(
  { logger },
  data: any,
  client: CourierClient,
  options: Options
): Promise<EventBusResponse> {
  let customer: Customer;
  let template_data: any = {};
  let courierOption: Courier.SendMessageRequest;

  try {
    logger.debug("Customer created event, CustomerId:" + data.id);

    template_data = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      created_at: data.created_at,
      id: data.id,
    };

    // If option exists templateId, then use templateId
    if (options.template && options.template[CustomerService.Events.CREATED]) {
      if (
        typeof options.template[CustomerService.Events.CREATED] === "string"
      ) {
        courierOption = getTemplateIdOption(
          data.email,
          template_data,
          options.template[CustomerService.Events.CREATED]
        );
      } else {
        courierOption = getTemplateIdOption(
          data.email,
          template_data,
          options.template[CustomerService.Events.CREATED][
            data.locale || TemplateLocale.EN_US
          ]
        );
      }
    } else {
      courierOption = getMessageOption(
        data.email,
        template_data,
        "",
        "<h1>sdf</h1>"
      );
    }

    // Send Email
    await client.send(courierOption);
  } catch (e) {
    return {
      to: data.email,
      status: "failed",
      data: {
        // any data necessary to send the email
        // for example:
        ...customer,
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
