<script lang="ts">
  import { onMount } from 'svelte';
  import { refreshTeams } from './lib/stores';
  import Header from './lib/Header.svelte';
  import Home from './lib/Home.svelte';

  onMount(refreshTeams);
</script>

<main>
  <Header />
  <Home />
</main>

<style>
  main {
    background-color: #74be43;
    height: 100vh;
  }
</style>
