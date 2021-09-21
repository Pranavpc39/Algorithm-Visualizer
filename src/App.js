import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {createStore} from 'redux';
import reducers from './Redux Store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import Home from './Components/Home';
import BubbleSort from './Components/BubbleSort';
import SelectionSort from './Components/SelectionSort';
import LinearSearch from './Components/LinearSearch';
import BinarySearch from './Components/BinarySearch';




const store = createStore(reducers,composeWithDevTools());

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/bubble-sort" component={BubbleSort}></Route>
            <Route exact path="/selection-sort" component={SelectionSort}></Route>
            <Route exact path="/linear-search" component={LinearSearch}></Route>
            <Route exact path="/binary-search" component={BinarySearch}></Route>


          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
