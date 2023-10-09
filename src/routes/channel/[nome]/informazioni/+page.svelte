<script>
    import { page } from "$app/stores";
    import { activeLinkIndex } from "$lib/data";
    import { video } from "$lib/videosList";

    $activeLinkIndex = 2;
    const videoPath = $page.params.nome;
</script>

<main>
    <div class="wrapper">
        <div class="info">
            <div class="descrizione">
                <p>Descrizione</p>
                <p>{$video.find(item => item.nomecanale === videoPath)?.descrizione}</p>
                <hr>
            </div>
            <div class="data">
                <p>Data d'iscrizione: {$video.find(item => item.nomecanale === videoPath)?.dataiscrizione}</p>
            </div>
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

    .info {
        width: 60%;
    }

    .descrizione hr {
        background-color: #cccccc68;
        font-size: 1px;
    }

    p {
        color: white;
        font-size: 20px;
    }
</style>