import { Customer, CustomerService } from "@medusajs/medusa";
import {
  EventBusResponse,
  Options,
  TemplateFunction,
  TemplateLocale,
} from "../types";
import { Courier, CourierClient } from "@trycourier/courier";

const customerEventBus = {};

// Customer Created Handle
customerEventBus[CustomerService.Events.CREATED] =
  async function customerCreatedHandle(
    { logger },
    data: any,
    client: CourierClient,
    options: Options,
    templateVal: TemplateFunction
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
      if (
        options.template &&
        options.template[CustomerService.Events.CREATED]
      ) {
        if (
          typeof options.template[CustomerService.Events.CREATED] === "string"
        ) {
          courierOption = {
            message: {
              to: {
                data: template_data,
                email: customer.email,
              },
              // ! The templateId here needs to be created in Courier's UI
              template: options.template[
                CustomerService.Events.CREATED
              ] as string,
              routing: {
                method: "single",
                channels: ["email"],
              },
            },
          };
        } else {
          courierOption = {
            message: {
              to: {
                data: template_data,
                email: customer.email,
              },
              // ! data.locale is null
              template:
                options.template[CustomerService.Events.CREATED][
                  data.locale || TemplateLocale.EN_US
                ],
              routing: {
                method: "single",
                channels: ["email"],
              },
            },
          };
        }
      } else {
        courierOption = {
          message: {
            to: {
              data: template_data,
              email: customer.email,
            },
            // ! data.locale is null
            content: await templateVal(
              data.locale || TemplateLocale.EN_US,
              options
            ),
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
        };
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
  };

export default customerEventBus;
