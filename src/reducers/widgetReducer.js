import * as constants from "../constants";

export const widgetReducer =(state={widgets: [], preview: false}, action) =>{
    let newState
    switch (action.type){
        case constants.HEADING_NAME_CHANGED:
            return{
                widgets:state.widgets.map(widget =>{
                    if(widget.id === action.id){
                        widget.name = action.newName;

                    }
                    return Object.assign({},widget);
                })
            }
        case constants.PREVIEW:
            newState = Object.assign({}, state);
            newState.preview = !state.preview;
            return newState;
        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget =>{
                    if(widget.id === action.id){
                        widget.text = action.text;
                    }
                    return Object.assign({},widget);
                })
            }
        case constants.FIND_ALL_WIDGETS_FOR_TOPIC:
            // return {widgets:action.widgets};
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            return newState;


        case constants.HEADING_SIZE_CHANGED:
            return{
                widgets: state.widgets.map(widget =>{
                    if(widget.id == action.id){
                        widget.size = action.size;
                    }
                    return Object.assign({}, widget);
                })
            }

        case constants.SELECT_WIDGET_TYPE:
            console.log(action);
            let newState={
                widgets:state.widgets.filter((widget)=>{
                    if(widget.id === action.id){
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState));
        case constants.SAVE:
            fetch('http://localhost:8080/api/topic/'+action.topicId+'/widget/save',{
                method:'post',
                body: JSON.stringify(state.widgets),
                headers:{
                    'content-type': 'application/json'
                }
            });
            return state;
        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            return newState;
        case constants.DELETE_WIDGET:
            return{
                widgets: state.widgets.filter(widget =>(
                    widget.id !== action.id
                ))
            }
        case constants.ADD_WIDGET:
            return{
                widgets: [
                    ...state.widgets,
                    {id: state.widgets.length++,
                        text:'New Widget',
                        widgetType: 'Heading',
                        size: '1'
                    }
                ]
            }
        default:
            return state;
    }
}