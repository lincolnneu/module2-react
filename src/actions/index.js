import * as constants from "../constants";

export const headingSizeChanged = (dispatch, widgetId, newSize) =>(
    dispatch({type: constants.HEADING_SIZE_CHANGED, id: widgetId, size: newSize})
)


export const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response =>(response.json()))
        .then(widgets => dispatch({
            type:constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
}

export const addWidget = dispatch =>{
    dispatch({type: constants.ADD_WIDGET})
}

export const save = dispatch =>(
    dispatch({type: constants.SAVE})
)