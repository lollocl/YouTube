<script>
    import { login, username, comments } from "$lib/data";
    import { video } from "$lib/videosList";

    export let commentButtonClickable;
    export let commentButtonVisible;
    export let comment;
    export let videoPath;
    export let colore; 


    function handleInputFocus() {
        commentButtonVisible = true;
    }

    function handleInputBlur() {
        commentButtonVisible = false;
        commentButtonClickable = false;
    }

    function handleInputChange(event) {
        comment = event.target.value;
        commentButtonClickable = comment.trim() !== '';
    }

    function resetInput() {
        comment = "";
        handleInputBlur();
    }

    let i=0
    function commenta() {
        if (comment.trim() !== "") {
            i = i+1
            const newComment = {
                username: $username,
                body: comment,
                idvideo: $video.find(item => item.titolovideo == videoPath)?.id,
                idcomment: i
            };

            $comments = [...$comments, newComment];

            localStorage.setItem(`comments`, JSON.stringify($comments));
            
            comment = "";
            handleInputBlur();
        }
    }

    function accedi() {
        window.location.href = `/account`
    }

</script>

<div class="commento-utente">
    {#if $login}
        <span style='--colore:{colore};' id="iniziale">{$username.charAt(0)}</span>
        <div class="add-comment">
            <input type="text" bind:value={comment} placeholder="Aggiungi un commento..." on:focus={handleInputFocus} on:input={handleInputChange}>
            <span class="focus-border"></span>
        </div>
    {:else}
        <span><img src="/video/user_comment.png" alt="" id="no-user"></span>
        <div class="add-comment">
            <button on:click={accedi} id="nocomment">Aggiungi un commento...</button>
        </div>
    {/if}
</div>
<div class="commenta">
    {#if commentButtonVisible}
        <div class="button-container">
            <button on:click={resetInput} class="annulla-button">Annulla</button>
            <button on:click={commenta} class:clickable={commentButtonClickable}>Commenta</button>
        </div>
    {/if}
</div>

<style>
    .commento-utente {
        display: flex;
    }

    .commento-utente #iniziale {
        display: inline-block;
        font-size: 20px;
        background-color: var(--colore);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: white;
    }

    .commento-utente #no-user {
        border-radius: 100%;
        width: 40px;
        height: 40px;
    }

    .commento-utente #nocomment {
        border: none;
        border-bottom: 1px solid #cccccc63;
        background-color: transparent;
        width: 100%;
        color: #cccccc63;
        margin: 0 0 0 10px;
        padding: 0 0 10px 0;
        font-size: 15px;
        text-align: left;
    }

    .add-comment {
        flex: 1;
        position: relative;
    }

    .add-comment input {
        border: 0;
        padding: 7px 0; 
        border-bottom: 1px solid #5c5959;
        width: 100%;
        background-color: transparent;
        outline: none;
        margin: 0 0 0 10px;
        color: white;
    }

    .add-comment input ~ .focus-border {
        position: absolute;
        left: 50%; 
        width: 0; 
        height: 2px; 
        background-color: white; 
        transition: 0.4s;
        margin: 0 0 0 10px;
    }

    .add-comment input:focus ~ .focus-border {
        transition: 0.4s;
        left: 0; 
        color: white;
        width: 100%;
    }

    .add-comment input::placeholder {
        color: #cccccc63;
    }

    .commenta {
        display: flex;
        justify-content: flex-end;
        position: relative;
    }

    .commenta .button-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .commenta button {
        font-size: 15px;
        border-radius: 25px;
        padding: 10px 15px;
        border: none;
        font-weight: bold;
        display: flex;
        cursor: not-allowed;
        transition: background-color 0.3s;
        background-color: #cccccc32;
        color: rgba(255, 255, 255, 0.365);
    }

    .commenta button.annulla-button {
        background: none;
        color: white;
        font-size: 15px;
        cursor: pointer;
    }

    .commenta button.annulla-button:hover {
        background-color: rgba(255, 255, 255, 0.178);
    }

    .commenta button.clickable {
        background-color: #3da4fc;
        cursor: pointer;
        color: rgb(14, 13, 13);
    }

    .commenta button.clickable:hover {
        background-color: rgba(61, 164, 252, 0.8);
    }
</style>