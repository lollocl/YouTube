<script>
  import { videoclick, val, like, likedList, username } from "$lib/data";
  import { flip } from 'svelte/animate';
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { video } from "$lib/videosList";

  function clickVideo() {
    $videoclick = true;
  }

  $val = 3;

  let hovering = false;

  // drag and drop
  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = [...$like];

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }

    $like = newTracklist;
    hovering = null;
    $likedList = newTracklist.filter(item => item.like).map(item => item.id);
    aggiornamento(`like`, $likedList);
  }

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i;
    event.dataTransfer.setData('text/plain', start);
  }

  function aggiornamento(nome, lista) {
    browser && localStorage.setItem(nome, lista.join(','));
  }

  async function loadDataFromLocalStorage() {
    return new Promise((resolve) => {

      if (localStorage.getItem(`like`)) {
        const likedVideoIds = (localStorage.getItem(`like`)?.split(',') || []).map(Number);
        let app = likedVideoIds.length;
        for (let i = 0; i < likedVideoIds.length; i++) {
          $like.pop();
        }
        for (let i = 0; i < app; i++) {
          $like.push($video.find(item => likedVideoIds[i] == item.id));
        }
        $likedList = likedVideoIds;
      }
      resolve(undefined);
    });
  }

  let loading = true;

  onMount(async () => {
    await loadDataFromLocalStorage();
    loading = false;
  });
</script>

<main>
  <div class="container-video">
    {#if loading}
      <p style="color: white;">Caricamento in corso...</p>
    {:else}
      <div class="piaciuti">Video piaciuti</div>
      {#each $like as videoItem, index (videoItem.id)}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            animate:flip
            draggable={true} 
            on:dragstart={event => dragstart(event, index)}
            on:drop|preventDefault={event => drop(event, index)}
            ondragover="return false"
            on:dragenter={() => hovering = index}
            class:is-active={hovering === index}>
              <div class="block">
                <a href="/like/video/{videoItem.titolovideo}" style="text-decoration: none;" on:click={() => clickVideo()}>
                  <div class="content">
                    <div class="number">{index + 1}</div>
                    <div class="copertina">
                      <img src="{videoItem.copertinavideo}" alt="">
                      <span class="durata">{videoItem.durata}</span>
                    </div>                    
                    <div class="descrizione">
                      <div class="info">
                        <ul>
                          <li class="titolo">{videoItem.titolovideo}</li>
                          <li>{videoItem.nomecanale}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
          </div>
      {/each}
    {/if}
  </div>
</main>

  
  
  <style>
    .container-video {
      width: 400px;
      height: 460px;
      overflow-y: auto;
    }

    .piaciuti {
      color: white;
      font-size: 20px;
      padding: 10px 0 10px 10px;
      background-color: rgb(39, 39, 39);
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  
    ul {
      list-style-type: none;
    }
  
    .descrizione {
      display: flex;
      margin: 20px 0 0 20px;
    }
  
    .info {
      flex: 1;
    }
  
    .block {
      height: auto;
      overflow-y: hidden;
      padding: 10px 0 10px 0;
      margin: 0;
    }
  
    .block:hover {
      background-color: rgba(65, 65, 65, 0.825);
      cursor: pointer;
    }
  
    .content {
      display: flex;
    }
  
    .number {
      color: #ccc;
      font-size: 20px;
      justify-content: center;
      text-align: center;
      margin: 0 10px 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  
    .copertina {
      position: relative;
    }

    .copertina img {
      height: 80px;
      width: 130px;
      border-radius: 15px;
      display: flex;
      align-items: center;
    }

    .copertina .durata {
      position: absolute;
      right: 5px;
      bottom: 5px;
      font-size: 10px;
      color: white;
      background-color: rgba(0, 0, 0, 0.882);
    }

    .descrizione {
      margin: 0 0 0 10px;
    }
  
    .descrizione .info ul{
      padding: 0;
      margin: 0;
    }
  
    .info .titolo {
      color: white;
      font-size: 15px;
      padding: 0;
    }
  
    .info li {
      color: rgba(65, 65, 65, 0.889);
      font-size: 10px;
    }
  </style>