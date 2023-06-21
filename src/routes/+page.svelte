<script lang="ts">
  import { page } from '$app/stores';
  import { trpc } from '$lib/trpc/client';

  let loading = false;

  let outcomes;
  let aborter: AbortController;
  const loadData = async () => {
    aborter?.abort();
    
    aborter = new AbortController();
    console.log(await trpc($page).test.query());
    outcomes = Array.from({length: 1000}).map( () => {
      return trpc($page).test.query(undefined, { signal: aborter.signal});
    });
  };
</script>

<h6>Loading data in<br /><code>+page.svelte</code></h6>

<a
  href="#load"
  role="button"
  class="secondary"
  aria-busy={loading}
  on:click|preventDefault={loadData}>Load</a
>
{#if outcomes?.length}
  {#each outcomes as outcome}
    {#await outcome then value}
    <div>
      {value}
    </div>
    {:catch err}
      <div>error {JSON.stringify(err, null, 2)}</div>
    {/await}
  {/each}
{/if}
