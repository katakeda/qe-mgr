<script lang="ts">
  import type { Ticket } from './types.svelte';
  export let ticket: Ticket = {};

  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import type Modal from 'svelte-simple-modal';
  import Icon from 'svelte-awesome';
  import { arrowCircleOUp, arrowCircleODown } from 'svelte-awesome/icons';
  import CardDetail from './CardDetail.svelte';
  const { open }: Modal = getContext('simple-modal');
  const openCardDetail = () => {
    open(CardDetail, { ticket });
  };
  const arrowIconStyle = 'height: 24px; width: 24px; fill: #d3d3d3;';

  let showCardCtrls = false;
  const toggleCardCtrls = () => (showCardCtrls = !showCardCtrls);

  const moveRankUp = () => {};
  const moveRankDown = () => {};
</script>

<div
  class="card"
  on:click|self={openCardDetail}
  on:keypress={null}
  on:mouseenter={toggleCardCtrls}
  on:mouseleave={toggleCardCtrls}
>
  <div class="card-detail" on:click={openCardDetail} on:keypress={null}>
    <div class="card-title">{ticket.title}</div>
    <div class="card-description">{ticket.description}</div>
    <div class="card-assigned-to">
      {ticket.assigned_to ? ticket.assigned_to.name : 'Unassigned'}
    </div>
  </div>
  {#if showCardCtrls}
    <div class="card-ctrls" transition:fade={{ duration: 250 }}>
      <span on:click={moveRankUp} on:keypress={null}>
        <Icon data={arrowCircleOUp} style={arrowIconStyle} />
      </span>
      <span on:click={moveRankDown} on:keypress={null}>
        <Icon data={arrowCircleODown} style={arrowIconStyle} />
      </span>
    </div>
  {/if}
</div>

<style>
  .card {
    min-height: 80px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    margin-top: 16px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
  }
  .card:hover {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
  .card-detail {
    padding: 10px;
    font-family: sans-serif;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #4c4e52;
  }
  .card-ctrls {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 10px;
  }
</style>
