<script lang="ts">
  export let status: String;
  import { getContext } from 'svelte';
  import type Modal from 'svelte-simple-modal';
  import { currentTeam, refreshTickets, teams, users } from './stores';
  import type { Team, Ticket, User } from './types.svelte';
  const { close }: Modal = getContext('simple-modal');

  let newTicket: Ticket = {};
  let availableUsers: Array<User> = [];
  let team_id: string = '';
  let allTeams: Array<Team> = [];
  users.subscribe((users) => {
    availableUsers = users;
  });
  teams.subscribe((teams) => {
    allTeams = teams;
  });
  currentTeam.subscribe((currentTeam) => {
    team_id = allTeams.find((team) => team.name === currentTeam)?.id;
  });

  const resetTicket = () => {
    newTicket = {};
  };

  const saveTicket = async () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newTicket,
        assigned_to: newTicket.assigned_to?.id,
        status,
        team_id,
      }),
    };
    const response = await fetch('/api/tickets/', options);
    await response.json();
    refreshTickets();
    close();
  };
</script>

<div class="new-ticket">
  <div class="new-ticket-group">
    <span>Title:</span>
    <div class="new-ticket-input-group">
      <input type="text" bind:value={newTicket.title} />
    </div>
  </div>
  <div class="new-ticket-group">
    <span>Description:</span>
    <div class="new-ticket-input-group">
      <textarea bind:value={newTicket.description} />
    </div>
  </div>
  <div class="new-ticket-group">
    <span>Assigned To:</span>
    <div class="new-ticket-input-group">
      <select bind:value={newTicket.assigned_to}>
        <option default selected>Unassigned</option>
        {#each availableUsers as user}
          <option value={user} selected={user.id == newTicket.assigned_to?.id}>
            {user.name}
          </option>
        {/each}
      </select>
    </div>
  </div>
  <div class="new-ticket-action-group">
    <button on:click={resetTicket}>Reset</button>
    <button on:click={saveTicket}>Save</button>
  </div>
</div>

<style>
  .new-ticket {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
  }
  .new-ticket-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .new-ticket-group > span {
    width: 20%;
  }
  .new-ticket-input-group {
    display: flex;
    flex-grow: 1;
  }
  .new-ticket-input-group > input {
    width: 100%;
  }
  .new-ticket-input-group > textarea {
    width: 100%;
    height: 65px;
    font-family: sans-serif;
    resize: none;
  }
  .new-ticket-action-group {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }
  .new-ticket-action-group > button {
    margin-left: 5px;
  }
</style>
