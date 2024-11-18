import { storeTopics, registerProfile } from "./topic"
import { savePosts } from "./post"
import { saveTopicProfiles } from "./topic_profile"

const STORE_USER = 'users/store_user'


// // Action Creators
const storeUser = (user) =>({
    type: storeUser,
    user
})



// // Thunks
export const getUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`, {
        method: 'GET'
    })
    if(res.ok){
        let user = await res.json()

        if(typeof user.Topics !== undefined){
            dispatch(storeTopics(user.Topics))
        }
        if(typeof user.Topic_Profiles !== undefined){
            dispatch(saveTopicProfiles(user.Topic_Profiles))            
        }

        if(typeof user.Posts !== undefined){
            dispatch(savePosts(user.Posts))
        }
        return user
    } else {
        return false;
    }
}

const initialState = {users:{byId:{}}}

const users = (state = initialState, action) =>{
    let newUserState = {...state.users}
    
    switch(action.type){
        case STORE_USER:
            //console.log("action.categories.categories: ", action.categories.categories)
            //console.log("newCategoryState: ", newCategoryState)
            return {...state, newUserState}
        default:
            return state;
    }
}

export default users;
