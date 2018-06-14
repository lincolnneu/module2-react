import React from 'react';
import * as constants from "../constants";
import {connect} from "react-redux";
import * as actions from "../actions"

const Heading = ({widget, headingSizeChanged}) => {
    let selectElem;
    return (
        <div>
            <h2>Heading {widget.size}</h2>
            <select onChange={()=>headingSizeChanged(widget.id, selectElem.value)}
                    ref={node=> selectElem = node}>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>
            <h3>Preview</h3>
            {widget.size == 1 && <h1>Heading Text</h1>}
            {widget.size == 2 && <h2>Heading Text</h2>}
            {widget.size == 3 && <h3>Heading Text</h3>}
        </div>
    )
}


const dispatchToPropsMapper = dispatch => ({
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize)
})

const HeadingContainer = connect(null, dispatchToPropsMapper)(Heading);



const Paragraph = () =>(
    <div>
        <h2>Paragraph</h2>
        <textarea></textarea>
    </div>
)

const Image = () =>(
    <h2>Image</h2>
)

const List = () => (
    <h2>List</h2>
)



const Widget = ({widget, dispatch}) => {
    let selectElement;
    return (
        <li>
            {widget.id} {widget.text}
            <select value={widget.widgetType}
                onChange={e=> dispatch({
                type: constants.SELECT_WIDGET_TYPE,
                id: widget.id,
                widgetType: selectElement.value
            })} ref={node=>selectElement = node}>
                <option>Heading</option>
                <option>Paragraph</option>
                <option>List</option>
                <option>Image</option>
            </select>
            <button onClick={e=>(
                dispatch({type: constants.DELETE_WIDGET, id:widget.id})
            )}>Delete</button>

            <div>
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <Paragraph/>}
                {widget.widgetType === 'List' && <List/>}
                {widget.widgetType === 'Image' && <Image/>}
            </div>

        </li>
    )
}

const WidgetContainer = connect()(Widget)

export default WidgetContainer