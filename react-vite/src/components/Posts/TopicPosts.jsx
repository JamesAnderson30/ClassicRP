import TopicPost from "./Components/TopicPost";

function TopicPosts(posts){
    console.log("Posts: ", posts)
    return (
        <div className="TopicPostList">
            {posts.posts.map((post)=>{
                return (
                    <TopicPost key={`post${post.id}`} id={post.id} />
                )
            })}
        </div>
    )
}

export default TopicPosts;
