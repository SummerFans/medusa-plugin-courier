import { Logger, AbstractNotificationService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { CourierClient } from "@trycourier/courier";

import { PROVIDER_ID, EventBusResponse, EventBusFunction, TemplateFunction } from "../types";

// TemplateLocale
import orderTemplates from "../templates/order";
import customerTemplates from "../templates/customer";

// EventBus
import orderEventBus from "../handle/order";
import customerEventBus from "../handle/customer";



class EventBusProvider {
  private eventBus_: Map<string, Function> = new Map();
  private templates_: Map<string, Function> = new Map();

  protected container_;
  protected logger_: Logger;
  protected options_: any;

  protected courierClient_: CourierClient;

  constructor(container, options: any) {
    this.container_ = container;
    this.logger_ = container.logger;
    this.options_ = options;

    // building a provider SDK
    if (!options.auth_token) {
      // AUTH_TOKEN
      new Error("Courier plugin auth_token is required");
    }

    this.courierClient_ = new CourierClient({
      authorizationToken: options.auth_token,
    }); // get from the Courier UI
  }

  registerToEventBus(eventName: string, eventHandle: EventBusFunction): void {
    if (this.eventBus_.has(eventName)) {
      throw new Error(`Event ${eventName} already registered`);
    }
    if (typeof eventHandle !== "function") {
      throw new Error(`Event ${eventName} is not a function`);
    }
    this.eventBus_.set(eventName, eventHandle);
  }

  registerToTemplate(eventName: string, templateHandle: TemplateFunction) {
    return this.templates_.set(eventName, templateHandle);
  }

  // TODO: add event handle
  async eventHandle(eventName: string, data: any): Promise<EventBusResponse> {
    return this.eventBus_.has(eventName)
      ? this.eventBus_.get(eventName)(
          this.container_,
          data,
          this.courierClient_,
          this.options_,
          this.templates_.get(eventName)
        )
      : null;
  }

  // TODO: resend event handle
  async resendEventHandle(to: string, data: any): Promise<EventBusResponse> {

    // change the receiver
    data.message.to.email = to;

    this.courierClient_.send(data.message);

    return {
      to: to,
      status: "done",
      data: data, // make changes to the data
    };
  }
}

class PushNotificationService extends AbstractNotificationService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager;

  static identifier = PROVIDER_ID;

  protected logger_: Logger;
  protected options_: any;
  protected eventBusProvider: EventBusProvider;

  constructor(container, options) {
    super(container);
    this.logger_ = container.logger;
    this.options_ = options;

    this.options_.store_name = "VLL.APP";
    this.options_.store_url = "http://localhost:8000";
    this.options_.auth_token = "pk_test_BV9E84YFT242WBPBYYBPY10BEK5H";
    this.options_.template = {
        "order.placed": "RT67R871X4M3Y9NRV1JS1CB1DXNR"
    }

    this.eventBusProvider = new EventBusProvider(container, this.options_);

    // TODO: add oreder event bus
    for (const [eventName, handle] of Object.entries(orderEventBus) as [
      string,
      EventBusFunction
    ][]) {
      // order event
      this.eventBusProvider.registerToEventBus(eventName, handle);                    // register event handle
      this.eventBusProvider.registerToTemplate(eventName, orderTemplates[eventName]); // register default template
    }

    // TODO: add customer event bus
    for (const [eventName, handle] of Object.entries(customerEventBus) as [
      string,
      EventBusFunction
    ][]) {
      this.eventBusProvider.registerToEventBus(eventName, handle);                    // register event handle
      this.eventBusProvider.registerToTemplate(eventName, customerTemplates[eventName]); // register default template
    }
  }

  async sendNotification(
    event: string,
    data: any
  ): Promise<{
    to: string;
    status: string;
    data: Record<string, unknown>;
  }> {
    return this.eventBusProvider.eventHandle(event, data);
  }

  async resendNotification(
    notification: any,
    config: any,
    _: unknown //attachmentGenerator
  ): Promise<{
    to: string;
    status: string;
    data: Record<string, unknown>;
  }> {
    // check if the receiver should be changed
    const to: string = config.to ? config.to : notification.to;

    return await this.eventBusProvider.resendEventHandle(to, notification.data);
  }
}

export default PushNotificationService;
