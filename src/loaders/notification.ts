
import {
    MedusaContainer,
    NotificationService,
    ClaimService,
    BatchJobService,
    CustomerService,
    DiscountService,
    OrderService,
    GiftCardService,
    SwapService
  } from "@medusajs/medusa";
  import { PROVIDER_ID } from "../types"
  
  export default async (
    container: MedusaContainer,
  ): Promise<void> => {
  
    const notificationService = container.resolve<NotificationService>("notificationService");
  
    const providerId = PROVIDER_ID
    
    /* [Batch Jobs Events]:  This section holds all events related to batch jobs.  */
    notificationService.subscribe(BatchJobService.Events.CREATED, providerId);              // Triggered when a batch job is created.
    notificationService.subscribe(BatchJobService.Events.UPDATED, providerId);              // Triggered when a batch job is updated.
    notificationService.subscribe(BatchJobService.Events.CANCELED, providerId);             // Triggered when a batch job is canceled.
    notificationService.subscribe(BatchJobService.Events.PRE_PROCESSED, providerId);        // Triggered after the preProcessBatchJob of a batch job strategy is done executing.
    notificationService.subscribe(BatchJobService.Events.CONFIRMED, providerId);            // Triggered after the batch job is done pre-processing and the batch job is not in dry-run mode.
    notificationService.subscribe(BatchJobService.Events.PROCESSING, providerId);           // Triggered when a batch job starts processing after it's confirmed.
    notificationService.subscribe(BatchJobService.Events.COMPLETED, providerId);            // Triggered when a batch job is done processing and is completed.
    notificationService.subscribe(BatchJobService.Events.FAILED, providerId);               // Triggered when an error occurs while running a batch job and the batch job fails.
    
    /* [Customer Events]:  This section holds all events related to customers.  */
    notificationService.subscribe(CustomerService.Events.CREATED, providerId);              // Triggered when a customer is created.
    notificationService.subscribe(CustomerService.Events.UPDATED, providerId);              // Triggered when a customer is updated including their information or password, or when a customer account is created that is associated with an existing email (for example, if a customer placed an order with their email as a guest, then created an account with that email).
    notificationService.subscribe(CustomerService.Events.PASSWORD_RESET, providerId);       // Triggered when a customer requests to reset their password.
  
    /* [Discount Events]:  This section holds all events related to discounts.  */
    notificationService.subscribe(DiscountService.Events.CREATED, providerId);              // Triggered when a discount is created.
  
    /* [Gift Card Events]:  This section holds all events related to gift cards.  */
    notificationService.subscribe(GiftCardService.Events.CREATED, providerId);              // Triggered when a gift card is created.
  
    /* [Order Events]: This section holds all events related to orders.*/
    notificationService.subscribe(OrderService.Events.SHIPMENT_CREATED, providerId);        // Triggered when a new order is placed.
    notificationService.subscribe(OrderService.Events.GIFT_CARD_CREATED, providerId);       // Triggered when a gift card is created.
    notificationService.subscribe(OrderService.Events.PLACED, providerId);                  // Triggered when a new order is placed.
    notificationService.subscribe(OrderService.Events.CANCELED, providerId);                // Triggered when an order is canceled.
    notificationService.subscribe(OrderService.Events.ITEMS_RETURNED, providerId);          // Triggered when an order is returned.
    notificationService.subscribe(OrderService.Events.RETURN_REQUESTED, providerId);        // Triggered when a return is requested.
    notificationService.subscribe(OrderService.Events.REFUND_FAILED, providerId);           // Triggered when a refund fails.
  
    /* [Claim Item Events] This section holds all events related to claim items. */
    notificationService.subscribe(ClaimService.Events.CREATED, providerId);                 // Triggered when claim items are created and associated with a claim. This happens during the creation of claims
    notificationService.subscribe(ClaimService.Events.UPDATED, providerId);                 // Triggered when a claim item is updated. This happens when a claim is updated
    notificationService.subscribe(ClaimService.Events.CANCELED, providerId);                // Triggered when a claim is canceled
  
    /* [Swap Events]: This section holds all events related to swaps. */
    notificationService.subscribe(SwapService.Events.CREATED, providerId);                  // Triggered when a swap is created.
    notificationService.subscribe(SwapService.Events.RECEIVED, providerId);                 // Triggered when a swap is received.
    notificationService.subscribe(SwapService.Events.FULFILLMENT_CREATED, providerId);      // Triggered when fulfillment is created for a swap.
    notificationService.subscribe(SwapService.Events.SHIPMENT_CREATED, providerId);         // Triggered when a shipment is created for a swap and the fulfillment associated with it is set as “shipped”.
    notificationService.subscribe(SwapService.Events.PAYMENT_COMPLETED, providerId);        // Triggered when a swap payment is completed.
    notificationService.subscribe(SwapService.Events.PAYMENT_CAPTURED, providerId);         // Triggered when the payment is captured for a swap.
    notificationService.subscribe(SwapService.Events.PAYMENT_CAPTURE_FAILED, providerId);   // Triggered when a swap is canceled.
    notificationService.subscribe(SwapService.Events.REFUND_PROCESSED, providerId);         // Triggered when a swap’s amount difference is processed and refunded.
    notificationService.subscribe(SwapService.Events.PROCESS_REFUND_FAILED, providerId);    // Triggered when processing and refunding a swap’s amount difference fails.
  
    // more events can be found in the documentation
    // https://docs.medusajs.com/development/events/events-list
  };
  