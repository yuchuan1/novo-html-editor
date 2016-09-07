import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Editor, EditorState, RichUtils} from 'draft-js';

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.logState = () => console.log(this.state.editorState.toJS());
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }
    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    render() {
        return (
            <div style={styles.root}>
              <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <div style={styles.editor} onClick={this.focus}>
                    <Editor editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand} placeholder="Enter some text..." ref="editor"/>
                </div>
                <input onClick={this.logState} style={styles.button} type="button" value="Log State"/>
            </div>
        );
    }
}

const styles = {
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

ReactDOM.render(
    <MyEditor/>, document.getElementById('main'));
