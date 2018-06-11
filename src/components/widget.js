import React from 'react';
import * as constants from "../constants";
import {connect} from "react-redux";

const Heading = () => (
    <div>
        <h2>Heading</h2>
        <select>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
        </select>
    </div>
)


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
                {widget.widgetType === 'Heading' && <Heading/>}
                {widget.widgetType === 'Paragraph' && <Paragraph/>}
                {widget.widgetType === 'List' && <List/>}
                {widget.widgetType === 'Image' && <Image/>}
            </div>

        </li>
    )
}

const WidgetContainer = connect()(Widget)

export default WidgetContainer