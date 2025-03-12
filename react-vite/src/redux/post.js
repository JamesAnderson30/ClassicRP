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

export const savePosts = (posts) => ({
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
export const recentPosts = () => async (dispatch) =>{
    const res = await fetch(`/api/post/recent`, {
        method: 'GET',
        headers: { "Content-Type": "application/json"}
    })
    let posts = await res.json();
    return JSON.stringify(posts);
    
}

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
    if(post.topic_profile_id !== null){
        const Topic_Profile_Res = await fetch(`/api/post/topic_profile/${post.topic_profile_id}`)
        let Topic_Profile = await Topic_Profile_Res.json()
        newPost['Topic_Profile'] = Topic_Profile;
    }
    newPost["username"] = newPost.user.username;
    dispatch(createPost(newPost))
    dispatch(storeTopicPost(newPost))
    return JSON.stringify(newPost)
}

export const editPost = (post) => async (dispatch) =>{
    const res = await fetch(`/api/post/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  });
  if(res.ok){
    dispatch(updatePost(await res.json()));
    return true;
  } else {
    return false;
  }
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
            newPostState.byId[action.post.id] = {...action.post, user_id: action.post.user.id};
            newPostState.all = [...newPostState.all, {...action.post, user_id: action.post.user.id}]

            return {...state, posts: newPostState}
        case SAVE_POSTS:
            for(let post of action.posts){
                if(!newPostState.byId[post.id]){
                    newPostState.all.push(post)
                }
                newPostState.byId[post.id] = post;
            }
            
            return {...state, posts: newPostState}
        case UPDATE_POST:
            newPostState.byId[action.post.id].body = action.post.body;
            return {...state, posts: newPostState}
        case DELETE_POST:
            delete newPostState.byId[action.id];
            newPostState.all = newPostState.all.filter((post) => post.id != action.id);
            return {...state, posts: newPostState}
        default:
            return state;
    }
}

export default postReducer;
