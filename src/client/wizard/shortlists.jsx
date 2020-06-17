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
import $ from 'jquery';

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

class ReviewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {activeIndex: 0, activeOptions: [], activeCrustIndex: 0, qty: 0};
        this.setActiveTopic = this.setActiveTopic.bind(this);
    }
    componentDidMount() {
    }
    setOpinionArray(topicName) {
        let reviewTopics = this.props.reviewTopics;
        let activeOpinions = [];
        reviewTopics.forEach((reviewTopic)=> {
            if(reviewTopic.topic == topicName) {
                activeOpinions = reviewTopic.opinions;
            }
        });
        this.setState({activeOpinions: activeOpinions});

    }
    setActiveCrust(item, indexCrust) {
        console.log('index: ', indexCrust);
        this.setState({activeCrustIndex: indexCrust});
        this.setOpinionArray(item.topic);
    }
    setActiveTopic(item, index) {
            console.log('index: ', index);
            this.setState({activeIndex: index});
            this.setOpinionArray(item.topic);

            if(document.querySelector('#primaryImg'+this.props.itemId).className.indexOf('rotate') != -1) {
                document.querySelector('#primaryImg'+this.props.itemId).classList.remove('rotate');
            } else {
                document.querySelector('#primaryImg'+this.props.itemId).classList.add('rotate');
            }
            if (index == 1) {
                 document.querySelector('#primaryImg'+this.props.itemId).style.padding = '12px';
            } else if (index == 2) {
                 document.querySelector('#primaryImg'+this.props.itemId).style.padding = '21px';
            } else if (index == 0) {
                 document.querySelector('#primaryImg'+this.props.itemId).style.padding = '0px';
            }
        }
    showMore(e) {
        e.target.parentNode.classList.add('scrollable');
        e.target.style.display = 'none';
        e.target.parentNode.children[e.target.parentNode.children.length - 1].style.marginTop = '7px';
    }

    render() {
        let {reviewTopics, crustOptions, item, itemId} = this.props;
        let {activeIndex, activeCrustIndex, activeOpinions, qty} = this.state;
        let activeDefaultOpinions = [];
        console.log('reviewTopics[0]:', reviewTopics[0]);
        activeDefaultOpinions = reviewTopics[0].opinions;

        return (
          <div className="reviews-container">
              <div className="topic-container">
                {reviewTopics && reviewTopics.map((review, index) => {
                    return (
                        <React.Fragment>
                            <div className={activeIndex===index ? 'review-topic active': 'review-topic'} onClick={()=>{this.setActiveTopic(review, index); if(this.state.qty > 0){var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: crustOptions[this.state.activeCrustIndex].topic, size: reviewTopics[index].topic, qty: this.state.qty, itemId: itemId}});document.dispatchEvent(event);} }}>
                                {review.topic}
                            </div>
                        </React.Fragment>
                    );
                })}
                </div>

                <div className="topic-container" style={{height: '76px'}}>
                    <div className="card-mini-title">Select your crust:</div>
                    {crustOptions && crustOptions.map((crust, indexCrust) => {
                        return (
                            <React.Fragment>
                                <div className={activeCrustIndex===indexCrust ? 'review-topic active-crust': 'review-topic'} onClick={()=>{this.setActiveCrust(crust, indexCrust); if(this.state.qty > 0){var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: crustOptions[indexCrust].topic, size: reviewTopics[this.state.activeIndex].topic, qty: this.state.qty, itemId: itemId}});document.dispatchEvent(event);} }}>
                                    {crust.topic}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="incrementer">
                    <div class="card-mini-title" >Quantity:</div>
                    <div class="quantity">
                        <a className="quantity__minus"><span onClick={()=>{if(this.state.qty>0){this.setState({qty: this.state.qty - 1});}}} style={{fontSize: '25px', lineHeight: '0px', marginLeft: '2px'}}>-</span></a>
                        <input name="quantity" type="text" disabled className="quantity__input" value={this.state.qty} />
                        <a className="quantity__plus"><span onClick={()=>{this.setState({qty: this.state.qty + 1});console.log('item:',item);var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: crustOptions[this.state.activeCrustIndex].topic, size: reviewTopics[this.state.activeIndex].topic, qty: this.state.qty + 1, itemId: itemId}});document.dispatchEvent(event);}}>+</span></a>
                      </div>
                </div>
          </div>
        );
    }
}

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    appendZero(number) {
        if (number > 0 && number < 10) {
            return '0' + number;
        }
        return number;
    }

    render() {
        let {index, data} = this.props;
        return (
        <div className="card-container">
            <div className="section-one">
                <br/>
                <div className="top">
                    <div className="top-left">
                        <img id={`primaryImg${index}`} className="primary-img rotatable" src={`../../../img/images/p${index+1}.png`} />
                    </div>
                    <div className="top-right">
                        <div className="usp-title"></div>
                        <div className="usp-desc">{data.usp[0]}</div>
                    </div>
                </div>
            </div>
            <div className="title">{data.title}</div>
            <hr className="line"/>
            <div className="section-two">
                <div className="pricing"><label className="price"><span className="rupee">₹</span>670</label></div>
                <div className="top">
                    <ReviewContainer reviewTopics={data.qna[0].responses} crustOptions={data.qna[0].crust} itemId={index} item={data} />
                </div>
            </div>
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
        this.fetchJson();
        $(document).ready(function () {

            var winHeight = $(window).height();

            $(window).scroll(function () {
                if($(window).scrollTop() <= 120) {
                    $("#checkoutHeader").css("top", "0px");
                } else {
                    $("#checkoutHeader").css("top", (0+$(window).scrollTop())+"px");
                }
            });

        });

        document.addEventListener('basket-updated', function(e) {
            console.log('basket-updated event', e.detail);
            var currBasketData = localStorage.getItem("basket");
            var basketData;
            if(currBasketData == null) {
                 basketData = new Object();
            } else {
                basketData = JSON.parse(currBasketData);
            }
            if(e.detail != null) {
                console.log('e.detail.itemId: ', e.detail.itemId);
                basketData[e.detail.itemId] = e.detail;
            }

            if(Object.keys(basketData).length >= 1) {
                document.getElementById('checkoutHeader').style.display = 'inline';
                document.getElementById('checkoutCount').innerHTML = Object.keys(basketData).length;
            }
            var basketStr = JSON.stringify(basketData);
            localStorage.setItem("basket",basketStr)
        });
    }
    fetchJson() {
        console.log('this.props.match: ', this.props.match);
        let task = 'interior';
        let loc = 'blr';
        let zone = 'east';

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
                    <img className="icon-back" src="../../../img/images/ic_back.png" onClick={()=>{history.back(-1);}} />
                    <img id="logo" className="logo-img" src="../img/images/logohp4.png" />
                    <div id="checkoutHeader">
                        <div id="checkoutBtn" className="card-btn checkout" >Checkout&nbsp;→
                            <div className=""></div>
                            <div id="checkoutCount" class="c-count">0</div>
                        </div>
                    </div>
                    <div className="banner2"/>
                    <div className="logo" id="logoWrapper">
                        <div id="logoHeading" className="logo-heading"></div>
                        <Link to="/mytasks"><div id="myTasksBtn" className="green-btn right-btn"><img className="icon-btn" src="../img/images/ic_user.png" /><span>My Services</span></div></Link>
                    </div>

                    <div><i className="loading" id="myTasksLoader" style={{top: '28px'}}></i></div>
                    <div className="main fadeInBottom">
                        <hr className="line-tasks"/>
                        <Paper>
                              <Tabs
                                value={this.state.value}
                                onChange={this.handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                                style={{display: 'none'}}
                              >
                                <Tab label="&nbsp;&nbsp;&nbsp;All&nbsp;&nbsp;&nbsp;" />
                                <Tab label="&nbsp;&nbsp;&nbsp;Wishlist&nbsp;&nbsp;&nbsp;" />
                              </Tabs>
                              <TabPanel value={this.state.value} index={0}>

                                    {results && results.map((resultItem, index) => {
                                        return (<Card index={index} data={resultItem} />);
                                    })}

                              </TabPanel>
                              <TabPanel value={this.state.value} index={1}>

                                    {results && results.map((resultItem, index) => {
                                        return (<Card index={index} data={resultItem} />);
                                    })}

                              </TabPanel>
                            </Paper>

                    </div>
                <br/>
                </div>)
    }
}

export default withRouter(Shortlists);