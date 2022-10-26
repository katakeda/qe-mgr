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
  <div class="card-detail-group card-detail-title">
    {#if editingTitle}
      <div class="card-detail-label-group">
        <input type="text" value={ticket.title} />
      </div>
      <div class="card-detail-button-group">
        <button on:click={() => (editingTitle = false)}>Cancel</button>
        <button on:click={() => (editingTitle = false)}>Save</button>
      </div>
    {:else}
      <div class="card-detail-label-group"><span>{ticket.title}</span></div>
      <div class="card-detail-button-group">
        <button on:click={() => (editingTitle = true)}>Edit</button>
      </div>
    {/if}
  </div>
  <div class="card-detail-group card-detail-desc">
    <span>Description: </span>
    {#if editingDescription}
      <div class="card-detail-label-group">
        <textarea>{ticket.description}</textarea>
      </div>
      <div class="card-detail-button-group">
        <button on:click={() => (editingDescription = false)}>Cancel</button>
        <button
          on:click={() => {
            editingDescription = false;
            updateTicket();
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
        <select>
          {#each availableUsers as user}
            <option value={user.id} selected={user.id == ticket.assignedTo}
              >{user.name}</option
            >
          {/each}
        </select>
      </div>
      <div class="card-detail-button-group">
        <button on:click={() => (editingAssignedTo = false)}>Cancel</button>
        <button on:click={() => (editingAssignedTo = false)}>Save</button>
      </div>
    {:else}
      <div class="card-detail-label-group">
        <span>{ticket.assignedTo}</span>
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
        <select>
          {#each statuses as status}
            <option
              value={status.value}
              selected={status.value == ticket.status}>{status.label}</option
            >
          {/each}
        </select>
      </div>
      <div class="card-detail-button-group">
        <button on:click={() => (editingStatus = false)}>Cancel</button>
        <button on:click={() => (editingStatus = false)}>Save</button>
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
