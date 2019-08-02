import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

class DetailView extends Component {
    render(){
        return (<h1>Hello</h1> );
    }
}

export default withRouter(DetailView);