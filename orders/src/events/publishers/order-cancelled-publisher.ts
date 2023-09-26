import { OrderCancelledEvent, Publisher, Subjects } from "@ticketsgi/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
