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
                <input
                    placeholder="Heading text"
                    className="form-control mb-3"
                    value={widget.text}
                    onChange={() => headingTextChanged(widget.id, inputElem.value)}
                    ref={node=> inputElem = node}/>


                <select
                    className="form-control mb-3"
                        value={widget.size}
                        onChange={()=>headingSizeChanged(widget.id, selectElem.value)}
                        ref={node=> selectElem = node}>
                    <option disabled="disabled">Choose size</option>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>

                <input
                    placeholder="Widget name"
                    className="form-control mb-3"
                    value={widget.name}
                    onChange={() => headingNameChanged(widget.id, widget.widgetType, nameElement.value)}
                    ref={node=> nameElement = node}/>


                <h3>Preview</h3>
            </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
}

const Paragraph = ({widget,paragraphNameChanged,paragraphTextChanged,preview}) => {
    let inputElem;
    let nameElement;

    return (
        <div>
            <div hidden={preview}>
                <textarea
                    className="form-control mb-3"
                    placeholder="Paragraph text"
                    value={widget.text}
                    onChange={()=>paragraphTextChanged(widget.id, inputElem.value)}
                    ref={node=> inputElem = node}/>
                <input
                    placeholder="Widget name"
                    className="form-control mb-3"
                    value={widget.name}
                    onChange={() => paragraphNameChanged(widget.id, widget.widgetType,nameElement.value)}
                    ref={node=> nameElement = node}/>
                <h3>Preview</h3>
            </div>
            <p>{widget.text}</p>
        </div>
    )
}

const List = ({widget,listNameChanged,listTypeChanged,listTextChanged,preview}) => {
    let inputElem;
    let nameElement;
    let selectElem;
    let n = 0;

    return (
        <div>
            <div hidden={preview}>
                <textarea
                    className="form-control mb-3"
                    placeholder="Enter one list item per line"
                    value={widget.text}
                    onChange={() => listTextChanged(widget.id, inputElem.value)}
                    ref={node => inputElem = node}/>

                <select
                    className="form-control mb-3"
                    value={widget.listType}
                    onChange={()=>listTypeChanged(widget.id, selectElem.value)}
                    ref={node=> selectElem = node}>
                    <option value="0">Unordered list</option>
                    <option value="1">Ordered list</option>
                </select>

                <input
                    placeholder="Widget name"
                    className="form-control mb-3"
                    value={widget.name}
                    onChange={() => listNameChanged(widget.id, widget.widgetType,nameElement.value)}
                    ref={node => nameElement = node}/>
                <h3>Preview</h3>
            </div>
            {
                widget.listType==0 &&<ul>
                    {
                        widget.text.split("\n").map(line=>{
                            return(<li key={widget.id+'_'+n++}>{line}</li>);
                        })
                    }
                </ul>
            }
            {
                widget.listType==1 &&<ol>
                    {
                        widget.text.split("\n").map(line=>{
                            return(<li key={widget.id+'_'+n++}>{line}</li>);
                        })
                    }
                </ol>
            }
        </div>
    )
}

const Image = ({widget,imageURLChanged,imageTextChanged,imageNameChanged,preview}) => {
    let inputElem;
    let nameElement;

    return (
        <div>
            <div hidden={preview}>

                <input
                    placeholder="image URL"
                    className="form-control mb-3"
                    value={widget.src}
                    onChange={() => imageURLChanged(widget.id, inputElem.value)}
                    ref={node=> inputElem = node}/>


                <input
                    placeholder="Widget name"
                    className="form-control mb-3"
                    value={widget.name}
                    onChange={() => imageNameChanged(widget.id, widget.widgetType,nameElement.value)}
                    ref={node=> nameElement = node}/>
                <h3>Preview</h3>
            </div>
            <img src={widget.src}/>
        </div>
    )
}

const Link = ({widget,linkURLChanged,linkTextChanged,linkNameChanged,preview}) => {
    let inputElem;
    let inputTextElem;
    let nameElement;

    return (
        <div>
            <div hidden={preview}>

                <input
                    placeholder="Link URL"
                    className="form-control mb-3"
                    value={widget.src}
                    onChange={() => linkURLChanged(widget.id, inputElem.value)}
                    ref={node=> inputElem = node}/>

                <input
                    placeholder="Link text"
                    className="form-control mb-3"
                    value={widget.text}
                    onChange={() => linkTextChanged(widget.id, inputTextElem.value)}
                    ref={node=> inputTextElem = node}/>


                <input
                    placeholder="Widget name"
                    className="form-control mb-3"
                    value={widget.name}
                    onChange={() => linkNameChanged(widget.id, widget.widgetType, nameElement.value)}
                    ref={node=> nameElement = node}/>
                <h3>Preview</h3>
            </div>
            <a href={widget.src}>{widget.text}</a>
        </div>
    )
}



const stateToPropsMapper = state =>({
    preview: state.preview
})

const dispatchToPropsMapper = dispatch => ({
    headingNameChanged:(widgetId,widgetType,newName) => actions.headingNameChanged(dispatch,widgetId,widgetType,newName),
    headingTextChanged:(widgetId, newText) => actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize),
    paragraphTextChanged: (widgetId, newText) => actions.paragraphTextChanged(dispatch, widgetId, newText),
    paragraphNameChanged:(widgetId,widgetType,newName) => actions.paragraphNameChanged(dispatch,widgetId,widgetType,newName),
    listTextChanged: (widgetId, newText) => actions.listTextChanged(dispatch, widgetId, newText),
    listNameChanged:(widgetId, widgetType,newName) => actions.listNameChanged(dispatch,widgetId, widgetType,newName),
    listTypeChanged: (widgetId, newType) => actions.listTypeChanged(dispatch, widgetId, newType),
    imageURLChanged: (widgetId, newText) => actions.imageURLChanged(dispatch, widgetId, newText),
    imageNameChanged:(widgetId, widgetType, newName) => actions.imageNameChanged(dispatch,widgetId, widgetType, newName),
    linkURLChanged: (widgetId, newText) => actions.linkURLChanged(dispatch, widgetId, newText),
    linkTextChanged: (widgetId, newText) => actions.linkTextChanged(dispatch, widgetId, newText),
    linkNameChanged: (widgetId, widgetType, newName) => actions.linkNameChanged(dispatch, widgetId, widgetType, newName)
})

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);
const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph);
const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List);
const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image);
const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link);






const Widget = ({widget, preview, dispatch, length}) => {
    let selectElement;

    return (
        <div className="card list-group-item">
            <div>
                <div>
                    <div hidden={preview}>
                        <div>
                            <div className="justify-content-between d-flex">
                                <div>
                                    {widget.widgetType === 'Heading' && <h3>Heading widget</h3>}
                                    {widget.widgetType === 'Paragraph' && <h3>Paragraph widget</h3>}
                                    {widget.widgetType === 'List' && <h3>List widget</h3>}
                                    {widget.widgetType === 'Image' && <h3>Image widget</h3>}
                                    {widget.widgetType === 'Link' && <h3>Link widget</h3>}

                                </div>

                                <div className="form-group align-items-center d-flex">
                                    <button hidden={widget.position === 1} className="btn-sm btn-warning"
                                        style={{marginRight: "5px"}}>
                                        <i className="fa fa-arrow-up"
                                           style={{fontSize: "15px",color:"black"}}
                                           onClick={()=>{
                                               dispatch({
                                                   type: constants.MOVE_UP,
                                                   id: widget.id,
                                                   position: widget.position
                                               })
                                           }}/>
                                    </button>

                                    <button  hidden={widget.position === length} className="btn-warning btn-sm "
                                             style={{marginRight: "5px"}}>
                                        <i className="fa fa-arrow-down"
                                           style={{fontSize: "15px",color:"black"}}
                                           onClick={()=>{
                                               dispatch({
                                                   type: constants.MOVE_DOWN,
                                                   id: widget.id,
                                                   position: widget.position
                                               })

                                           }}/>
                                    </button>

                                    <div className="dropdown"
                                         style={{marginRight: "5px"}}>
                                        <select
                                            className="btn-lg btn-outline-info"
                                            value={widget.widgetType}
                                            onChange={e=> dispatch({
                                            type: constants.SELECT_WIDGET_TYPE,
                                            id: widget.id,
                                            widgetType: selectElement.value
                                        })} ref={node=>selectElement = node}>
                                            <option>Heading</option>
                                            <option>Paragraph</option>
                                            <option>List</option>
                                            <option>Image</option>
                                            <option>Link</option>
                                        </select>
                                    </div>
                                    <button className="btn-sm btn-danger">
                                        <i className="fa fa-remove"
                                           style={{fontSize: "15px",color:"white"}}
                                           onClick={e=>(
                                            dispatch({type: constants.DELETE_WIDGET, id:widget.id})
                                        )}/>
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div>
                        {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                        {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                        {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
                        {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
                        {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}

                    </div>

                </div>
            </div>

        </div>
    )
}

const WidgetContainer = connect(
    state=>({
        preview:state.preview,
        length: state.widgets.length
    })
)(Widget)

export default WidgetContainer