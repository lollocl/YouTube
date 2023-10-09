<script>
    import { browser } from "$app/environment";
    import { like, likedList, login, username } from "$lib/data";
    import { video } from "$lib/videosList";


    export let isLiked;
    export let videoPath;
    export let icons;
    export let likeModalVisible;
    export let overlayVisible;
    export let iscrModalVisible;
    
    function clickLike() {
        isLiked = !isLiked;
        if(isLiked == true) {
            let videoItem = $video.find(item => item.titolovideo === videoPath);
            if (videoItem != null) {
                videoItem.like = true;
                $like.push(videoItem);
                $likedList = $like.filter(item => item.like).map(item => item.id);
                browser && localStorage.setItem(`like`, $likedList.join(','));
            }
        }
        else {
            let videoItem = $video.find(item => item.titolovideo === videoPath);
            if (videoItem != null) {
                videoItem.like = false;
                $like = $like.filter(item => item !== videoItem);
                $likedList = $like.filter(item => item.like).map(item => item.id);
                browser && localStorage.setItem(`like`, $likedList.join(','));
            }
        }
    }

    function accedi() {
        window.location.href = `/account`
    }
</script>

{#if $login}
    <button id="like" on:click={clickLike} class={isLiked ? "liked" : ""}>
        <img src={icons[isLiked ? 2 : 0].src} alt="">{isLiked ? icons[2].value : icons[0].value}
    </button>
{:else}
    <button id="like" on:click|stopPropagation={() => {likeModalVisible = true; overlayVisible = true}}>
        <img src={icons[0].src} alt="">{icons[0].value}
    </button>
        {#if likeModalVisible}
            {#if overlayVisible}
                <button class="overlay" on:click={() => { iscrModalVisible = false; likeModalVisible = false; overlayVisible = false}}>
                </button>
            {/if}
            <div class="modal-like">
                <div class="modal-content">
                    <p id="rigam-1">Ti piace questo video?</p>
                    <p id="rigam-2">Esegui l'accesso: la tua opinione è importante.</p>
                    <button id="nolog" on:click={accedi}>Accedi</button>
                </div>
            </div>
        {/if}
{/if}

<style>
    #like{
        color: white;
        background-color: rgba(65, 65, 65, 0.458);
        border-radius: 25px;
        width: 100px;
        height: 40px;
        font-size: 20px;
        border: none;
        text-align: center;
    }

    #like.liked {
        background-color: #006ecf;
    }

    #like:hover {
        cursor: pointer;
    }

    #like img {
        width: 20px;
        height: 20px;
        background-color: transparent;
        border-radius: 0;
        padding: 0 10px 0 0;
    }

    .modal-like {
        position: absolute;
        right: 14%;
        background-color: rgb(38, 38, 38);
        height: 174px;
        width: 378px;
        z-index: 1000;
    }

    #rigam-1 {
        color: white;
        padding-left: 10px;
    }

    #rigam-2 {
        color: #cccccc63;
        padding-left: 10px;
    }

    button#nolog {
        font-size: 14px;
        font-weight: bold;
        background-color: transparent;
        color: #3da4fc;
        border: none;
        border-radius: 20px;
        position: relative;
        margin: 10% 0 0 10px;
        padding: 10px;
    }

    button#nolog:hover {
        background-color: #3da3fc41;
        cursor: pointer;
    }
</style>