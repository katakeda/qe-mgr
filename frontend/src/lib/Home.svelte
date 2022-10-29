<script lang="ts">
  import { onMount } from 'svelte';
  import Modal from 'svelte-simple-modal';
  import { tickets, refreshTickets, refreshUsers } from './stores';
  import Board from './Board.svelte';
  import type { Ticket } from './types.svelte';

  let newTickets: Array<Ticket>,
    pendingTickets: Array<Ticket>,
    acceptedTickets: Array<Ticket>,
    rejectedTickets: Array<Ticket>;

  tickets.subscribe((tickets) => {
    newTickets = tickets.filter((ticket) => ticket.status == 'New');
    pendingTickets = tickets.filter((ticket) => ticket.status == 'Pending');
    acceptedTickets = tickets.filter((ticket) => ticket.status == 'Complete');
    rejectedTickets = tickets.filter((ticket) => ticket.status == 'Rejected');
  });

  onMount(refreshTickets);
  onMount(refreshUsers);
</script>

<div class="home">
  <Modal>
    <Board title="Ready For Review" status="New" tickets={newTickets} />
    <Board title="In Review" status="Pending" tickets={pendingTickets} />
    <Board title="Accepted" status="Complete" tickets={acceptedTickets} />
    <Board title="Rejected" status="Rejected" tickets={rejectedTickets} />
  </Modal>
</div>

<style>
  .home {
    height: calc(100vh - 85px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 48px;
  }
</style>
