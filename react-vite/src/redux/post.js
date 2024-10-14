//Helper Function

import { storeTopicPost } from "./topic"

// const searchTopicPosts = (topic_id) =>{
//     const posts = useSelector(state=> state.post.post.posts.all);
//     return posts.filter((post)=>{post.topic_id == topic_id})
// }




const CREATE_POST = 'post/createPost'
const UPDATE_POST = 'post/updatePost'
const SAVE_POSTS = 'post/savePost'
const DELETE_POST = 'post/deletePost'

// // Action Creators
const createPost = (post) =>({
    type: CREATE_POST,
    post
})

const savePosts = (posts) => ({
    type: SAVE_POSTS,
    posts
})

const removePost = (id) => ({
    type: DELETE_POST,
    id
})

// update post really just needs id and body for now

const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})

// // Thunks
export const deletePost = (id) => async (dispatch) =>{
    await fetch(`/api/post/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json"}
    })
    dispatch(removePost(id))
}
export const sendPost = (post) => async (dispatch) => {
    const res = await fetch('/api/post/new', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    })
    let newPost = {...post, id: await res.json()}
    dispatch(createPost(newPost))
    dispatch(storeTopicPost(newPost))
    return JSON.stringify(newPost)
}

export const editPost = (post) => async (dispatch) =>{
    const response = await fetch(`/api/post/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  });

  dispatch(updatePost(await response.json()));
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
            newPostState.all = [...newPostState.all, action.post]
            let newTopicState = {...state}
            return {...state, posts: newPostState}
        case SAVE_POSTS:
            for(let post of action.posts){
                newPostState.byId[post.id] = post;
            }
            newPostState.all = [...(new Set(newPostState.all.concat(action.posts)))]
            return {...state, posts: newPostState}
        case UPDATE_POST:
            newPostState.byId[action.post.id].body = action.post.body;
            return {...state, posts: newPostState}
        case DELETE_POST:
            delete newPostState.byId[action.id];
            return {...state, posts: newPostState}
        default:
            return state;
    }
}

export default postReducer;
