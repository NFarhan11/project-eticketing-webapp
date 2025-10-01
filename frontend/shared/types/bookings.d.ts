import type { AppEvent } from "./events";

export interface AppBooking {
  id: number;
  user_id: number;
  event_id: number;
  num_of_tickets: number;
  total_ticket_price: number;
  created_at: string;
  updated_at: string;
  event: AppEvent;
}

