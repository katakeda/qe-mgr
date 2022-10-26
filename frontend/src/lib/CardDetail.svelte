<script lang="ts">
  import type { Ticket } from './types.svelte';
  export let ticket: Ticket;

  let editingTitle = false;
  let editingDescription = false;
  let editingAssignedTo = false;
  let editingStatus = false;
  let updatedTicket = ticket;

  const availableUsers = [
    { id: '1', name: 'Justin' },
    { id: '2', name: 'Kaitaku' },
    { id: '3', name: 'Takeda' },
  ];
  const statuses = [
    { value: 'New', label: 'Ready For Review' },
    { value: 'Pending', label: 'In Review' },
    { value: 'Complete', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const resetTicket = () => {
    updatedTicket = ticket;
  };

  const updateTicket = () => {};

  const saveTicket = () => {};
</script>

<div class="card-detail">
  <div>
    {#if editingTitle}
      <input type="text" value={ticket.title} />
      <button on:click={() => (editingTitle = false)}>Cancel</button>
      <button on:click={() => (editingTitle = false)}>Save</button>
    {:else}
      <span>{ticket.title}</span>
      <button on:click={() => (editingTitle = true)}>Edit</button>
    {/if}
  </div>
  <div>
    <span>Description:</span>
    {#if editingDescription}
      <textarea cols="30" rows="10">{ticket.description}</textarea>
      <button on:click={() => (editingDescription = false)}>Cancel</button>
      <button
        on:click={() => {
          editingDescription = false;
          updateTicket();
        }}>Save</button
      >
    {:else}
      <span>{ticket.description}</span>
      <button on:click={() => (editingDescription = true)}>Edit</button>
    {/if}
  </div>
  <div>
    <span>Assigned To:</span>
    {#if editingAssignedTo}
      <select>
        {#each availableUsers as user}
          <option value={user.id} selected={user.id == ticket.assignedTo}
            >{user.name}</option
          >
        {/each}
      </select>
      <button on:click={() => (editingAssignedTo = false)}>Cancel</button>
      <button on:click={() => (editingAssignedTo = false)}>Save</button>
    {:else}
      <span>{ticket.assignedTo}</span>
      <button on:click={() => (editingAssignedTo = true)}>Edit</button>
    {/if}
  </div>
  <div>
    <span>Status:</span>
    {#if editingStatus}
      <select>
        {#each statuses as status}
          <option value={status.value} selected={status.value == ticket.status}
            >{status.label}</option
          >
        {/each}
      </select>
      <button on:click={() => (editingStatus = false)}>Cancel</button>
      <button on:click={() => (editingStatus = false)}>Save</button>
    {:else}
      <span>{ticket.status}</span>
      <button on:click={() => (editingStatus = true)}>Edit</button>
    {/if}
  </div>
</div>

<style>
  .card-detail {
    display: flex;
    flex-direction: column;
  }
</style>
