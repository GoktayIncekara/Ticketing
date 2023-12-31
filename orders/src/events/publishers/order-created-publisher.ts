import { OrderCreatedEvent, Publisher, Subjects } from "@ticketsgi/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
