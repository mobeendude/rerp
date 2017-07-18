import React, { Component, PropTypes } from 'react';


export class TodoCreateWidget extends Component {
  addTodo = () => {
    const todoTextRef = this.refs.todoText;

    if (todoTextRef.value) {
      this.props.addTodo(todoTextRef.value);
      todoTextRef.value = '';
    }
  };

  clearCompletedTodo = () => {
    this.props.clearCompletedTodo();
  };

  render() {
    return (
      <div className="form-inline">
        <div className="input-group">
          <input type="text" className="form-control" size="50" maxLength="100"  ref="todoText" />
          <span className="input-group-btn" style={{display: 'initial'}}  >
            <button className="btn btn-primary" type="button" onClick={this.addTodo}>
              Add
            </button>
            <button className="btn btn-danger" type="button" onClick={this.clearCompletedTodo}>
             Delete Completed
            </button>
          </span>
        </div>
      </div>
    );
  }
}

TodoCreateWidget.propTypes = {
  addTodo: PropTypes.func.isRequired,
  clearCompletedTodo: PropTypes.func.isRequired,
 
};

export default (TodoCreateWidget);
