import { Customer, CustomerService } from "@medusajs/medusa";
import { InjectedDependencies, EventBusResponse } from "../types";

const customerEventBus = {};

// Customer Created Handle
customerEventBus[CustomerService.Events.CREATED] = async function customerCreatedHandle(
  { logger, customerService }: InjectedDependencies,
  data: any
): Promise<EventBusResponse> {


  logger.debug("Customer created event, CustomerId:" + data.id);
  let customer: any;
  try {
    customer = (await customerService.retrieve(data.id)) as Customer;
  } catch (e) {
    
    logger.error("notification push failed, CustomerId:" + data.id);
    return {
      to: customer.email,
      status: "failed",
      data: {
        // any data necessary to send the email
        // for example:
        subject: "welcome to medusa",
      },
    };
  }

  logger.debug("notification push success, CustomerId:" + data.id);
  return {
    to: customer.email,
    status: "done",
    data: {
      // any data necessary to send the email
      // for example:
      subject: "welcome to medusa",
    },
  };
}


export default customerEventBus;