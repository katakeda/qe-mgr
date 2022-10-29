import { writable } from 'svelte/store';
import type { User, Ticket, Team } from './types.svelte';

export const tickets = writable<Array<Ticket>>([]);
export const users = writable<Array<User>>([]);
export const teams = writable<Array<Team>>([]);
export const currentTeam = writable<string>('');

let ticketsEndpoint = '/api/tickets/';
currentTeam.subscribe((currentTeam) => {
  ticketsEndpoint = `/api/tickets/?team=${currentTeam}`;
});

export const refreshTickets = async () => {
  const response = await fetch(ticketsEndpoint);
  const ticketsData: Array<Ticket> = await response.json();
  tickets.set(ticketsData);
};

export const refreshUsers = async () => {
  const response = await fetch('/api/users/');
  const usersData =  await response.json();
  users.set(usersData);
};

export const refreshTeams = async () => {
  const response = await fetch('/api/teams/');
  const teamsData = await response.json();
  teams.set(teamsData);
}

export const updateCurrentTeam = (team: string) => {
  currentTeam.set(team);
}