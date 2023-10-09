<script>

    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { videoclick, nome, comments, cognome, email, menuOpen, login, username, like, likedList, IsLike, data, users, currentValueIndex } from "$lib/data";
    import { video } from "$lib/videosList";
    import { onMount } from "svelte";
    import InfiniteScroll from "$lib/components/video/InfiniteScroll.svelte";
    import ListLike from "$lib/components/video/ListLike.svelte";
    import NavigationButtons from "$lib/components/video/NavigationButtons.svelte";
    import LikeButton from "$lib/components/video/LikeButton.svelte";
    import LogButton from "$lib/components/video/LogButton.svelte";
    import UserComment from "$lib/components/video/UserComment.svelte";
    import Comments from "$lib/components/video/Comments.svelte";

    let icons = [
        { src:"/navigation/Like.png", value:"Like" },
        { src:"/navigation/salva.png", value:"Salva" },
        { src:"/navigation/Like_clicked.png", value:"Like" }
    ]

    //Funziona come like ma con la differenza che non puoi andare avanti ed indietro con i video perché non sei in una playlist
    const videoPath = $page.params.percorso;
    const channelname = $video.find(item => item.titolovideo === videoPath)?.nomecanale
    const likePath = $page.params.Like;


    let isLiked = false;
    let isLogged = false;
    let isSubscribedText = "Iscriviti";
    

    onMount(() => {
        let videoItem = $video.find(item => item.titolovideo === videoPath);
        if (localStorage.getItem("like")?.includes(JSON.stringify(videoItem?.id)))
            isLiked = true
        console.log(localStorage.getItem("like"))
        if (localStorage.getItem("channels")?.includes(channelname))
            isLogged = true
        if (likePath == "Like")
            $IsLike = true
        else
            $IsLike = false
        if (browser) {
            const storedComments = localStorage.getItem(`comments`);
            if (storedComments) {
                const parsedComments = JSON.parse(storedComments);
                $comments = parsedComments.filter(comment => comment.idvideo === $video.find(item => item.titolovideo == videoPath)?.id);
                console.log($comments)
            }
        }
        fetchPosts();
    });

    onMount(() => {
        return () => {
            $videoclick = false;
            $menuOpen = true;
            $data = [];
        }
    });


    let pages = 0;
	let newBatch = [];
	let limit = 30

    async function fetchPosts() {
		const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&page=${pages}`);
		newBatch = await response.json();
        newBatch = newBatch.posts;
		console.log(newBatch)
	};


    $: $data = [
            ...$data,
        ...newBatch
    ];

    let comment = ''; 

    function getLetterColor(parola) {
        let letter = parola.charAt(0);
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const colorPalette = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000', '#000080'];

        const index = alphabet.indexOf(letter.toLowerCase());
        return colorPalette[index % colorPalette.length];
    }

    let commentButtonVisible = false;
    let commentButtonClickable = false;


    let iscrModalVisible = false;
    let likeModalVisible = false;
    let overlayVisible = false;
    let ModifyModalVisible = false;

    let modify = false;
    let editingCommentId = null;
    let modifycomment = "";

    let saveButtonVisible = false;
    let saveButtonClickable = false;

    

    let currentModal = null;

    

</script>

<main>
    <div class="player-container">
        <iframe src={$video.find(item => item.titolovideo === videoPath)?.videoclip} title="" frameborder="0" allowfullscreen></iframe>
    </div>
    {#if $IsLike}
        <NavigationButtons videoPath={videoPath}/>
    {/if}
    <div class="{$IsLike ? 'main-class' : 'class-main'}">
    <div class="comment-info">
    <div class="info">
        <div class="content">
            <div class="titolo-video">
                {$video.find(item => item.titolovideo === videoPath)?.titolovideo}
            </div>
            <div class="channel">
                <a href="/channel/{$video.find(item => item.titolovideo === videoPath)?.nomecanale}" style="text-decoration: none;">
                  <img src={$video.find(item => item.titolovideo === videoPath)?.immagineprofilo} alt="">
                  <div class="channel-info">
                    <span>{$video.find(item => item.titolovideo === videoPath)?.nomecanale}</span>
                    <span id="is">{$video.find(item => item.titolovideo === videoPath)?.niscritti} Iscritti</span>
                  </div>
                </a>
                <div class="log-button">
                  <LogButton
                    isLogged={isLogged}
                    channelname={channelname}
                    isSubscribedText={isSubscribedText}
                    likeModalVisible={likeModalVisible}
                    overlayVisible={overlayVisible}
                    iscrModalVisible={iscrModalVisible}
                  />
                </div>

                <div class="like-save">
                    <LikeButton 
                        isLiked = {isLiked}
                        videoPath = {videoPath}
                        icons = {icons}
                        likeModalVisible = {likeModalVisible}
                        overlayVisible = {overlayVisible}
                        iscrModalVisible = {iscrModalVisible}/>
                        
                    <button id="save"><img src={icons[1].src} alt="">{icons[1].value}</button>
                </div>
            </div>
        </div>
    </div>
    <div class="wrapper">
        <div class="comments"> 
            <UserComment 
            commentButtonClickable = {commentButtonClickable}
            commentButtonVisible = {commentButtonVisible}
            comment = {comment}
            videoPath = {videoPath}
            colore = {getLetterColor($username)} />

            <ul>
                {#if $login}
                    <Comments
                    ModifyModalVisible = {ModifyModalVisible}
                    modify = {modify}
                    editingCommentId = {editingCommentId}
                    modifycomment = {modifycomment}
                    saveButtonVisible = {saveButtonVisible}
                    saveButtonClickable = {saveButtonClickable}
                    currentModal = {currentModal}
                    videoPath = {videoPath}
                    getLetterColor = {getLetterColor}
                    overlayVisible = {overlayVisible}/>
                {/if}
                {#each $data as post}
                    <div class="block">
                        <img id="profile-image" src={$users.find(item => item.id == post.userId)?.image} alt="">
                        <div class="content">
                            <p id="video-path">@{$users.find(item => item.id == post.userId)?.username}</p>
                            <p id="post-body">{post.body}</p>
                        </div>
                    </div>
                {/each}
                <InfiniteScroll
                hasMore={newBatch.length < 150}
                threshold={100}
                on:loadMore={() => {pages++; limit=limit+30; fetchPosts()}} />
            </ul>
        </div>
    </div>
    </div>
        {#if $IsLike}   
            <div class="like-list">
                <ListLike />
            </div>
        {/if}
    </div>
</main>

<style>
    .player-container {
        width: 100%;
        margin: 0 auto;
    }

    iframe {
        width: 100%;
        height: 1080px;
    }

    .info {
        margin: 20px auto;
        color: white;
    }

    .content {
        flex-direction: column;
        position: relative;
    }

    .titolo-video {
        font-size: 20px;
        padding: 1% 0 1% 0;
    }

    .channel {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .channel a {
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    .channel img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 10px;
    }

    .channel-info {
        display: flex;
        flex-direction: column;
        margin-right: 20px;
    }

    .channel-info span {
        font-size: 20px;
        color: white;
    }

    #is {
        font-size: 15px;
        color: rgba(65, 65, 65, 0.889);
        background-color: transparent;
        margin-top: 5px;
    }

    .log-button {
        display: flex;
        align-items: center;
    }

    .channel .log-button {
        margin-right: auto;
    }
    
    .channel .like-save {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .channel #save {
        color: white;
        background-color: rgba(65, 65, 65, 0.458);
        border-radius: 25px;
        width: 120px;
        height: 40px;
        font-size: 20px;
        border: none;
        text-align: center;
    }

    .channel #save img {
        width: 30px;
        height: 15px;
        background-color: transparent;
        border-radius: 0;
        padding: 0 10px 0 0;
    }

    .wrapper {
        display: flex;
        justify-content: center; 
        align-items: center;
        width: 100%;
    }

    .block {
        display: flex;
        align-items: flex-start;
        margin: 20px 0 0 0;
    }

    #profile-image {
        width: 35px;
        height: 35px;
        margin-right: 20px;
        border-radius: 100%;
    }

    .content {
        flex: 1;
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

    .main-class {
        display: flex;
        justify-content: space-between;
        align-items: flex-start; 
        width: 70%;
        margin: auto;
        position: relative;
    }


    .like-list {
        border: 1px solid #cccccc32;
        border-radius: 20px;
        margin-left: 20px;
    }

    .class-main {
        width: 70%;
        margin: auto;
        align-items: center;
    }

</style>