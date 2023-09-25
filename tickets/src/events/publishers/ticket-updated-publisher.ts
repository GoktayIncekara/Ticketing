import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketsgi/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
