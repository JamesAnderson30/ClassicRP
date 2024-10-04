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
const STORE_TOPIC = 'topics/storeTopics'

// // Action Creators
const storeCategoryTopics = (topics, category_id) =>({
    type: STORE_CATEGORYTOPICS,
    topics,
    category_id
})

const storeTopic = (topic) => ({
    type: STORE_TOPIC,
    topic
})




// // Thunks
export const getCategoryTopics = (category_id) => async (dispatch) => {
    const res = await fetch(`/api/category/${category_id}`, {
        method: 'GET'
    })

    let result = await res.json()

    dispatch(storeCategoryTopics(result.Topics, result.category.id))
    return result;
}

export const getTopic = (topic_id) => async (dispatch) =>{
    const res = await fetch(`/api/topic/${topic_id}`, {
        method: 'GET'
    })
    let result = await res.json();

    dispatch(storeTopic(result))
}

const initialState = {topics:{ byId:{}, byCategoryId:{}}}

const topicReducer = (state = initialState, action) =>{
    let newTopicState = {...state.topics}
    switch(action.type){
        case STORE_CATEGORYTOPICS:
            for(let topic of action.topics){
                newTopicState.byId[topic.id] = topic;
                newTopicState.byCategoryId[topic.category_id] = topic
                if(newTopicState.byCategoryId[topic.category_id].length > 0){
                    newTopicState.byCategoryId[topic.category_id].push(topic)
                } else {
                    newTopicState.byCategoryId[topic.category_id] = [topic]
                }
            }
            return {...state, topics: newTopicState}
        case STORE_TOPIC:
            let byCategoryId = newTopicState.byCategoryId[action.topic.category_id];

            if(byCategoryId == undefined){
                byCategoryId = {}
                byCategoryId[action.topic.category_id] = [action.topic]
            } else {
                for(let i = 0; i < byCategoryId.length; i++){
                    let topic = byCategoryId[i];
                    if(topic.id == action.topic.id){
                        byCategoryId[i] = action.topic
                    }
                }
            }
            newTopicState.byCategoryId = byCategoryId;
            newTopicState.byId[action.topic.id] = action.topic;
            return {...state, topics: newTopicState}
        default:
            return state;
    }
}

export default topicReducer;
