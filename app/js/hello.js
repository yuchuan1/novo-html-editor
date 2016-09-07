'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};
function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case 'SOME_ACTION':
            state.value = action.value;
            return state;
        default:
            return state;
    }
}

var store = (0, _redux.createStore)(reducer);
store.subscribe(function () {
    return console.log(store.getState());
});
store.dispatch({ type: 'SOME_ACTION', value: 'Hey, What\'s up?' });

var HelloMessage = _react2.default.createClass({
    displayName: 'HelloMessage',

    getInitialState: function getInitialState() {
        var state = store.getState();
        return state;
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            null,
            this.state.value,
            ' ',
            this.props.name,
            ' ',
            _react2.default.createElement('p', null),
            ' Having fun with React and Redux? '
        );
    }
});

_reactDom2.default.render(_react2.default.createElement(HelloMessage, { name: 'Eddie' }), document.getElementById('main'));