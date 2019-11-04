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
        this.notifyMeClick = this.notifyMeClick.bind(this);
    }
    componentDidMount() {
        setTimeout(function(){document.getElementById('logoHeading').style.opacity = '1';},50);
    }
    loadNotifyScript(cb) {
        var script = '//cdn.pushalert.co/integrate_330e438e9b44f62593c1ae84de8aa777.js';
        var el = document.createElement('script');
        el.src = script;
        el.onload = function(script){
            console.log('pushalert script loaded');
            cb();
        };
        var initialScriptElement = document.getElementsByTagName('script')[0];
        initialScriptElement.parentNode.insertBefore(el, initialScriptElement);
    }
    notifyEvent() {
        window.primaryTaskName = localStorage.getItem('primary-task');
        if(primaryTaskName == 'Interior design') {
            (pushalertbyiw = window.pushalertbyiw || []).push('trackEvent', 'task', 'interiorDesign', 'trigger', 1); alert('notifiying for interior design');
        } else if(primaryTaskName == 'Event planning') {
            (pushalertbyiw = window.pushalertbyiw || []).push('trackEvent', 'task', 'eventPlanning', 'trigger', 1); alert('notifiying for event planning');
        }
    }
    notifyMeClick() {
        if(!window.pushScriptLoadTriggered) {
            this.loadNotifyScript(this.notifyEvent);
            window.pushScriptLoadTriggered = true;
        } else {
            this.notifyEvent();
        }
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
                                    Thank you for offloading your task!
                                </div>
                                <div className="a-desc">
                                    {`Stint will now get quotes from best ${localStorage.getItem('primary-task')}`} providers & notify you.
                                </div>
                            </div>
                        </div>
                        <div className="green-btn" onClick={this.notifyMeClick}>Notify Me</div>
                        <div className="tasks-table">
                            <table>
                              <tr>
                                <td><img className="icon-status" src="../img/images/ic_started.png"/></td>
                                <td className="status-started">Shortlist interior designers near me<br/><div className="status-title">Estimated to complete in few mins</div></td>
                              </tr>
                              <tr>
                                <td><img className="icon-status" src="../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Check reviews & customer references</td>
                              </tr>
                              <tr>
                                <td><img className="icon-status" src="../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Filter out fake agencies & companies with complaints</td>
                              </tr>
                              <tr>
                                <td><img className="icon-status" src="../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Get quotes & review with me</td>
                              </tr>
                              <tr>
                                <td><img className="icon-status last" src="../img/images/ic_finish.png"/></td>
                                <td className="status-notstarted">Finalize & start project</td>
                              </tr>
                            </table>
                        </div>
                    </div>
                <div className="desc copyright" style={{textAlign: 'center',fontSize: '14px'}}>Copyright © 2019 Stint.do</div><br/>
                </div>)
    }
}

export default withRouter(MyTasks);