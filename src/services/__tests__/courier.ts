import CourierService from "../courier";

jest.genMockFromModule("@sendgrid/mail");
jest.mock("@sendgrid/mail");

describe("CourierService", () => {
  let courierService: CourierService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call Courier.send when template is configured and correct data is passed", async () => {
    const orderServiceMock = {
      retrieve: jest.fn().mockImplementation((data) => {
        return Promise.resolve({
          email: "test@test.com",
          currency_code: "usd",
          items: [],
          discounts: [],
          gift_cards: [],
          created_at: new Date(),
        });
      }),
      retrieveWithTotals: jest.fn().mockImplementation((data) => {
        return Promise.resolve({
          id: "test",
          email: "test@test.com",
          currency_code: "usd",
          items: [],
          discounts: [],
          gift_cards: [],
          created_at: new Date(),
        });
      }),
    };

    const logServiceMock = {
      info: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    courierService = new CourierService(
      {
        orderService: orderServiceMock,
        logger: logServiceMock,
      },
      {
        api_key: "SG.test",
      }
    );

    try {
      await courierService.sendNotification("order.placed", {
        id: "test",
      });
    } catch (error) {
      expect(error.message).toEqual(
        "Sendgrid service: No template was set for event: order.placed"
      );
    }
  });
});
