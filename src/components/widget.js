import React from 'react';
import * as constants from "../constants";
import {connect} from "react-redux";
import * as actions from "../actions"

const Heading = ({widget, headingNameChanged, headingSizeChanged,headingTextChanged, preview}) => {
    let selectElem;
    let inputElem;
    let nameElement;
    return (
        <div>
            <div hidden={preview}>
                <h2>Heading {widget.size}</h2>
                <input
                    value={widget.text}
                    onChange={() => headingTextChanged(widget.id, inputElem.value)}
                    ref={node=> inputElem = node}/>
                <br/>

                <select
                        value={widget.size}
                        onChange={()=>headingSizeChanged(widget.id, selectElem.value)}
                        ref={node=> selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <br/>
                <input
                    value={widget.name}
                    onChange={() => headingNameChanged(widget.id, nameElement.value)}
                    ref={node=> nameElement = node}/>
                <br/>
                <h3>Preview</h3>
            </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
}


const stateToPropsMapper = state =>({
    preview: state.preview
})

const dispatchToPropsMapper = dispatch => ({
    headingNameChanged:(widgetId, newName) => actions.headingNameChanged(dispatch,widgetId, newName),
    headingTextChanged:(widgetId, newText) => actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize)
})

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);



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



const Widget = ({widget, preview, dispatch}) => {
    let selectElement;

    return (
        <div className="card">
        <div className="card-body">
            <li>
                <div hidden={preview}>
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
                </div>

                <div>
                    {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                    {widget.widgetType === 'Paragraph' && <Paragraph/>}
                    {widget.widgetType === 'List' && <List/>}
                    {widget.widgetType === 'Image' && <Image/>}

                </div>

            </li>
        </div>
        </div>
    )
}

const WidgetContainer = connect(
    state=>({
        preview:state.preview
    })
)(Widget)

export default WidgetContainer