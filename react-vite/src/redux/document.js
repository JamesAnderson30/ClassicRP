import { createDispatchHook } from "react-redux"

const STORE_USER_DOCUMENTS = 'documents/storeUserDocuments'
const STORE_DOCUMENT = 'documents/storeDocument'
const DELETE_DOCUMENT = 'documents/deleteDocument'


// // Action Creators
const storeUserDocuments = ({documents}) =>({
    type: STORE_USER_DOCUMENTS,
    documents
})

const storeDocument = (document) => ({
    type: STORE_DOCUMENT,
    document
})

const removeDocument = (id) => ({
    type: DELETE_DOCUMENT,
    id
})


// // Thunks
export const getUserDocuments = () => async (dispatch) => {
    const res = await fetch('/api/document/current', {
        method: 'GET'
    })

    let documents = await res.json();
    console.log("res: ", res)
    if(res.ok){
        dispatch(storeUserDocuments(documents))
        return documents
    }
    return false
}

export const updateDocument = ({subject, body, id}) => async (dispatch) =>{

    const res = await fetch(`/api/document/${id}`, {
        method: 'PUT',
        body: JSON.stringify({subject, body}),
        headers: { "Content-Type": "application/json"}
    })

    if(res.ok){
        dispatch(storeDocument(await res.json()))
        return true
    } else {
        return false
    }
}

export const getDocument = (id) => async (dispatch) => {
    const res = await fetch(`/api/document/${id}`, {
        method: 'GET'
    })
    let message = await res.json();
    if(res.ok){
        dispatch(storeDocument(message))
        return message
    }  else {
        return false
    }
}

export const sendDocument = (subject, body) => async (dispatch) =>{
    const res = await fetch('/api/document/new',{
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({subject, body})
    })

    let message = await res.json();
    console.log("message: ", message)
    if(res.ok){
        dispatch(storeDocument(message))
    }
    return message
}

export const deleteDocument = (id) => async (dispatch) =>{
    const res = await fetch(`/api/document/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json"}
    })
    if(res.ok){
        // dispatch(removeDocument(id))
        return true
    } else {
        return false
    }
    
}

const initialState = {byId: {}, all: []}

const documentReducer = (state = initialState, action) =>{

    let newDocumentState = {...state}
    let newById = {}
    switch(action.type){
        
        case STORE_USER_DOCUMENTS:
            
            for(let doc of action.documents){newById[doc.id]=doc}
            return{
                ...state,
                all: action.documents,
                byId: newById
            }

        case STORE_DOCUMENT:
            let doc = action.document
            console.log("STATE: ", state)
            return {
                ...state,
                all: [
                    // with all of the old todos
                    ...state.all,
                    // and the new todo object
                    {
                        // Use an auto-incrementing numeric ID for this example
                        id: doc.id,
                        body: doc.body,
                        subject: doc.subject,
                        group: doc.subject,
                        user_id: doc.user_id
                    }
                ],
                byId:{
                    ...state.byId,
                    [doc.id]: doc
                }
            }

        case DELETE_DOCUMENT:
            // for(let doc of state.byId){
            //     if(doc.id !== action.id) newById[doc.id] = doc
            // }
            // return {
            //     ...state,
            //     byId: newById,
            //     all: [
            //         state.all.filter((doc)=>{doc.id !== action.id})
            //     ]
            // }
        default:
            return state;
    }
}

export default documentReducer;
