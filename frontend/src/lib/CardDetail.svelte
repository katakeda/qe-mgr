<script lang="ts">
  import type { Ticket, User } from './types.svelte';
  export let ticket: Ticket;

  let editingTitle = false;
  let editingDescription = false;
  let editingAssignedTo = false;
  let editingStatus = false;
  let updatedTicket = { ...ticket };
  let availableUsers: Array<User>;

  (async () => {
    const response = await fetch('/api/users/');
    const users = await response.json();
    availableUsers = users;
  })();

  const statuses = [
    { value: 'New', label: 'Ready For Review' },
    { value: 'Pending', label: 'In Review' },
    { value: 'Complete', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const resetTicket = (field: string) => {
    const clone = { ...ticket };
    updatedTicket[field] = clone[field];
  };

  const saveTicket = async (fields: any) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields }),
    };
    const response = await fetch(`/api/tickets/${ticket.id}`, options);
    const savedTicket = await response.json();
    updatedTicket = savedTicket[0];
    ticket = { ...updatedTicket };
  };
</script>

<div class="card-detail">
  <div class="card-detail-group card-detail-title">
    {#if editingTitle}
      <div class="card-detail-label-group">
        <input type="text" bind:value={updatedTicket.title} />
      </div>
      <div class="card-detail-button-group">
        <button
          on:click={() => {
            editingTitle = false;
            resetTicket('title');
          }}>Cancel</button
        >
        <button
          on:click={() => {
            editingTitle = false;
            saveTicket({ title: updatedTicket.title });
          }}>Save</button
        >
      </div>
    {:else}
      <div class="card-detail-label-group">
        <span>{ticket.title}</span>
      </div>
      <div class="card-detail-button-group">
        <button on:click={() => (editingTitle = true)}>Edit</button>
      </div>
    {/if}
  </div>
  <div class="card-detail-group card-detail-desc">
    <span>Description: </span>
    {#if editingDescription}
      <div class="card-detail-label-group">
        <textarea bind:value={updatedTicket.description} />
      </div>
      <div class="card-detail-button-group">
        <button
          on:click={() => {
            editingDescription = false;
            resetTicket('description');
          }}>Cancel</button
        >
        <button
          on:click={() => {
            editingDescription = false;
            saveTicket({ description: updatedTicket.description });
          }}>Save</button
        >
      </div>
    {:else}
      <div class="card-detail-label-group">
        <span>{ticket.description}</span>
      </div>
      <div class="card-detail-button-group">
        <button on:click={() => (editingDescription = true)}>Edit</button>
      </div>
    {/if}
  </div>
  <div class="card-detail-group">
    <span>Assigned To: </span>
    {#if editingAssignedTo}
      <div class="card-detail-label-group">
        <select bind:value={updatedTicket.assigned_to.id}>
          {#each availableUsers as user}
            <option
              value={user.id}
              selected={user.id == updatedTicket.assigned_to.id}
              >{user.name}</option
            >
          {/each}
        </select>
      </div>
      <div class="card-detail-button-group">
        <button
          on:click={() => {
            editingAssignedTo = false;
            resetTicket('assigned_to');
          }}>Cancel</button
        >
        <button
          on:click={() => {
            editingAssignedTo = false;
            saveTicket({ assigned_to: updatedTicket.assigned_to.id });
          }}>Save</button
        >
      </div>
    {:else}
      <div class="card-detail-label-group">
        <span>{ticket.assigned_to.name}</span>
      </div>
      <div class="card-detail-button-group">
        <button on:click={() => (editingAssignedTo = true)}>Edit</button>
      </div>
    {/if}
  </div>
  <div class="card-detail-group">
    <span>Status: </span>
    {#if editingStatus}
      <div class="card-detail-label-group">
        <select bind:value={updatedTicket.status}>
          {#each statuses as status}
            <option
              value={status.value}
              selected={status.value == updatedTicket.status}
              >{status.label}</option
            >
          {/each}
        </select>
      </div>
      <div class="card-detail-button-group">
        <button
          on:click={() => {
            editingStatus = false;
            resetTicket('status');
          }}>Cancel</button
        >
        <button
          on:click={() => {
            editingStatus = false;
            saveTicket({ status: updatedTicket.status });
          }}>Save</button
        >
      </div>
    {:else}
      <div class="card-detail-label-group">
        <span>{ticket.status}</span>
      </div>
      <div class="card-detail-button-group">
        <button on:click={() => (editingStatus = true)}>Edit</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .card-detail {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
  }
  .card-detail-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .card-detail-group > span {
    width: 20%;
  }
  .card-detail-label-group {
    display: flex;
    flex-grow: 1;
    margin-right: 5px;
  }
  .card-detail-title span {
    font-size: 22px;
  }
  .card-detail-title input {
    width: 100%;
  }
  .card-detail-desc textarea {
    margin-left: 3px;
    width: 100%;
    height: 65px;
    font-family: sans-serif;
    resize: none;
  }
</style>
