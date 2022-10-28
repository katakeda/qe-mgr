import { writable } from 'svelte/store';
import type { Ticket } from './types.svelte';

export const tickets = writable<Array<Ticket>>([]);

export const updateTickets = async () => {
  const response = await fetch('/api/tickets/');
  const ticketsData: Array<Ticket> = await response.json();
  tickets.set(ticketsData);
};