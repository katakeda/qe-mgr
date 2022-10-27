<script lang="ts">
  export let title = 'New Board';
  export let status: String;
  export let tickets = [];
  import { getContext } from 'svelte';
  import Icon from 'svelte-awesome';
  import { plusCircle } from 'svelte-awesome/icons';
  import type Modal from 'svelte-simple-modal';
  import Card from './Card.svelte';
  import NewTicketModal from './NewTicketModal.svelte';
  const { open }: Modal = getContext('simple-modal');
  const openNewTicketModal = () => {
    open(NewTicketModal, { status });
  };
</script>

<div class="board">
  <div class="board-header">
    <div class="board-title">{title}</div>
    <span on:click={openNewTicketModal} on:keypress={null}>
      <Icon
        data={plusCircle}
        style={'height: 20px; width: 20px; fill: #008000;'}
      />
    </span>
  </div>
  <div class="card-container">
    {#each tickets as ticket}
      <Card {ticket} />
    {/each}
  </div>
</div>

<style>
  .board {
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;
    width: 20%;
    height: 80%;
    padding: 16px;
    border-radius: 10px;
  }
  .board-header {
    display: flex;
    justify-content: space-between;
  }
  .board-header > span {
    cursor: pointer;
  }
  .board-title {
    font-family: sans-serif;
    font-size: 18px;
    color: #808080;
  }
  .card-container {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    overflow: auto;
  }
</style>
