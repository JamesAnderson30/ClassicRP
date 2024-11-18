import { storeTopics, registerProfile } from "./topic"
import { savePosts } from "./post"

const STORE_TOPIC_PROFILES = 'topic_profiles/store_profiles'


// // Action Creators
export const storeTopicProfiles = (profiles) =>({
    type: STORE_TOPIC_PROFILES,
    profiles
})
// thunks
export const saveTopicProfiles = (profiles) => async (dispatch) =>{
    dispatch(storeTopicProfiles(profiles))
}



const initialState = {profiles:{}}

const profileReducer = (state = initialState, action) =>{
    let newProfileState = {...state.profiles}
    switch(action.type){
        case STORE_TOPIC_PROFILES:
            //console.log("action.categories.categories: ", action.categories.categories)
            for(let profile of action.profiles){
                newProfileState[profile.id] = profile
            }
            //console.log("newCategoryState: ", newCategoryState)
            return {...state, profiles: newProfileState}
        default:
            return state;
    }
}

export default profileReducer;
