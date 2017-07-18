import Todo from '../models/todo';
import User from '../models/user';
import Follow from '../models/follow';
import cuid from 'cuid';

/**
 * Get all todos
 * @param req
 * @param res
 * @returns void
 */


export function getFollowers(req, res) {
  console.log(req.params.user);
  Follow.find({ follower: req.params.user }).sort('-id').exec((err, followers) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ followers });
  });
}

export function getTodos(req, res) {
  console.log(req.params.user);
  Todo.find({ user: req.params.user }).sort('-id').exec((err, todos) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ todos });
  });
}

/**
 * Save a todo
 * @param req
 * @param res
 * @returns void
 */
export function addTodo(req, res) {
  console.log(req.body);
  if (!req.body.todo.text) {
    res.status(403).end();
  }
  const newTodo = new Todo(req.body.todo);
  newTodo.cuid = cuid();
  newTodo.completed = false;
  newTodo.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ todo: saved });
  });
}

/**
 * Delete completed todo
 * @param req
 * @param res
 * @returns void
 */
export function deleteCompletedTodo(req, res) {
  Todo.find({ completed: true }).remove().exec((err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).end();
  });
}

/**
 * Complete a todo
 * @param req
 * @param res
 * @returns void
 */
export function completeTodo(req, res) {
  Todo.findOne({ cuid: req.params.cuid }).exec((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    const newTodo = new Todo(todo);
    newTodo.completed = !newTodo.completed;
    newTodo.save((errSave, saved) => {
      if (errSave) {
        res.status(500).send(errSave);
      }
      res.json({ todo: saved });
    });
  });
}


export function addFollow(req, res) {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
  console.log(user);
    const newFollow=new Follow();
    newFollow.follower=req.body.follow.user
    newFollow.following=user._id;
 
console.log(newFollow);
      newFollow.save((errSave, saved) => {
      if (errSave) {
        res.status(500).send(errSave);
      }
      res.json({ newFollow: saved });
    });
  
    
  });
}