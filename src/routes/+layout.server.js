export const load = async ({ fetch }) => {

    const fetchUsers = async () => {   
        const postRes = await fetch('https://dummyjson.com/users?limit=100')
        const postData = await postRes.json()
        return postData.users
    }

    return {
       utenti: fetchUsers()
    }
}