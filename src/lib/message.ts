import { Courier } from "@trycourier/courier";

export function getMessageOption(email, data, subject:string, html: string): Courier.SendMessageRequest {

  let option: Courier.SendMessageRequest;

  option = {
    message: {
      to: {
        data: data,
        email: email,
      },
      content: {
        version: "2022-01-01",
        elements: [
          {
            type: "channel",
            channel: "email",
            raw: {
              subject,
              html,
            },
          },
        ],
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  };
  return option;
}

export function getTemplateIdOption(email, data, templateId): Courier.SendMessageRequest {
  let option: Courier.SendMessageRequest;

  option = {
    message: {
      to: {
        data: data,
        email,
      },
      template: templateId,
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  };

  return option;
}
