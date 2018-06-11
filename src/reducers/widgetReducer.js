import * as constants from "../constants";

export const widgetReducer =(state={widgets: []}, action) =>{
    switch (action.type){
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
            fetch('http://localhost:8080/api/widget/save',{
                method:'post',
                body: JSON.stringify(state.widgets),
                headers:{
                    'content-type': 'application/json'
                }
            });
            return state;
        case constants.FIND_ALL_WIDGETS:
            return {
                widgets: action.widgets
            }
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
                    {id: state.widgets.length++, text:'New Widget', widgetType: 'Paragraph'}
                ]
            }
        default:
            return state;
    }
}