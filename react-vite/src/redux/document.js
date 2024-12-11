const STORE_USER_DOCUMENTS = 'documents/storeUserDocuments'


// // Action Creators
const storeUserDocuments = ({documents}) =>({
    type: STORE_USER_DOCUMENTS,
    documents
})





// // Thunks
export const getUserDocuments = () => async (dispatch) => {
    const res = await fetch('/api/document/current', {
        method: 'GET'
    })

    let documents = await res.json();
    if(res.ok){
        dispatch(storeUserDocuments(documents))
        return documents
    }
    return false
}

const initialState = {byId: {}}

const documentReducer = (state = initialState, action) =>{
    let newDocumentState = {...state.byId}
    switch(action.type){
        case STORE_USER_DOCUMENTS:
            for(let document of action.documents){
                newDocumentState[document.id] = document
            }
            //newDocumentState.all = [...(new Set(newDocumentState.all.concat(action.documents)))]
            return {...state, byId: newDocumentState}
        default:
            return state;
    }
}

export default documentReducer;
