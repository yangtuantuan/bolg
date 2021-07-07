import React, { useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AddArticle from './AddArticle';
import AdminIndex from './AdminIndex';
import Login from './Login';

function Main () {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/login/" component={Login} />
      <Route path="/index/" component={AdminIndex} />
    </Router>
  )
}

export default Main;