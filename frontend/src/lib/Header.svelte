<script lang="ts">
  import { onMount } from 'svelte';
  import svelteLogo from '../assets/svelte.svg';
  import type { Team } from './types.svelte';
  import {
    currentTeam,
    refreshTickets,
    teams,
    updateCurrentTeam,
  } from './stores';

  let allTeams: Array<Team> = [];
  let filteredTeams: Array<Team> = [];
  let team: string = '';
  teams.subscribe((teams) => {
    allTeams = teams;
  });
  currentTeam.subscribe((currentTeam) => {
    team = currentTeam;
  });

  const filterTeams = (
    e: InputEvent & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    filteredTeams = allTeams.filter((team) =>
      team.name.includes(e.currentTarget.value)
    );
  };

  const submitTeam = (
    e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    if (e.key === 'Enter') {
      const team = e.currentTarget.value;
      if (allTeams.find((t) => t.name === team)) {
        updateCurrentTeam(team);
        refreshTickets();
      }
    }
  };
</script>

<header>
  <div class="header-item">
    <img class="header-logo" src={svelteLogo} alt="logo" />
    <span class="header-title">QE Manager</span>
  </div>
  <div class="header-item">
    <div class="header-team-switcher">
      <input
        list="teams"
        placeholder="Select Team"
        value={team}
        on:input={filterTeams}
        on:keypress={submitTeam}
      />
      <datalist id="teams">
        {#each filteredTeams as team}
          <option>{team.name}</option>
        {/each}
      </datalist>
    </div>
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
  .header-team-switcher {
    border: 1px solid #d3d3d3;
    border-radius: 3px;
    display: flex;
    align-items: center;
  }
  .header-team-switcher > input {
    border: none;
    outline: none;
    padding: 9px;
  }
</style>
