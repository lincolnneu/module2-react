import React from 'react';
import * as constants from "../constants";
import {connect} from "react-redux";

const Widget = ({widget, dispatch}) => {
    let selectElement;
    return (
        <li>
            {widget.id} {widget.text}
            <select onChange={e=> dispatch({
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
        </li>
    )
}

const WidgetContainer = connect()(Widget)

export default WidgetContainer