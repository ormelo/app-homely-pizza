import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { detailView } from '../../data-source/mockData';
import { questions, conditionalQuestions } from '../../data-source/mockDataQnA';
import ModalView from './modalView.jsx';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});


class Shortlists extends Component {

    constructor() {
        super();
        this.state = {showLoader: false};
        this.notifyMeClick = this.notifyMeClick.bind(this);
        this.cancelStint = this.cancelStint.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.state = {
            value: 0
        };
    }
    componentDidMount() {
        setTimeout(function(){document.getElementById('logoHeading').style.opacity = '1';},50);
        setTimeout(function(){document.getElementById('iconArrow').style.opacity = '1';},500);
    }
    handleTabChange(event, newValue) {
        console.log('neValue: ', newValue);
        this.setState({value: newValue});
    }
    cancelStint() {
        localStorage.removeItem('primary-task');
        localStorage.removeItem('secondary-task');
        localStorage.removeItem('subsrcibed');
        localStorage.removeItem('elapsed');
        setTimeout("location.href='/'", 800);
    }

    loadNotifyScript(cb) {
        var script = '//cdn.pushalert.co/integrate_330e438e9b44f62593c1ae84de8aa777.js';
        var el = document.createElement('script');
        el.onload = function(script){
            console.log('pushalert script loaded');
            setTimeout(function(){cb();},14000);
        };
        el.src = script;
        var initialScriptElement = document.getElementsByTagName('script')[0];
        initialScriptElement.parentNode.insertBefore(el, initialScriptElement);
    }
    notifyEvent() {
        window.primaryTaskName = localStorage.getItem('primary-task');
        if(primaryTaskName == 'Interior design') {
            (pushalertbyiw = window.pushalertbyiw || []).push(['trackEvent', 'task', 'interiorDesign', 'trigger', 1]); //alert('notifiying for interior design');
        } else if(primaryTaskName == 'Event planning') {
            (pushalertbyiw = window.pushalertbyiw || []).push(['trackEvent', 'task', 'eventPlanning', 'trigger', 1]); //alert('notifiying for event planning');
        }
        document.getElementById('myTasksLoader').style.display = 'none';
        document.getElementById('myTasksSuccess').style.display = 'block';
        document.getElementById('tasksTitle').innerHTML = 'You will get a push notification!';
        document.getElementById('tasksTitle').style.color = '#0bba7f';
        document.getElementById('tasksTitle').classList.add('shake');
    }
    notifyMeClick() {
        document.getElementById('myTasksLoader').style.display = 'block';
        document.getElementById('greenBtn').style.visibility = 'hidden';
        document.getElementById('iconArrow').style.display = 'none';
        localStorage.setItem('subsrcibed', 'true');
        localStorage.setItem('elapsed', new Date().getTime());
        if(!window.pushScriptLoadTriggered) {
            this.loadNotifyScript(this.notifyEvent);
            window.pushScriptLoadTriggered = true;
        } else {
            this.notifyEvent();
        }
    }


    render() {
        const {showLoader} = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px', marginLeft: '-10px'}}>
                        <img className="icon-back" src="../img/images/ic_back.png" onClick={()=>{history.back(-1);}} />
                        <Link to="/?navigatingBack=true" style={{marginLeft: '34px'}}><img id="logo" className="logo-img" style={{width: '40px'}} src="../img/images/logo_ic.png" /></Link>
                        <div id="logoHeading" className="logo-heading" style={{marginLeft: '108px', textAlign: 'left', fontSize: '18px'}}>{`Shortlists  >  ${localStorage.getItem('primary-task')}`}</div>
                    </div>
                    <div><i className="loading" id="myTasksLoader" style={{top: '28px'}}></i></div>
                    <div className="main fadeInBottom">
                        <hr className="line-tasks"/>
                        <div id="notifyMsg" className="alert-msg">
                            <div className="alert-icon"><img src="../img/images/ic_24h.png" className="shake" style={{width: '44px'}}/></div>
                            <div className="alert-message">
                                <div id="tasksTitle" className="a-title" style={{fontSize: '16px'}}>
                                    Stint has shortlisted your matches
                                </div>
                                <div className="a-desc">
                                    Give it upto <b style={{color: '#000'}}>24 hrs</b> to get the best quotes.
                                </div>
                            </div>
                        </div>
                        <img className="icon-tick" id="myTasksSuccess" src="../img/images/ic_tick.png"/>
                        <Paper style={{marginTop: '30px'}}>
                              <Tabs
                                value={this.state.value}
                                onChange={this.handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                              >
                                <Tab label="Shortlists" />
                                <Tab label="Rejects" />
                              </Tabs>
                            </Paper>
                        <div className="tasks-table">
                            <table id="tasksTable">
                              <tr>
                                <td><img id="iconStatus1" className="icon-status" src="../img/images/ic_started.png"/></td>
                                <td className="status-started">Shortlist interior designers near me<br/><div className="status-title">Estimated to complete in few mins</div></td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus2" className="icon-status" src="../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Check reviews & customer references</td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus3" className="icon-status" src="../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Filter out fake agencies & companies with complaints</td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus4" className="icon-status" src="../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Get quotes & review with me</td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus5" className="icon-status last" src="../img/images/ic_finish.png"/></td>
                                <td className="status-notstarted">Finalize & start project</td>
                              </tr>
                            </table>
                            <div className="green-btn cancel-stint-btn" onClick={this.cancelStint}>Cancel Stint</div>
                        </div>
                    </div>
                <div className="desc copyright" style={{textAlign: 'center',fontSize: '14px'}}>Copyright © 2019 Stint.do</div><br/>
                </div>)
    }
}

export default withRouter(Shortlists);