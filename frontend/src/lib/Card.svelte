<script lang="ts">
  export let title = 'New Card';
  export let description = '';
  export let assignedTo = 'Unassigned';
</script>

<div class="card">
  <div class="card-title">{title}</div>
  <div class="card-description">{description}</div>
  <div class="card-assigned-to">{assignedTo}</div>
</div>

<style>
  .card {
    padding: 5px;
    width: 100%;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    margin-top: 16px;
    cursor: pointer;
    background-color: #f5f5dc;
  }
</style>
