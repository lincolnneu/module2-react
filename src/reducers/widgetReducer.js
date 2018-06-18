import * as constants from "../constants";

export const widgetReducer =(state={widgets: [], preview: false}, action) =>{
    let newState
    let flag
    switch (action.type){

        case constants.MOVE_UP:
            let upperItem = 0;
            state.widgets.forEach(widget=>{
                if(widget.position === action.position - 1){
                    upperItem = widget.id;
                }
            })

            newState = Object.assign({}, state);
            newState = {
                widgets: state.widgets.map(widget =>{
                    if(widget.id === action.id){
                        widget.position-- ;

                    }
                    if(widget.id === upperItem){
                        widget.position++;
                    }
                    return Object.assign({}, widget);
                })
            }

            newState.widgets.sort((a,b)=>a.position - b.position);

            return newState;




        case constants.MOVE_DOWN:
            let downItem = 0;
            state.widgets.forEach(widget=>{
                if(widget.position === action.position + 1){
                    downItem = widget.id;
                }
            })
            newState = Object.assign({}, state);
            newState = {
                widgets: state.widgets.map(widget =>{
                    if(widget.id === action.id){
                        widget.position++ ;

                    }
                    if(widget.id === downItem){
                        widget.position--;

                    }
                    return Object.assign({}, widget);
                })
            }

            newState.widgets.sort((a,b)=>a.position - b.position);

            return newState;

        case constants.LINK_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget =>{
                    if(widget.id === action.id){
                        widget.src = action.text;
                    }
                    return Object.assign({},widget);
                })
            }


        case constants.LINK_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget =>{
                    if(widget.id === action.id){
                        widget.text = action.text;
                    }
                    return Object.assign({},widget);
                })
            }


        case constants.LINK_NAME_CHANGED:
            flag = false;

            state.widgets.forEach(widget=>{
                if(widget.name === action.text&&widget.widgetType === action.widgetType&&widget.id !== action.id){
                    alert("name should not duplicate!");
                    console.log("name Duplicate!")
                    flag = true;
                }
            })
            if(!flag){
                return{
                    widgets:state.widgets.map(widget =>{
                        if(widget.id === action.id){
                            widget.name = action.text;

                        }
                        return Object.assign({},widget);
                    })
                }
            }
            else{
                return state;
            }


        case constants.IMAGE_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget =>{
                    if(widget.id === action.id){
                        widget.src = action.text;
                    }
                    return Object.assign({},widget);
                })
            }


        case constants.IMAGE_NAME_CHANGED:
            flag = false;

            state.widgets.forEach(widget=>{
                if(widget.name === action.text&&widget.widgetType === action.widgetType&&widget.id !== action.id){
                    alert("name should not duplicate!");
                    console.log("name Duplicate!")
                    flag = true;
                }
            })
            if(!flag){
                return{
                    widgets:state.widgets.map(widget =>{
                        if(widget.id === action.id){
                            widget.name = action.text;

                        }
                        return Object.assign({},widget);
                    })
                }
            }
            else{
                return state;
            }
        case constants.LIST_TYPE_CHANGED:
            return{
                widgets: state.widgets.map(widget =>{
                    if(widget.id == action.id){
                        widget.listType = action.text;
                    }
                    return Object.assign({}, widget);
                })
            }

        case constants.LIST_NAME_CHANGED:
            flag = false;

            state.widgets.forEach(widget=>{
                if(widget.name === action.text&&widget.widgetType === action.widgetType&&widget.id !== action.id){
                    alert("name should not duplicate!");
                    console.log("name Duplicate!")
                    flag = true;
                }
            })
            if(!flag){
                return{
                    widgets:state.widgets.map(widget =>{
                        if(widget.id === action.id){
                            widget.name = action.text;

                        }
                        return Object.assign({},widget);
                    })
                }
            }
            else{
                return state;
            }

        case constants.LIST_TEXT_CHANGED:
            return{
                widgets: state.widgets.map(widget =>{
                    if(widget.id === action.id){
                        widget.text = action.text;
                    }
                    return Object.assign({},widget);
                })
            }

        case constants.PARAGRAPH_NAME_CHANGED:
            flag = false;

            state.widgets.forEach(widget=>{
                if(widget.name === action.text&&widget.widgetType === action.widgetType&&widget.id !== action.id){
                    alert("name should not duplicate!");
                    console.log("name Duplicate!")
                    flag = true;
                }
            })
            if(!flag){
                return{
                    widgets:state.widgets.map(widget =>{
                        if(widget.id === action.id){
                            widget.name = action.text;

                        }
                        return Object.assign({},widget);
                    })
                }
            }
            else{
                return state;
            }

        case constants.PARAGRAPH_TEXT_CHANGED:
            return{
                widgets: state.widgets.map(widget =>{
                    if(widget.id === action.id){
                        widget.text = action.text;
                    }
                    return Object.assign({},widget);
                })
            }

        case constants.HEADING_NAME_CHANGED:
            flag = false;

            state.widgets.forEach(widget=>{
                if(widget.name === action.text&&widget.widgetType === action.widgetType&&widget.id !== action.id){
                    alert("name should not duplicate!");
                    console.log("name Duplicate!")
                    flag = true;
                }
            })
            if(!flag){
                return{
                    widgets:state.widgets.map(widget =>{
                        if(widget.id === action.id){
                            widget.name = action.text;

                        }
                        return Object.assign({},widget);
                    })
                }
            }
            else{
                return state;
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
            newState.widgets.sort((a,b)=>a.position - b.position);
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
            fetch('https://webdev-summer-2018-lincoln.herokuapp.com/api/topic/'+action.topicId+'/widget/save',{
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
            let deletedPos
            state.widgets.forEach(widget=>{
                if(widget.id === action.id){
                    deletedPos = state.widgets.indexOf(widget)
                }
            })

            state.widgets.forEach(widget=>{
                if(widget.position > deletedPos){
                    widget.position--;
                }
            })

            newState = Object.assign({}, state);
            newState = {
                widgets: state.widgets.filter(widget =>(
                    widget.id !== action.id
                ))
            }


            return newState;

        case constants.ADD_WIDGET:
            return{
                widgets: [
                    ...state.widgets,
                    {id: state.widgets.length++,
                        text:'',
                        widgetType: 'Heading',
                        size: '1',
                        name: '',
                        listType: '0',
                        src: '',
                        position: state.widgets.length++
                    }
                ]
            }
        default:
            return state;
    }
}