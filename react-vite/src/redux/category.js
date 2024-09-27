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

const initialState = {categories:[]}

const categoryReducer = (state = initialState, action) =>{
    let newCategoryState = {...state.categories}
    switch(action.type){
        case STORE_CATEGORIES:
            newCategoryState = action.categories;
            return {...state, categories:[...action.categories.categories]}
        default:
            return state;
    }
}

export default categoryReducer;
