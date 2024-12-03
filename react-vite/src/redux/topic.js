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
const STORE_TOPIC = 'topics/storeTopic'
const UPDATE_TOPIC = 'topics/updateTopic'
const REMOVE_TOPIC = 'topics/removeTopic'
const RECENT_TOPICS = 'topics/getRecentTopis'
const STORE_TOPICPOST = 'topics/storeTopicPosts'

// // Action Creators

export const storeTopicPost = (post) => ({
    type: STORE_TOPICPOST,
    post
})



const storeCategoryTopics = (topics, category_id) =>({
    type: STORE_CATEGORYTOPICS,
    topics,
    category_id
})

const removeTopic = (topic) =>({
    type: REMOVE_TOPIC,
    topic
})

const updateTopic = (topic) =>({
    type: UPDATE_TOPIC,
    topic
})

const storeTopic = (topic) => ({
    type: STORE_TOPIC,
    topic
})

export const storeTopics = (topics) => ({
    type: STORE_CATEGORYTOPICS,
    topics
})




// // Thunks

//I decided to make this a post merely because I didn't like the idea of a really long set being in the url
export const getTheseTopics = (topic_ids) => async (dispatch) =>{
    if(topic_ids < 1){
        return  {"error": "Empty request"}
    } else{
        console.log("Topic_ids: ", topic_ids);

        const res = await fetch(`/api/topic/these`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(Array.from(topic_ids))
        })
        if(res.ok){
            let topics = await res.json()
            dispatch(storeTopics(topics))
        }
        
    }
}
export const getRecentTopics = () => async (dispatch) =>{
    const res = await fetch(`/api/topic/recent`,{
        method:"GET"
    })
    if(res.ok){
        let topics = await res.json()
        dispatch(storeTopics(topics))

        return topics
    } else {

        return "error";
    }
}

export const deleteTopic = (topic) => async (dispatch) =>{
    const res = await fetch(`/api/topic/${topic.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({'id': topic.id})
    })
    if(res.ok){
        dispatch(removeTopic(topic));
        return true;
    } else {
        return {"error": "Item could not be deleted"}
    }
}
export const sendTopic = (topic) => async (dispatch) => {
    
    const res = await fetch('/api/topic/new', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topic)
    })
    let newTopic = {...topic, id: await res.json()}
    dispatch(storeTopic(newTopic))
    return JSON.stringify(newTopic)
}

export const editTopic = (topic) => async (dispatch) =>{
    const response = await fetch(`/api/topic/${topic.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(topic)
  });

  dispatch(updateTopic(await response.json()));
}

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
    if(result.message) return false;
    else {
        dispatch(storeTopic(result))
        return true;
    }
}

export const registerProfile = (profile, topic_id) => async (dispatch) =>{
    const res = await fetch(`/api/topic/${topic_id}/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
    })
    let profile_id = await res.json();
    return {...profile, "id": profile_id};
}

const initialState = {topics:{ byId:{}, byCategoryId:{}}}

const topicReducer = (state = initialState, action) =>{
    let newTopicState = {...state.topics}
    switch(action.type){
        case STORE_TOPICPOST:
            newTopicState.byId[action.post.topic_id].Posts.push({...action.post,user_id: action.post.user.id, topic_id: action.post.topic_id.topic_id})

            return {...state, topics: newTopicState}
        case REMOVE_TOPIC:
            //remove from byId
            if(newTopicState.byId[action.topic.id]){
                delete newTopicState.byId[action.topic.id]
            }
            //remove from Category_id
            let byCategoryId = newTopicState.byCategoryId[action.topic.category_id]
            byCategoryId = byCategoryId.map((topic)=>{
                if(topic.id != action.topic.id) return topic
            })

            return {...state, topics: newTopicState}
        // This is specifically to store the topics that belong to a category
        case STORE_CATEGORYTOPICS:
            newTopicState.byCategoryId[action.category_id] = [];
            for(let topic of action.topics){

                newTopicState.byId[topic.id] = topic;
                // Empty the state first
                //newTopicState.byCategoryId[topic.category_id] = the category byId state
                if(typeof newTopicState.byCategoryId[topic.category_id] !== 'undefined'){
                    newTopicState.byCategoryId[topic.category_id].push(topic)
                } else {
                    newTopicState.byCategoryId[topic.category_id] = [topic]
                }
            }
            return {...state, topics: newTopicState}
        case STORE_TOPIC:
            let byCategory = newTopicState.byCategoryId[action.topic.category_id];
            if(byCategory == undefined){
                byCategory = []
                byCategory.push(action.topic);
            } else {
                for(let i = 0; i < byCategory.length; i++){
                    let topic = byCategory[i];
                    if(topic?.id == action.topic.id){
                        byCategory[i] = action.topic
                        break;
                    }
                }
            }
            newTopicState.byCategoryId[action.topic.category_id] = byCategory;
            newTopicState.byId[action.topic.id] = action.topic;
            return {...state, topics: newTopicState}
        case UPDATE_TOPIC:
            newTopicState.byId[action.topic.id].body = action.topic.body;
            newTopicState.byId[action.topic.id].subject = action.topic.subject;
            let categoryArray = newTopicState.byCategoryId[action.topic.category_id];
            for(let i = 0; i < categoryArray.length; i++){
                let topic = categoryArray[i];
                if(topic.id == action.topic.id){
                    newTopicState.byCategoryId[action.topic.category_id] = action.topic
                }
            }
            return {...state, topics: newTopicState}
        default:
            return state;
    }
}

export default topicReducer;
