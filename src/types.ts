import { Courier, CourierClient } from "@trycourier/courier";

const PROVIDER_ID = "push-notification";

enum TemplateLocale {
  EN_US = "en-US",
  ZH_CN = "zh-CN",
  DE_DE = "de-DE",
}

type EventBusFunction = (
  container: any,
  data: any,
  client: CourierClient,
  options: any,
  template: TemplateFunction
) => Promise<{}>;
type EventBusResponse = {
  to: string;
  status: string;
  data: Record<string, unknown>;
};

type TemplateFunction = (locale: TemplateLocale) => Promise<Courier.Content>;  // define template function

type Options = {
  auth_token:string;
  template: {
    [key: string]: {
      [key in TemplateLocale]: string;
    } | string;
  };
};

export {
  PROVIDER_ID,
  Options,
  TemplateLocale,
  TemplateFunction,
  EventBusFunction,
  EventBusResponse,
};
