import * as constants from "../constants";


export const linkNameChanged = (dispatch, widgetId, widgetType,newName) =>(
    dispatch({type:constants.LINK_NAME_CHANGED, id: widgetId, widgetType: widgetType, text: newName})
)

export const linkTextChanged = (dispatch, widgetId, newText) =>(
    dispatch({type: constants.LINK_TEXT_CHANGED, id: widgetId, text: newText})
)


export const linkURLChanged = (dispatch, widgetId, newText) =>(
    dispatch({type: constants.LINK_URL_CHANGED, id: widgetId, text: newText})
)

export const imageNameChanged = (dispatch, widgetId, widgetType,newName) =>(
    dispatch({type:constants.IMAGE_NAME_CHANGED, id: widgetId, widgetType: widgetType,text: newName})
)

export const imageURLChanged = (dispatch, widgetId, newText) =>(
    dispatch({type: constants.IMAGE_URL_CHANGED, id: widgetId, text: newText})
)

export const listTypeChanged = (dispatch, widgetId, newType) =>(
    dispatch({type:constants.LIST_TYPE_CHANGED, id: widgetId, text: newType})
)

export const listNameChanged = (dispatch, widgetId, widgetType, newName) =>(
    dispatch({type:constants.LIST_NAME_CHANGED, id: widgetId, widgetType: widgetType, text: newName})
)

export const listTextChanged = (dispatch, widgetId, newText) =>(
    dispatch({type: constants.LIST_TEXT_CHANGED, id: widgetId, text: newText})
)


export const paragraphNameChanged = (dispatch, widgetId, widgetType, newName) =>(
    dispatch({type:constants.PARAGRAPH_NAME_CHANGED, id: widgetId, widgetType: widgetType, text: newName})
)

export const paragraphTextChanged = (dispatch, widgetId, newText) =>(
    dispatch({type: constants.PARAGRAPH_TEXT_CHANGED, id: widgetId, text: newText})
)

export const headingNameChanged = (dispatch, widgetId, widgetType, newName) =>(
    dispatch({type: constants.HEADING_NAME_CHANGED, id: widgetId, widgetType: widgetType, text: newName})
)

export const headingTextChanged = (dispatch, widgetId, newText) =>(
    dispatch({type: constants.HEADING_TEXT_CHANGED, id: widgetId, text: newText})
)

export const headingSizeChanged = (dispatch, widgetId, newSize) =>(
    dispatch({type: constants.HEADING_SIZE_CHANGED, id: widgetId, size: newSize})
)


export const findAllWidgets = (dispatch,topicId) => {
    fetch(constants.HOST + '/api/widget' + topicId)
        .then(response =>(response.json()))
        .then(widgets => dispatch({
            type:constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
}

export const findAllWidgetsForTopic = (dispatch,topicId) =>{
    fetch(constants.HOST + '/api/topic/'+topicId+'/widget')
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