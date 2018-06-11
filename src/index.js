// entry point of an app
import React from 'react';
import ReactDOM from 'react-dom'; // only need this in high level index
import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'

const Widget = ({widget}) => (
    <li>{widget.id} {widget.text}</li>
)


const WidgetList = ({widgets,dispatch}) =>(
    <div>
        <h1>Widget List {widgets.length}</h1>
        <ul>
            {widgets.map(widget =>(
                <Widget widget={widget}
                        key={widget.id}/>
            ))}
        </ul>
        <button onClick={e=>(
            dispatch({type: 'ADD_WIDGET'})
        )}>Add widget</button>
    </div>
)

let initialState = {
    widgets: [
        {id:0, text: 'Widget 1'},
        {id:1, text: 'Widget 2'},
        {id:2, text: 'Widget 3'},
    ]
}

let idAutoIncrement = 3;

const widgetReducer =(state=initialState, action) =>{
    switch (action.type){
        case 'ADD_WIDGET':
            return{
                widgets: [
                    ...state.widgets,
                    {id: idAutoIncrement++, text:'New Widget'}
                ]
            }
    }

    return initialState
}
const stateToPropertiesMapper = (state) =>(
    {
        widgets: state.widgets
    }
)


let store = createStore(widgetReducer)

const App = connect(stateToPropertiesMapper)(WidgetList)

// className={"container-fluid"} add some paddings to both side.
ReactDOM.render(
    <Provider store={store}>
        <App/>
        {/*<CourseManager/>*/}
        {/*<Stateless message={"this is a stateless component"}/>*/}
    </Provider>,
    document.getElementById('root') // default id is root
); // render function can only have single element. More elements can be rendered inside div.