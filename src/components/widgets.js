import React from 'react';
import * as constants from "../constants";
import {connect} from "react-redux";

const Widget = ({widget, dispatch}) => (
    <li>{widget.id} {widget.text}
        <button onClick={e=>(
            dispatch({type: constants.DELETE_WIDGET, id:widget.id})
        )}>Delete</button>
    </li>
)

const WidgetContainer = connect()(Widget)

export default WidgetContainer