<script>
    import { currentValueIndex, likedList } from "$lib/data";
    import { video } from "$lib/videosList"

    export let videoPath;

    //Funzioni per spostarsi nella playlist like
    function goToPrevVideo() {
        $currentValueIndex = $video.find(item => item.titolovideo === videoPath)?.id
        let currentIndex = $likedList.indexOf($currentValueIndex);
        if (currentIndex > 0) {
            let prevVideoIndex = $likedList[currentIndex-1]
            const prevVideoPath = $video.find(item => item.id === prevVideoIndex)?.titolovideo;;
            window.location.href = `/like/video/${prevVideoPath}`;
        }
    }

    function goToNextVideo() {
        $currentValueIndex = $video.find(item => item.titolovideo === videoPath)?.id
        let currentIndex = $likedList.indexOf($currentValueIndex);
        if (currentIndex < $likedList.length - 1) {
            let nextVideoIndex = $likedList[currentIndex+1] 
            const nextVideoPath = $video.find(item => item.id === nextVideoIndex)?.titolovideo;
            window.location.href = `/like/video/${nextVideoPath}`;
        }
    }

</script>


<div class="navigation-buttons">
    <button on:click={goToPrevVideo}>Indietro</button>
    <button on:click={goToNextVideo}>Avanti</button>
</div>

<style>
    .navigation-buttons {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
    }

    .navigation-buttons button {
        padding: 10px 15px;
        font-size: 16px;
        background-color: rgba(65, 65, 65, 0.458);
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }

    .navigation-buttons button:hover {
        background-color: rgba(65, 65, 65, 0.7);
    }
</style>