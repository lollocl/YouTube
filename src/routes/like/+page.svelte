<script>

  import { video } from "$lib/videosList"
  import { videoclick, val, like, likedList, username } from "$lib/data"
  import {flip} from 'svelte/animate'
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  function clickVideo(titolo){
    $videoclick = true;
    window.location.href = `/video/Like/${titolo}`
  }

  $val = 3;

  let hovering = false;

  //drag and drop
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

    $like = newTracklist
    hovering = null;
    $likedList = newTracklist.map(item => item.id);
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

</script>


<main>
  <div class="container-video">
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
                    <button style="background-color:transparent; border: none; cursor:pointer;" on:click={() => clickVideo(videoItem.titolovideo)}>
                        <div class="content">
                            <div class="number">{index + 1}</div>
                            <div class="copertina" style="background-image: url({videoItem.copertinavideo});">
                                <span class="durata">{videoItem.durata}</span>
                            </div>
                            <div class="descrizione">
                                <div class="info">
                                    <ul>
                                        <li class="titolo">{videoItem.titolovideo}</li>
                                        <li>{videoItem.nomecanale} • {videoItem.visualizzazioni}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </div>
          </div>
      {/each}
  </div>
</main>


<style>
  .container-video {
    width: auto;
    height: auto;
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
    width: 97%;
    height: auto;
    margin: 1% 0 0 1%;
    overflow-y: hidden;
    padding: 10px 0 10px 0;
  }

  .block:hover {
    background-color: rgba(65, 65, 65, 0.458);
    cursor: pointer;
    border-radius: 15px;
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
  }

  .copertina {
    height: 170px;
    width: 300px;
    background-size: contain;
    background-repeat: no-repeat; 
    background-size: 100%;
    background-position: center;
    border-radius: 15px;
    position: relative;
  }

  .copertina .durata {
    right: 5px;
    bottom: 5px;
    font-size: 15px;
    color: white;
    background-color: rgba(0, 0, 0, 0.882);
    position: absolute;
  }

  .descrizione .info ul{
    padding: 0;
    margin: 10px 0 0 0;
  }

  .info .titolo {
    color: white;
    font-size: 20px;
    padding: 0;
  }

  .info li {
    color: rgba(65, 65, 65, 0.889);
    font-size: 15px;
  }
</style>