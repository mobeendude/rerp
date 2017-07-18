import React, { Component } from 'react';
import Home from '../components/Home';
import { browserHistory } from 'react-router'
import Auth from './Auth';
export default class HomePage extends Component {


 constructor(props, context) {
    super(props, context);
    Auth.deauthenticateUser();
browserHistory.push('/');
      
  }






  render() {


    return (
    	<div className="container">
    	
      <Home />
      </div>
    );
  
}
}
