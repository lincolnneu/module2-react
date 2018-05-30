import React from 'react'
import Hello from '../components/Hello'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

const Page1 = () => {
    return(<h2>Page 1</h2>)
};

const Page2 = () => {
    return(<h2>Page 2</h2>)
};
// but only App will be visible outside.

const App = () => {
    return (
        <Router>
            <div>
                <Link to="/hello">Hello</Link> |
                <Link to="/page1">Page 1</Link> |
                <Link to="/page2">Page 2</Link>
                <Route path='/hello' component={Hello} /> {/*<!-- If path is /hello, go to Hello component-> */}
                <Route path='/page1' component={Page1} />
                <Route path='/page2' component={Page2} />
            </div>
        </Router>
    );

};

export default App;