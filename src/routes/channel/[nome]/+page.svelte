<script>
    import { page } from "$app/stores";
    import { activeLinkIndex } from "$lib/data";
    import { videoclick, val } from "$lib/data";
    import { video } from "$lib/videosList";
    
      function clickVideo(){
        $videoclick = true;
      }
    
      $val = 1;
      const videoPath = $page.params.nome;

    $activeLinkIndex = 0;
</script>


    
<main>
    <div class="wrapper">
        <div class="container-video">
            {#each $video as item}
                {#if item.nomecanale == videoPath}
                <div class="block">
                <a href="/video/NotLike/{item.titolovideo}" style="text-decoration: none;" on:click={() => clickVideo()}>
                <div class="copertina" style="background-image: url({item.copertinavideo});">
                    <span class="durata">{item.durata}</span>
                    </div>
                    <div class="descrizione">
                        <div class="info">
                            <ul>
                                <li class="titolo">{item.titolovideo}</li>
                                <li>{item.visualizzazioni} visualizzazioni</li>
                            </ul>
                        </div>
                    </div></a>
                </div>
                {/if}
            {/each}
        </div>
    </div>
</main>

<style>
    .wrapper {
        display: flex;
        justify-content: center; 
        align-items: center;
        width: 100%;
    }
    
    .container-video {
        width: 60%;
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
        width: 210px;
        height: 260px;
        margin: 1% 0 0 1%;
        overflow-y: hidden;
    }

    .copertina {
        height: 120px;
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