import PostBody from "./Components/PostBody"

function TopicPost(id){
    const categories = useSelector((state) => state.categoryState)
    if(posts[id]){
        const post = posts[id]
        return (
            <PostBody post={post} />
        )
    }
}
