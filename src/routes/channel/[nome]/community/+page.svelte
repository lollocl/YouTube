<script>
    import { page } from "$app/stores";
    import { activeLinkIndex, username, users } from "$lib/data";
    import { video } from "$lib/videosList.js";

    $activeLinkIndex = 1;

    export let data;
	const { posts } = data;
    const videoPath = $page.params.nome;
</script>
<main>
    <div class="wrapper">
        <div class="posts">
            <ul>
                {#each posts as post}
                    {#if $users.find(user => ($video.find(item => item.nomecanale === videoPath)?.user == user.username))?.id == post.userId}
                    <div class="block">
                        <img id="profile-image" src={$video.find(item => item.nomecanale === videoPath)?.immagineprofilo} alt="">
                        <div class="content">
                            <p id="video-path">{videoPath}</p>
                            <p id="post-body">{post.body}</p>
                        </div>
                    </div>
                    {/if}
                {/each}
            </ul>
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

    .posts {
        width: 60%;
    }

    .block {
        display: flex;
        align-items: flex-start;
        border: 1px solid #cccccc71;
        border-radius: 20px;
        padding: 10px;
        margin: 20px 0 20px 0;
        width: 80%;
    }

    #profile-image {
        width: 40px;
        height: 40px;
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
        font-size: 18px;
    }

    #post-body {
        margin: 12px 0 15px 0;
        color: white;
        font-size: 16px;
    }

</style>