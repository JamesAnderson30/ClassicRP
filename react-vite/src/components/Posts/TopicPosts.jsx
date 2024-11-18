import TopicPost from "./Components/TopicPost";

function TopicPosts(posts){

    return (
        <div className="TopicPostList">
            {posts.posts.map((post)=>{
                return (
                    <TopicPost id={`post${post.id}`}key={`post${post.id}`} />
                )
            })}
        </div>
    )
}

export default TopicPosts;
