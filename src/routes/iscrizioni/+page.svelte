<script>
    import { videoclick, val, login } from "$lib/data";
    import { video } from "$lib/videosList"

  function clickVideo(){
    $videoclick = true;
  }

  $val = 1;
  function accedi() {
    window.location.href = `/account`
  }

</script>

<main>
    {#if $login}
    <div class="container-video">
        {#each $video as item}
            {#if item.iscriviti == true}
            <div class="block">
            <a href="/video/NotLike/{item.titolovideo}" style="text-decoration: none;" on:click={() => clickVideo()}>
            <div class="copertina" style="background-image: url({item.copertinavideo});">
                <span class="durata">{item.durata}</span>
                </div>
              <div class="descrizione">
                  <img src={item.immagineprofilo} alt="">
                  <div class="info">
                      <ul>
                          <li class="titolo">{item.titolovideo}</li>
                          <li>{item.nomecanale}</li>
                          <li>{item.visualizzazioni}</li>
                      </ul>
                  </div>
              </div></a>
          </div>
          {/if}
        {/each}
    </div>
    {:else}
      <div class="container-log">
        <p><img src="/navigation/iscrizione_max.png" alt=""></p>
        <p id="riga-1">Non perderti i nuovi video</p>
        <p id="riga-2">Accedi per vedere gli aggiornamenti dei tuoi canali preferiti di YouTube</p>
        <p><button id="nolog" on:click={accedi}><img src="/navbar/user.png" alt=""><span>Accedi</span></button></p>
      </div>
    {/if}
</main>

<style>
  .container-video {
    width: auto;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  ul {
    list-style-type: none;
  }

  .descrizione {
    display: flex;
  }

  .info {
    flex: 1;
  }

  .block {
    width: 380px;
    height: 300px;
    margin: 1% 0 0 1%;
    overflow-y: hidden;
  }

  .copertina {
    height: 200px;
    background-size: contain;
    background-repeat: no-repeat; 
    background-size: 100%;
    background-position: center;
    border-radius: 15px;
    position: relative;
  }

  .copertina .durata {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 15px;
    color: white;
    background-color: rgba(0, 0, 0, 0.882);
  }

  .descrizione img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin: 10px 10px 0 0;
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

  .container-log {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 5%;
  }

  .container-log #riga-1 {
    font-size: 25px;
    color: white;
    margin: 0;
  }

  .container-log #riga-2 {
    font-size: 15px;
    color: white;
  }

  .container-log button#nolog {
    display: flex; 
    align-items: center; 
    justify-content: center;
    color: white;
    background-color: transparent;
    border-radius: 25px;
    width: 130px;
    height: 45px;
    border: 1px solid rgba(65, 65, 65, 0.458);
  }

  .container-log button#nolog img {
    width: 30px;
    height: 30px;
    background-color: transparent;
    padding: 2px 10px 0 0;
  }

  .container-log button#nolog span {
    font-size: 16px;
    font-weight: bold;
    background-color: transparent;
    color: #3da4fc;
  }

  .container-log button#nolog:hover {
    background-color: #3da3fc41;
    cursor: pointer;
  }

</style>