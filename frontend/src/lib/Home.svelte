<script lang="ts">
  import Board from './Board.svelte';

  interface User {
    id: string;
    name: string;
  }

  interface Ticket {
    id: string;
    title: string;
    description: string;
    status: string;
    assigned_to: User;
    assignedTo: string;
  }

  let newTickets,
    pendingTickets,
    acceptedTickets,
    rejectedTickets: Array<Ticket>;
  (async () => {
    const response = await fetch('http://localhost:8080/api/tickets/');
    let tickets: Array<Ticket> = await response.json();
    tickets = tickets.map((ticket) => ({
      ...ticket,
      assignedTo: ticket.assigned_to?.name,
    }));

    newTickets = tickets.filter((ticket) => ticket.status == 'New');
    pendingTickets = tickets.filter((ticket) => ticket.status == 'Pending');
    acceptedTickets = tickets.filter((ticket) => ticket.status == 'Complete');
    rejectedTickets = tickets.filter((ticket) => ticket.status == 'Rejected');
  })();
</script>

<div class="home">
  <Board title="New" tickets={newTickets} />
  <Board title="In Review" tickets={pendingTickets} />
  <Board title="Accepted" tickets={acceptedTickets} />
  <Board title="Rejected" tickets={rejectedTickets} />
</div>

<style>
  .home {
    height: calc(100vh - 85px);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>
