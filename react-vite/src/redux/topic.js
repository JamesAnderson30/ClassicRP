// // Action Types
// const GET_QUESTIONS = 'tags/getAllQuestions'
// const LOAD_COMMENTS = 'followings/loadComments'
// const LOAD_COMMENT = 'followings/loadComment'
// const EDIT_COMMENT = 'followings/editComment'
// const DELETE_COMMENT = 'followings/deleteComment'
// const GET_USER_QUESTIONS = 'questions/getUserQuestions'
// const DELETE_QUESTION = 'questions/deleteQuestion'
// const UPDATE_QUESTION = 'qustions/updateQuestion'
const STORE_CATEGORYTOPICS = 'topics/storeCategoryTopics'


// // Action Creators
const storeCategoryTopics = (topics, category_id) =>({
    type: STORE_CATEGORYTOPICS,
    topics,
    category_id
})





// // Thunks
export const getCategoryTopics = (category_id) => async (dispatch) => {
    const res = await fetch(`/api/category/${category_id}`, {
        method: 'GET'
    })

    let result = await res.json()

    dispatch(storeCategoryTopics(result.Topics, result.category.id))
}

const initialState = {topics:{ byId:{}, byCategoryId:{}}}

const topicReducer = (state = initialState, action) =>{
    let newTopicState = {...state.topics}
    switch(action.type){
        case STORE_CATEGORYTOPICS:
            for(let topic of action.topics){
                newTopicState.byId[topic.id] = topic;
                newTopicState.byCategoryId[topic.category_id] = topic
            }
            return {...state, topics: newTopicState}
        default:
            return state;
    }
}

export default topicReducer;
