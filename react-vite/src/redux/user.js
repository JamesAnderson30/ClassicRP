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
        dispatch(storeUser(user))
        console.log("user: ", user);
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
            console.log("action: ", action)
            console.log("newUserState: ", newUserState)
            //console.log("newCategoryState: ", newCategoryState)
            return {...state, newUserState}
        default:
            return state;
    }
}

export default users;
