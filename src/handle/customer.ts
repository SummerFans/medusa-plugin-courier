import { Customer, CustomerService } from "@medusajs/medusa";
import { EventBusResponse } from "../types";
import { CourierClient } from "@trycourier/courier";

const customerEventBus = {};

// Customer Created Handle
customerEventBus[CustomerService.Events.CREATED] = async function customerCreatedHandle(
  { logger, customerService },
  data: any,
  client: CourierClient
): Promise<EventBusResponse> {
  let customer: Customer;
  let template_data: any = {};
  try {

    logger.debug("Customer created event, CustomerId:" + data.id);

    customer = (await customerService.retrieve(data.id)) as Customer;

    template_data.content = {
      title: "Welcome",
      body: "Welcome to our store",
    }

    // Send Email
    await client.send({
      message: {
        to: {
          data: template_data,
          email: customer.email,
        },
        content: template_data.content,
        routing: {
          method: "single",
          channels: ["email"],
        },
      },
    });
  } catch (e) {
    return {
      to: customer.email,
      status: "failed",
      data: {
        // any data necessary to send the email
        // for example:
        ...customer
      },
    };
  }

  return {
    to: customer.email,
    status: "done",
    data: {
      // any data necessary to send the email
      // for example:
      ...customer
    },
  };
}


export default customerEventBus;