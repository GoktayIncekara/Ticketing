import { Publisher, Subjects, TicketCreatedEvent } from "@ticketsgi/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
