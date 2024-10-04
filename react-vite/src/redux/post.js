//Helper Function

const searchTopicPosts = (topic_id) =>{
    const posts = useSelector(state=> state.post.post.posts.all);
    return posts.filter((post)=>{post.topic_id == topic_id})
}




const CREATE_POST = 'post/createPost'
const SAVE_POSTS = 'post/savePost'


// // Action Creators
const createPost = (post) =>({
    type: CREATE_POST,
    post
})

const savePosts = (posts) => ({
    type: SAVE_POSTS,
    posts
})


// // Thunks
export const sendPost = (post) => async (dispatch) => {
    const res = await fetch('/api/post/new', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    })
    let newPost = {...post, id: await res.json()}
    dispatch(createPost(newPost))
    return JSON.stringify(newPost)
}

export const editPost = (post) => async (dispatch) =>{
    console.log("edit Post: ", post);
    //const res = await fetch(`/api/post/`)
}

export const getPosts = (topic_id) => async (dispatch) =>{
    const res = await fetch(`/api/post/topic/${topic_id}`)
    let posts = await res.json();

    dispatch(savePosts(posts))
    return JSON.stringify(posts);
}

const initialState = {posts: {byId: {}, all:[]}}

const postReducer = (state = initialState, action) =>{
    let newPostState = {...state.posts}
    switch(action.type){
        case CREATE_POST:
            newPostState.byId[action.post.id] = action.post;
            newPostState.all.push(action.post)
            return {...state, posts: newPostState}
        case SAVE_POSTS:
            for(let post of action.posts){
                newPostState.byId[post.id] = post;
            }
            newPostState.all = [...(new Set(newPostState.all.concat(action.posts)))]
            return {...state, posts: newPostState}
        default:
            return state;
    }
}

export default postReducer;
