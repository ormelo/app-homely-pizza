import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { detailView } from '../../data-source/mockData';
import { questions, conditionalQuestions } from '../../data-source/mockDataQnA';
import ModalView from './modalView.jsx';
import { useHistory } from "react-router-dom";

class MyTasks extends Component {

    constructor() {
        super();
    }
    componentDidMount() {
        setTimeout(function(){document.getElementById('logoHeading').style.opacity = '1';},50);
    }

    render() {

        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px'}}>
                        <img id="logo" className="logo-img" style={{width: '40px'}} src="../img/images/logo_ic.png" />
                        <div id="logoHeading" className="logo-heading" style={{marginLeft: '76px', textAlign: 'left', fontSize: '18px'}}>{`My tasks  >  ${localStorage.getItem('primary-task')}`}</div>
                    </div>
                    <div className="main fadeInBottom">
                        <hr className="line-tasks"/>
                        <div className="alert-msg">
                            <div className="alert-icon"><img src="../img/images/ic_bell.png" className="shake"/></div>
                            <div className="alert-message">
                                <div className="a-title">
                                    Thank you for offloading your task to stint!
                                </div>
                                <div className="a-desc">
                                    {`Stint will now shortlist best ${localStorage.getItem('primary-task')}`} providers & notify you.
                                </div>
                            </div>
                        </div>
                        <div className="tasks-table">
                        </div>
                    </div>
                <div className="desc copyright" style={{textAlign: 'center',fontSize: '14px'}}>Copyright © 2019 Stint.do</div><br/>
                </div>)
    }
}

export default withRouter(MyTasks);