'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyEditor = function (_React$Component) {
    _inherits(MyEditor, _React$Component);

    function MyEditor(props) {
        _classCallCheck(this, MyEditor);

        var _this = _possibleConstructorReturn(this, (MyEditor.__proto__ || Object.getPrototypeOf(MyEditor)).call(this, props));

        _this.state = {
            editorState: _draftJs.EditorState.createEmpty()
        };

        _this.focus = function () {
            return _this.refs.editor.focus();
        };
        _this.onChange = function (editorState) {
            return _this.setState({ editorState: editorState });
        };
        _this.logState = function () {
            return console.log(_this.state.editorState.toJS());
        };
        _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
        return _this;
    }

    _createClass(MyEditor, [{
        key: 'handleKeyCommand',
        value: function handleKeyCommand(command) {
            var newState = _draftJs.RichUtils.handleKeyCommand(this.state.editorState, command);
            if (newState) {
                this.onChange(newState);
                return 'handled';
            }
            return 'not-handled';
        }
    }, {
        key: '_onBoldClick',
        value: function _onBoldClick() {
            this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: styles.root },
                _react2.default.createElement(
                    'button',
                    { onClick: this._onBoldClick.bind(this) },
                    'Bold'
                ),
                _react2.default.createElement(
                    'div',
                    { style: styles.editor, onClick: this.focus },
                    _react2.default.createElement(_draftJs.Editor, { editorState: this.state.editorState, onChange: this.onChange, handleKeyCommand: this.handleKeyCommand, placeholder: 'Enter some text...', ref: 'editor' })
                ),
                _react2.default.createElement('input', { onClick: this.logState, style: styles.button, type: 'button', value: 'Log State' })
            );
        }
    }]);

    return MyEditor;
}(_react2.default.Component);

var styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: 600
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10
    },
    button: {
        marginTop: 10,
        textAlign: 'center'
    }
};

_reactDom2.default.render(_react2.default.createElement(MyEditor, null), document.getElementById('main'));