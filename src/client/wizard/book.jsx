import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { detailView } from '../../data-source/mockData';
import ModalView from './modalView.jsx'
class Book extends Component {

    constructor() {
        super();
        this.state = {
        }
    }
    componentWillUnmount() {
        document.getElementById('logo').src = '../img/images/logo.png';
        document.getElementById('logo').style.width = '90px';
        document.getElementById('logoHeading').style.opacity = '0';
        document.getElementById('logoHeading').innerHTML = '';
    }
    componentDidMount() {
        document.getElementById('logo').src = '../img/images/logo_ic.png';
        document.getElementById('logo').style.width = '38px';
        document.getElementById('logoHeading').innerHTML = 'Plan your home';
        document.getElementById('logoHeading').style.opacity = '1';
        const { params } = this.props.match;
        this.setState({
            searchQuery: params.searchQuery,
            details: detailView,
            selectedSentiment: detailView.sentiments && Object.keys(detailView.sentiments)[0] || {}
        })
    }

    render() {
        return (<div>
                    <div className="main cssanimation fadeInBottom">
                        <div className="overview" style={{marginTop: '80px'}}>What service would you like?</div>




                    </div>
                <div className="desc copyright" style={{textAlign: 'center',fontSize: '14px'}}>Copyright © 2019 Stint.do</div><br/>
                </div>)
    }
}

export default withRouter(Book);