import React, { PropTypes } from 'react';


// Import Style
import styles from './TodoListItem.css';

function TodoListItem(props) {
  return (
    <li className={styles.li_style}>
      <div className={props.todo.completed ? styles.done_true : ''}>
        <button className="btn btn-link btn-xs" onClick={props.onComplete}>
         !
        </button>
        {props.todo.text}
      </div>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default TodoListItem;
