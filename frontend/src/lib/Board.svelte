<script lang="ts">
  export let title = 'New Board';
  export let tickets = [];
  import Card from './Card.svelte';
</script>

<div class="board">
  <div class="board-title">{title}</div>
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
