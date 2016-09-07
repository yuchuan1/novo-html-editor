import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

let initialState = {};
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SOME_ACTION':
            state.value = action.value
            return state
        default:
            return state
    }
}

let store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch({type: 'SOME_ACTION', value: 'Hey, What\'s up?'});


var HelloMessage = React.createClass({
  getInitialState: function() {
      let state = store.getState();
      return state;
  },
  render: function() {
    return <div>{this.state.value} {this.props.name} <p/> Having fun with React and Redux? </div>;
  }
});

ReactDOM.render(<HelloMessage name="Eddie" />, document.getElementById('main'));
