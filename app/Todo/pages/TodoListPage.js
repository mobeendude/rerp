import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Auth from '../../containers/Auth';
import { Link } from 'react-router';
// Import Components
import TodoList from '../components/TodoList';
import TodoCreateWidget from '../components/TodoCreateWidget/TodoCreateWidget';

// Import Actions
import { addTodoRequest, fetchTodos, completeTodoRequest, clearCompletedTodoRequest } from '../TodoActions';

// Import Selectors
import { getTodos } from '../TodoReducer';

class TodoListPage extends Component {

constructor(props, context) {
    super(props, context);
     if (!Auth.isUserAuthenticated()) {
          this.context.router.replace('/');
         }
  }




  componentDidMount() {
    this.props.dispatch(fetchTodos());
  }

  handleClearCompletedTodo = () => {
    this.props.dispatch(clearCompletedTodoRequest());
  };

  handleCompleteTodo = todo => {
    this.props.dispatch(completeTodoRequest(todo));
  };

  handleAddTodo = (text) => {
    this.props.dispatch(addTodoRequest({ text }));
  };

  render() {
   
   
    return (
      <div className="container">
      <div className="row">
  <Link to={'/follow'}>Follow</Link>
 <Link to={'/logout'}>Logout</Link>
 

 </div>



 <span >
      <div className="well">
        <TodoCreateWidget
          addTodo={this.handleAddTodo}
          clearCompletedTodo={this.handleClearCompletedTodo}
        />
        <TodoList
          handleCompleteTodo={this.handleCompleteTodo}
          todos={this.props.todos}
        />
        </div>

        </span>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
TodoListPage.need = [() => { return fetchTodos(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    todos: getTodos(state),
  };
}

TodoListPage.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

TodoListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(TodoListPage);
