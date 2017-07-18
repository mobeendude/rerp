import React, {PropTypes, Component } from 'react';
import LoginForm from '../components/LoginForm';
import Auth from './Auth';



class LoginPage extends Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
     let successMessage = '';
if(typeof(Storage) !== "undefined"){
   //use the local storage

    const storedMessage = localStorage.getItem('successMessage');
   

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
}
    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

   console.log(formData);
// create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        
        this.setState({
          errors: {}
        });

        Auth.authenticateUser(xhr.response.token);
        console.log(JSON.stringify(xhr.response.user));
        const fata = `email=${email}&id=${xhr.response.user.id}`;
         console.log(fata);
        console.log(xhr.response.user);
localStorage.setItem('user',JSON.stringify(xhr.response.user));

        // change the current URL to /
        this.context.router.replace('/todo');
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);


  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;