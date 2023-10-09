<script>
    import { comments, username } from "$lib/data";
    import { video } from "$lib/videosList";

    export let ModifyModalVisible = false;
    export let modify = false;
    export let editingCommentId = null;
    export let modifycomment = "";
    export let saveButtonVisible = false;
    export let saveButtonClickable = false;
    export let currentModal = null;
    export let videoPath;
    export let getLetterColor;
    export let overlayVisible;

    function modifica(commentId) {
        modify = true;
        editingCommentId = commentId;
    }


    function handleSaveFocus() {
        saveButtonVisible = true;
    }

    function handleSaveChange(event) {
        modifycomment = event.target.value;
        saveButtonClickable = modifycomment.trim() !== '';
    }

    function handleSaveBlur() {
        saveButtonVisible = false;
        saveButtonClickable = false;
    }

    function resetSave() {
        modify = false;
        ModifyModalVisible = false;
        handleSaveBlur();
    }

    function change() {
        $comments.find(item => item.idcomment === editingCommentId && $username === item.username).body = modifycomment;
        modify = false;
        localStorage.setItem(`comments`, JSON.stringify($comments));
        ModifyModalVisible = false;
        handleSaveBlur();
    }
    
    function openModal(index) {
        currentModal = index;
        ModifyModalVisible = true;
        overlayVisible = true;
    }

    function elimina(commentToDelete) {
        const updatedComments = $comments.filter(comment => comment !== commentToDelete);
        $comments = updatedComments;

        localStorage.setItem(`comments`, JSON.stringify(updatedComments));
    }
</script>


{#each $comments as comment, indice}
    {#if (comment.idvideo == $video.find(item => item.titolovideo == videoPath)?.id)}
        <div class="block user-comment">
            <span style='--colore:{getLetterColor(comment.username)};' id="iniziale">{comment.username.charAt(0)}</span>
            <div class="content">
                <p id="video-path">@{comment.username}</p>
                {#if !modify}
                <p id="post-body">{comment.body}</p>
                {#if (comment.idvideo == $video.find(item => item.titolovideo == videoPath)?.id) && (comment.username == $username)}
                    <div class="elimina-modifica">
                        <button id="options" on:click|stopPropagation={() => openModal(indice)}>
                            <i class="mi mi-options-vertical"></i>
                        </button>
                        {#if ModifyModalVisible && currentModal == indice}
                            {#if overlayVisible}
                                <button class="overlay" on:click={() => {ModifyModalVisible = false; overlayVisible = false; currentModal = null}}>
                                </button>
                            {/if}
                            <div class="modal-comment">
                                <div class="modal-content">
                                    <button on:click={() => modifica(comment.idcomment)} id="mod"><img src="/navigation/Modifica.png" alt="">Modifica</button>
                                    <button on:click={() => elimina(comment)} id="el"><img src="/navigation/Elimina.png" alt="">Elimina</button>
                                </div>
                            </div>
                        {/if}
                    </div>                                
                {/if}
                {:else if modify && currentModal == indice}
                    <div class="add-comment">
                        <input type="text" value={comment.body} on:focus={handleSaveFocus} on:input={handleSaveChange}>
                        <span class="focus-border"></span>
                    </div>
                    <div class="commenta">
                        {#if saveButtonVisible && currentModal == indice}
                            <div class="button-container" style="margin-top: 10px;">
                                <button on:click={() => resetSave()} class="annulla-button">Annulla</button>
                                <button on:click={() => change()} class:clickable={saveButtonClickable}>Salva</button>
                            </div>
                        {/if}
                    </div>
                {:else if modify && currentModal != indice}
                    <p id="post-body">{comment.body}</p>
                {/if}
            </div>
        </div>
    {/if}
{/each}


<style>
    .block {
        display: flex;
        align-items: flex-start;
        margin: 20px 0 0 0;
    }

    .content {
        flex: 1;
        flex-direction: column;
        position: relative;
    }
    
    #video-path {
        font-weight: bold;
        color: white;
        margin: 0;
        font-size: 14px;
    }

    #post-body {
        margin: 10px 0 10px 0;
        color: white;
        font-size: 13px;
    }

    .user-comment #iniziale {
        display: inline-block;
        font-size: 20px;
        background-color: var(--colore);
        width: 35px;
        height: 35px;
        margin-right: 20px;
        border-radius: 100%;
        text-align: center;
        line-height: 40px;
        color: white;
        padding: 0;
        line-height: 35px;
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

    .elimina-modifica {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .elimina-modifica button#options {
        border-radius: 100%;
        padding: 7px;
        border: none;
        font-weight: bold;
        display: flex;
        transition: background-color 0.3s;
        background: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }

    .elimina-modifica button#options:hover {
        background-color: rgba(255, 255, 255, 0.178);
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        z-index: 999;
        border: none;
    }

    .modal-comment {
        position: absolute;
        right: 10px;
        background-color: rgb(38, 38, 38);
        height: 90px;
        width: 146px;
        z-index: 1000;
        border-radius: 10px;
    }

    .modal-comment button{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        margin: 0;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        background-color: transparent;
        border-radius: 0;
        border: none;
        padding: 8px 0 8px 0;
    }

    .modal-comment button:hover {
        background-color: rgb(69, 68, 68);
        cursor: pointer;
    }

    .modal-comment #mod{
        margin-top: 10px;
    }

    .modal-comment #mod img{
        height: 20px;
        width: 20px;
        margin-right: 12px;
    }

    .modal-comment #el{
        margin-bottom: 10px;
    }

    .modal-comment #el img {
        height: 20px;
        width: 20px;
        margin-right: 12px;
    }


</style>