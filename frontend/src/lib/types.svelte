<script lang="ts" context="module">
  export interface User {
    id?: string;
    name?: string;
  }

  export interface Ticket {
    id?: string;
    title?: string;
    description?: string;
    status?: string;
    assigned_to?: User;
    assignedTo?: string;
  }
</script>
