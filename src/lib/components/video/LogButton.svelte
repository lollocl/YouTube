<script>
    import { browser } from "$app/environment";
    import { like, likedList, login, username } from "$lib/data";
    import { video } from "$lib/videosList";


    export let isLogged;
    export let channelname;
    export let isSubscribedText;
    export let iscrModalVisible;
    export let overlayVisible;
    export let likeModalVisible;

    let subscribedChannelsSet = new Set();
    
    function clickLogged() {
        isLogged = !isLogged;
        if(isLogged == true) {
            $video.forEach(item => {
                console.log(channelname)
                if (item.nomecanale == channelname)
                    item.iscriviti = true;
            });
            isSubscribedText = "Iscritto";
        }
        else {
            $video.forEach(item => {
                if (item.nomecanale == channelname)
                    item.iscriviti = false;
            });
            isSubscribedText = "Iscriviti";
        }
        $video.forEach(item => {
        if (item.iscriviti == true) {
            subscribedChannelsSet.add(item.nomecanale);
        }
        });
        const subscribedChannels = Array.from(subscribedChannelsSet);
        localStorage.setItem("channels", JSON.stringify(subscribedChannels))
    }

    function accedi() {
        window.location.href = `/account`
    }
</script>

{#if $login}
    <button id="iscr" on:click={clickLogged} class:clicked={isLogged}>{isLogged ? "Iscritto" : isSubscribedText}</button>
{:else}
    <button id="iscr" on:click|stopPropagation={(event) => {iscrModalVisible = true; overlayVisible = true;}}>Iscriviti</button>
    {#if iscrModalVisible}
        {#if overlayVisible}
            <button class="overlay" on:click={() => { iscrModalVisible = false; likeModalVisible = false; overlayVisible = false; }}>
            </button>
        {/if}
        <div class="modal-iscr">
            <div class="modal-content">
                <p id="rigam-1">Vuoi iscriverti a questo canale?</p>
                <p id="rigam-2">Accedi per iscriverti a questo canale.</p>
                <button id="nolog" on:click={accedi}>Accedi</button>
            </div>
        </div>
    {/if}
{/if}

<style>
    #iscr {
        color: rgb(14, 13, 13);
        background-color: white;
        border-radius: 25px;
        width: 100px;
        height: 40px;
        font-size: 20px;
        border: none;
    }

    #iscr:hover {
        cursor: pointer;
    }

    #iscr.clicked {
        background-color: rgba(65, 65, 65, 0.889);
        color: white;
    }

    .modal-iscr {
        position: absolute;
        left: 17%;
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