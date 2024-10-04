// // Action Types
// const GET_QUESTIONS = 'tags/getAllQuestions'
// const LOAD_COMMENTS = 'followings/loadComments'
// const LOAD_COMMENT = 'followings/loadComment'
// const EDIT_COMMENT = 'followings/editComment'
// const DELETE_COMMENT = 'followings/deleteComment'
// const GET_USER_QUESTIONS = 'questions/getUserQuestions'
// const DELETE_QUESTION = 'questions/deleteQuestion'
// const UPDATE_QUESTION = 'qustions/updateQuestion'
const STORE_CATEGORIES = 'categores/storeCategories'


// // Action Creators
const storeCategories = (categories) =>({
    type: STORE_CATEGORIES,
    categories
})



// // Thunks
export const getCategories = () => async (dispatch) => {
    const res = await fetch('/api/category/', {
        method: 'GET'
    })

    let categories = await res.json()
    dispatch(storeCategories(categories))
    return categories.categories
}

const initialState = {categories:{byId:{}, all:[]}}

const categoryReducer = (state = initialState, action) =>{
    let newCategoryState = {...state.categories}
    switch(action.type){
        case STORE_CATEGORIES:
            //console.log("action.categories.categories: ", action.categories.categories)
            newCategoryState.all = action.categories.categories;
            for(let topic of action.categories.categories){
                newCategoryState.byId[topic.id] = topic;
            }
            return {...state, categories: newCategoryState}
        default:
            return state;
    }
}

export default categoryReducer;
