<script lang="ts">
  import svelteLogo from '../assets/svelte.svg';
</script>

<header>
  <div class="header-item">
    <img class="header-logo" src={svelteLogo} alt="logo" />
    <span class="header-title">QE Manager</span>
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 48px;
    background-color: #fff;
  }
  .header-item {
    display: flex;
    justify-content: space-evenly;
  }
  .header-title {
    font-family: sans-serif;
    font-size: 32px;
    margin-left: 8px;
    color: #808080;
  }
</style>
