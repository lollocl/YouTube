export const load = async ({ fetch }) => {

    const fetchPosts = async () => {   
        const postRes = await fetch('https://dummyjson.com/posts?limit=150')
        const postData = await postRes.json()
        return postData.posts
    }

    return {
       posts: fetchPosts()
    }
}