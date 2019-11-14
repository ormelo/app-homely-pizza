import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { detailView } from '../../data-source/mockData';
import { questions, conditionalQuestions } from '../../data-source/mockDataQnA';
import ModalView from './modalView.jsx';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

class Card extends Component {

    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
    }

    render() {
        let {index} = this.props;
        return (
        <div className="card-container">
            {index}
        </div>)
    }
}


class Shortlists extends Component {

    constructor() {
        super();
        this.notifyMeClick = this.notifyMeClick.bind(this);
        this.cancelStint = this.cancelStint.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.state = {
            value: 0,
            results: []
        };
    }
    componentDidMount() {
        setTimeout(function(){document.getElementById('logoHeading').style.opacity = '1';},50);
        setTimeout(function(){document.getElementById('iconArrow').style.opacity = '1';},500);
        debugger;
        this.fetchJson();
    }
    fetchJson() {
        console.log('this.props.match: ', this.props.match);
        let task = this.props.match.params.task;
        let loc = this.props.match.params.loc;
        let zone = this.props.match.params.zone;

        axios.get(`/data/${task}/${loc}/${zone}`)
          .then(function (response) {
            console.log(response.data);
            this.setState({results: response.data.results});
          }.bind(this));
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
        const {showLoader, results} = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px', marginLeft: '-10px'}}>
                        <img className="icon-back" src="../../../img/images/ic_back.png" onClick={()=>{history.back(-1);}} />
                        <Link to="/?navigatingBack=true" style={{marginLeft: '34px'}}><img id="logo" className="logo-img" style={{width: '40px'}} src="../../../img/images/logo_ic.png" /></Link>
                        <div id="logoHeading" className="logo-heading" style={{marginLeft: '108px', textAlign: 'left', fontSize: '18px'}}>{`Shortlists  >  ${localStorage.getItem('primary-task')}`}</div>
                    </div>
                    <div><i className="loading" id="myTasksLoader" style={{top: '28px'}}></i></div>
                    <div className="main fadeInBottom">
                        <hr className="line-tasks"/>
                        <div id="notifyMsg" className="alert-msg">
                            <div className="alert-icon"><img src="../../../img/images/ic_24h.png" className="shake" style={{width: '44px'}}/></div>
                            <div className="alert-message">
                                <div id="tasksTitle" className="a-title" style={{fontSize: '16px'}}>
                                    Stint has shortlisted your matches
                                </div>
                                <div className="a-desc">
                                    Give it upto <b style={{color: '#444444'}}>24 hrs</b> to get the best quotes.
                                </div>
                            </div>
                        </div>
                        <img className="icon-tick" id="myTasksSuccess" src="../../../img/images/ic_tick.png"/>
                        <Paper style={{marginTop: '14px'}}>
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
                              <TabPanel value={this.state.value} index={0}>
                                    {results[0] && results[0].title}
                                    {results && results.map((resultItem, index) => {
                                        return (<Card index={index} />);
                                    })}

                              </TabPanel>
                              <TabPanel value={this.state.value} index={1}>
                                Item Two
                              </TabPanel>
                            </Paper>
                        <div className="tasks-table">
                            <table id="tasksTable">
                              <tr>
                                <td><img id="iconStatus1" className="icon-status" src="../../../img/images/ic_started.png"/></td>
                                <td className="status-started">Shortlist interior designers near me<br/><div className="status-title">Estimated to complete in few mins</div></td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus2" className="icon-status" src="../../../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Check reviews & customer references</td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus3" className="icon-status" src="../../../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Filter out fake agencies & companies with complaints</td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus4" className="icon-status" src="../../../img/images/ic_upnext.png"/></td>
                                <td className="status-notstarted">Get quotes & review with me</td>
                              </tr>
                              <tr>
                                <td><img id="iconStatus5" className="icon-status last" src="../../../img/images/ic_finish.png"/></td>
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