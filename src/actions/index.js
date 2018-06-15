import * as constants from "../constants";


export const headingNameChanged = (dispatch, widgetId, newName) =>(
    dispatch({type: constants.HEADING_NAME_CHANGED, id: widgetId, newName: newName})
)

export const headingTextChanged = (dispatch, widgetId, newText) =>(
    dispatch({type: constants.HEADING_TEXT_CHANGED, id: widgetId, text: newText})
)

export const headingSizeChanged = (dispatch, widgetId, newSize) =>(
    dispatch({type: constants.HEADING_SIZE_CHANGED, id: widgetId, size: newSize})
)


export const findAllWidgets = (dispatch,topicId) => {
    fetch('http://localhost:8080/api/widget' + topicId)
        .then(response =>(response.json()))
        .then(widgets => dispatch({
            type:constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
}

export const findAllWidgetsForTopic = (dispatch,topicId) =>{
    fetch('http://localhost:8080/api/topic/'+topicId+'/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type:constants.FIND_ALL_WIDGETS_FOR_TOPIC,
            widgets:widgets
        }))
}


export const addWidget = dispatch =>{
    dispatch({type: constants.ADD_WIDGET})
}

export const save = (dispatch,topicId) =>(
    dispatch({type: constants.SAVE,
        topicId:topicId
    })
)

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
)