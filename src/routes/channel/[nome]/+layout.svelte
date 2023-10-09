<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { video } from "$lib/videosList";
    import { onMount } from "svelte";
    import { activeLinkIndex } from "$lib/data"
    import LogButton from "$lib/components/video/LogButton.svelte";

    const videoPath = $page.params.nome;

    let isLogged = $video.find(item => item.nomecanale == videoPath)?.iscriviti;

    let counter = $video.filter(item => item.nomecanale === videoPath).length

    onMount(() => {
        if (localStorage.getItem("channels")?.includes(videoPath))
            isLogged = true
    });

    
</script>

<main>
    <div class="banner">
        <img src={$video.find(item => item.nomecanale === videoPath)?.banner} alt="">
    </div>
    <div class="wrapper">
        <div class="descrizione">
            <img src={$video.find(item => item.nomecanale === videoPath)?.immagineprofilo} alt="">
            <div class="info">
                <ul>
                    <li class="titolo">{$video.find(item => item.nomecanale === videoPath)?.nomecanale}</li>
                    <li>@{$video.find(item => item.nomecanale === videoPath)?.user} {$video.find(item => item.nomecanale === videoPath)?.niscritti} iscritti {counter} video</li>
                    <li class="three {$activeLinkIndex === 2 ? 'active-link' : ''}"><a href="/channel/{videoPath}/informazioni" style="text-decoration: none; color: #ccccccad;">
                        {$video.find(item => item.nomecanale === videoPath)?.descrizione.substring(0, 100)}
                        {#if $video.find(item => item.nomecanale === videoPath)?.descrizione.length > 100}
                            <span>&hellip;</span>
                        {/if}
                        &#5171;    
                    </a></li>
                </ul>
            </div>
            <div class="log-button">
                <LogButton
                    isLogged = {isLogged}
                    channelname = {videoPath} />
            </div>
        </div>
        <div class="container">
            <ul>
                <li class="one {$activeLinkIndex === 0 ? 'active-link' : ''}"><a href="/channel/{videoPath}/">HOME</a></li>
                <li class="two {$activeLinkIndex === 1 ? 'active-link' : ''}"><a href="/channel/{videoPath}/community">COMMUNITY</a></li>
                <li class="three {$activeLinkIndex === 2 ? 'active-link' : ''}"><a href="/channel/{videoPath}/informazioni">INFORMAZIONI</a></li>
              <hr>
            </ul>
          </div>
        <hr>
        <div class="slot">
            <slot />
        </div>
    </div>
</main>

<style>
    .banner {
        width: 100vh;
        height: auto;
    }

    .wrapper {
        display: flex;
        justify-content: center; 
        align-items: center; 
        flex-direction: column;
    }

    .log-button {
        margin-top: 30px;
    }

    .wrapper .descrizione {
        display: flex;
        width: 60%;
        position: relative;
    }

    .descrizione img {
        width: 128px;
        height: 128px;
        border-radius: 100%;
        margin: 30px 20px 0 30px;

    }

    .descrizione .info ul{
        padding: 0;
        margin: 50px 0 0 0;
        list-style: none;
    }

    .info {
        flex: 1;
    }

    .info .titolo {
        color: white;
        font-size: 25px;
        padding: 0;
    }

    .info li {
        margin-top: 5px;
        color: #ccccccad;
        font-size: 15px;
    }

    .three a span {
        margin-left: -5px;
    }   

    .container {
        width: 60%;
        margin:0 ;
    }

    .container ul {
        margin: 0;
    }

    .container ul li {
        display: inline;
        text-align: center;
        padding: 10px 0 10px 0;
    }

    .container ul li a {
        display: inline-block;
        width: 33%;
        margin: 20px 0 15px 0;
        text-decoration: none;
        color: #ccccccad;
        font-size: 25px;
    }

    .container ul li a:hover {
        color: white;
    }

    .container ul li.active-link a {
        color: white;
    }

    .two.active-link ~ hr {
        margin-left: 33%;
    }

    .three.active-link ~ hr {
        margin-left: 66%;
    }


    .container ul hr {
        height: .4rem;
        width: 33%;
        margin: 0;
        background: #ccc;
        border: none;
        transition: .3s ease-in-out;
    }

    hr {
        width: 100%;
        size: 1px;
        padding: 0;
        margin: 0;
        background: #ccccccad;
    }

    .slot {
        width:100%; 
    }
</style>