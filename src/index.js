// entry point of an app
import React, {Component} from 'react';
import ReactDOM from 'react-dom'; // only need this in high level index
import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'

const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response =>(response.json()))
        .then(widgets => dispatch({
            type:'FIND_ALL_WIDGETS',
            widgets: widgets
        }))
}

const addWidget = dispatch =>{
    dispatch({type: 'ADD_WIDGET'})
}


const Widget = ({widget, dispatch}) => (
    <li>{widget.id} {widget.text}
        <button onClick={e=>(
            dispatch({type: 'DELETE_WIDGET', id:widget.id})
        )}>Delete</button>
    </li>
)

const WidgetContainer = connect()(Widget)

class WidgetList extends Component{
    constructor(props){
        super(props);
        this.props.findAllWidgets()
    }
    render(){
        return(
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <ul>
                    {this.props.widgets.map(widget =>(
                        <WidgetContainer widget={widget}
                                         key={widget.id}/>
                    ))}
                </ul>
                <button onClick={this.props.addWidget}>Add widget</button>
            </div>

        )
    }
}

let initialState = {
    widgets: [
        {id:0, text: 'Widget 1'},
        {id:1, text: 'Widget 2'},
        {id:2, text: 'Widget 3'},
    ]
}

let idAutoIncrement = 3;

const widgetReducer =(state={widgets: []}, action) =>{
    switch (action.type){
        case 'FIND_ALL_WIDGETS':
            return {
                widgets: action.widgets
            }
        case 'DELETE_WIDGET':
            return{
                widgets: state.widgets.filter(widget =>(
                    widget.id !== action.id
                ))
            }
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

const dispatcherToPropsMapper = dispatch =>({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch)
})

let store = createStore(widgetReducer)

const App = connect(stateToPropertiesMapper,dispatcherToPropsMapper)(WidgetList)

// className={"container-fluid"} add some paddings to both side.
ReactDOM.render(
    <Provider store={store}>
        <App/>
        {/*<CourseManager/>*/}
        {/*<Stateless message={"this is a stateless component"}/>*/}
    </Provider>,
    document.getElementById('root') // default id is root
); // render function can only have single element. More elements can be rendered inside div.