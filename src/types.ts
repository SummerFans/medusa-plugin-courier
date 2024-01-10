import { Logger, OrderService, CustomerService } from "@medusajs/medusa";
import { CourierClient } from "@trycourier/courier";

const PROVIDER_ID = "push-notification";


type InjectedDependencies = {
  logger: Logger;
  orderService: OrderService;
  customerService: CustomerService;
};

type EventBusFunction = (
  container: InjectedDependencies,
  data: any,
  client?: CourierClient
) => Promise<{}>;
type EventBusResponse = {
  to: string;
  status: string;
  data: Record<string, unknown>;
};

export {
  PROVIDER_ID,
  InjectedDependencies,
  EventBusFunction,
  EventBusResponse,
};
