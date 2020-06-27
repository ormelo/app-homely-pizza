import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

import { questions, conditionalQuestions } from '../../data-source/mockDataQnA';
import { useHistory } from "react-router-dom";

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
    setCrustPrice(crustIndex) {
        let crust = this.props.crustOptions[crustIndex].topic;
        let item = this.props.item;
        console.log('::Size::', this.props.reviewTopics[this.state.activeIndex].topic);
        console.log('::Crust::', crust);
        console.log('::Price::', this.props.reviewTopics[this.state.activeIndex]["pricing"][crust]);
        document.getElementById('price'+this.props.itemId).innerHTML = this.props.reviewTopics[this.state.activeIndex]["pricing"][crust] * (this.state.qty > 0 ? this.state.qty : 1);
        if(this.state.qty > 0){
            var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: this.props.crustOptions[crustIndex].topic, size: this.props.reviewTopics[this.state.activeIndex].topic, qty: this.state.qty, price: this.props.reviewTopics[this.state.activeIndex]["pricing"][crust] * this.state.qty, itemId: this.props.itemId}});
            document.dispatchEvent(event);
        }
    }
    setSizePrice(activeIndex) {
        let size = this.props.reviewTopics[activeIndex].topic;
        let item = this.props.item;
        console.log('::Size::', size);
        console.log('::Crust::', this.props.crustOptions[this.state.activeCrustIndex].topic);
        console.log('::Price::', this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size]);
        document.getElementById('price'+this.props.itemId).innerHTML = this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * (this.state.qty > 0 ? this.state.qty : 1);
        if(this.state.qty > 0){
            var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: this.props.crustOptions[this.state.activeCrustIndex].topic, size: this.props.reviewTopics[activeIndex].topic, qty: this.state.qty, price: this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * this.state.qty, itemId: this.props.itemId}});
            document.dispatchEvent(event);
        }
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
    updatePrice(qty) {
        if(qty >= 1) {
            let size = this.props.reviewTopics[this.state.activeIndex].topic;
            document.getElementById('price'+this.props.itemId).innerHTML = this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * qty;
        }
    }
    getPrice(qty) {
        let size = this.props.reviewTopics[this.state.activeIndex].topic;
        return this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * qty;
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
                            <div className={activeIndex===index ? 'review-topic active': 'review-topic'} onClick={()=>{this.setActiveTopic(review, index);  this.setSizePrice(index); }}>
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
                                <div className={activeCrustIndex===indexCrust ? 'review-topic active-crust': 'review-topic'} onClick={()=>{this.setActiveCrust(crust, indexCrust); this.setCrustPrice(indexCrust); }}>
                                    {crust.topic}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="incrementer">
                    <div class="card-mini-title" >Quantity:</div>
                    <div class="quantity">
                        <a className="quantity__minus"><span onClick={()=>{if(this.state.qty>0){this.setState({qty: this.state.qty - 1});}this.updatePrice(this.state.qty - 1);var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: crustOptions[this.state.activeCrustIndex].topic, size: reviewTopics[this.state.activeIndex].topic, qty: this.state.qty - 1, price: this.getPrice(this.state.qty - 1), itemId: itemId}});document.dispatchEvent(event);}} style={{fontSize: '25px', lineHeight: '0px', marginLeft: '2px'}}>-</span></a>
                        <input name="quantity" type="text" disabled className="quantity__input" value={this.state.qty} />
                        <a className="quantity__plus"><span onClick={()=>{this.setState({qty: this.state.qty + 1});console.log('item:',item);var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: crustOptions[this.state.activeCrustIndex].topic, size: reviewTopics[this.state.activeIndex].topic, qty: this.state.qty + 1, price: this.getPrice(this.state.qty + 1), itemId: itemId}});document.dispatchEvent(event);this.updatePrice(this.state.qty + 1)}}>+</span></a>
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
                <div className="pricing"><label className="price"><span className="rupee">₹</span><span id={`price${index}`}>{data.qna[0].defaultPrice}</span></label></div>
                <div className="top">
                    <ReviewContainer reviewTopics={data.qna[0].responses} crustOptions={data.qna[0].crust} itemId={index} item={data} />
                </div>
            </div>
        </div>)
    }
}

class SummaryCard extends Component {

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
        <div className="card-container small" style={{padding: '0px 12px 0px 12px'}}>
            <div className="section-one">
                <div className="top">
                    <div className="top-left">
                        <img id={`primaryImg${index}`} className="primary-img rotatable" src={`../../../img/images/p${data.itemId+1}.png`} style={{width: '72px',paddingTop: '0px'}} />
                    </div>
                    <div className="top-right">
                        <div className="usp-title"><div className="title">{data.name}</div></div>
                        <div className="usp-desc">{data.qty} {data.size} pizza(s)</div>
                    </div>
                </div>
            </div>

            <div className="section-two small">
                <div className="pricing"><label className="price"><span className="rupee">₹</span><span id={`price${index}`}>{data.price}</span></label></div>
                <div className="top">
                </div>
            </div>
        </div>)
    }
}


class Shortlists extends Component {

    constructor() {
        super();
        this.state = {
            value: 0,
            results: [],
            activeStep: 1,
            orderSummary: localStorage.getItem('basket') != null ? JSON.parse(localStorage.getItem('basket')) : []
        };
    }
    componentDidMount() {
        this.fetchJson();
        localStorage.removeItem("basket");
        var winHeight = window.innerHeight;

        window.addEventListener("scroll",function () {
            if(window.scrollY <= 120) {
                document.querySelector("#checkoutHeader").style.top = "0px";
            } else {
                document.querySelector("#checkoutHeader").style.top = window.scrollY+"px";
            }
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
    getTotal() {
        let orderSummary = this.state.orderSummary;
        let total = 0;
        orderSummary && Object.keys(orderSummary).map((index) => {
            if(typeof index !== 'undefined') {
                total += orderSummary[index].price;
            }
        });
        total = total + (0.04*total);
        return Math.round(total);
    }
    captureAddress() {
        let pincode = document.getElementById('dPincode').value;
        let address = document.getElementById('dAddress').value;
        let mobile = document.getElementById('dMobile').value;
        localStorage.setItem('dPincode',pincode);
        localStorage.setItem('dAddress',address);
        localStorage.setItem('dMobile',mobile);
    }
    render() {
        const {showLoader, results, orderSummary} = this.state;
        console.log('orderSummary: ', orderSummary);
        return (<div>
                    <img className="icon-back" src="../../../img/images/ic_back.png" onClick={()=>{history.back(-1);}} />
                    <img id="logo" className="logo-img" src="../img/images/logohp4.png" />
                    <div id="checkoutHeader">
                        <div id="checkoutBtn" className="card-btn checkout" onClick={()=>{document.getElementById('checkoutModal').style.top='-20px';this.setState({orderSummary: localStorage.getItem('basket') != null ? JSON.parse(localStorage.getItem('basket')) : []});}}>Checkout&nbsp;→
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
                        <div id="checkoutModal" className="card-container checkout-modal modal-show">
                            <div className="modal-heading">
                                <div className="right" onClick={()=>{document.getElementById('checkoutModal').style.top='1200px';}}>
                                    <img src="../../../img/images/ic_close.png" />
                                </div>
                            </div>
                            <div className="md-stepper-horizontal orange">
                                <div id="step1" className="md-step">
                                  <div className="md-step-circle active"><span>1</span></div>
                                  <div className="md-step-title">Order Summary</div>
                                  <div className="md-step-bar-left"></div>
                                  <div className="md-step-bar-right"></div>
                                </div>
                                <div id="step2" className="md-step">
                                  <div className="md-step-circle" id="step2Circle"><span>2</span></div>
                                  <div className="md-step-title">Delivery Address</div>
                                  <div className="md-step-bar-left"></div>
                                  <div className="md-step-bar-right"></div>
                                </div>
                                <div id="step3" className="md-step">
                                  <div className="md-step-circle" id="step3Circle"><span>3</span></div>
                                  <div className="md-step-title">Make Payment</div>
                                  <div className="md-step-bar-left"></div>
                                  <div className="md-step-bar-right"></div>
                                </div>
                              </div>
                              {this.state.activeStep == 1 &&
                              <div className="checkout-content">
                                {orderSummary && Object.keys(orderSummary).map((index) => {
                                    if(typeof index !== 'undefined') {
                                        return (<SummaryCard index={index} data={orderSummary[index]} />);
                                    }
                                })}
                                <div className="summary-total">Total:  <span className="rupee">₹</span><span id="price">{this.getTotal()}</span>
                                    <div style={{fontSize: '14px', marginTop: '5px', marginLeft: '2px'}}>(incl GST at 4%)</div>
                                </div>
                                <div id="checkoutBtn" className="card-btn checkout" style={{bottom: '60px', marginTop: 'auto'}} onClick={()=>{document.getElementById('step1').classList.add('done');document.getElementById('step2').classList.add('active');document.getElementById('step2Circle').classList.add('active');this.setState({activeStep: 2});}}>Next&nbsp;→
                                    <div className=""></div>
                                </div>
                              </div>}
                              {this.state.activeStep == 2 &&
                                <div className="checkout-content">

                                <div className="card-container" style={{padding: '0px 12px 0px 12px'}}>
                                            <div className="section-one">
                                                <div className="top">
                                                    <div className="top-right">
                                                        <div className="usp-title">
                                                            <input id="dPincode" type="text" className="step-input" placeholder="Your pincode"/>
                                                            <textarea id="dAddress" className="step-input" className="step-input step-textarea" placeholder="Delivery address (with landmark)" />
                                                            <input id="dMobile" type="text" className="step-input" placeholder="Mobile number" style={{top:'198px'}}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                <div id="checkoutBtnStep2" className="card-btn checkout" style={{bottom: '60px', marginTop: 'auto'}} onClick={()=>{document.getElementById('step2').classList.add('done');this.captureAddress();document.getElementById('step3Circle').classList.add('active');this.setState({activeStep: 3});}}>Next&nbsp;→
                                    <div className=""></div>
                                </div>
                              </div>}
                        </div>


                                    {results && results.map((resultItem, index) => {
                                        return (<Card index={index} data={resultItem} />);
                                    })}


                    </div>
                <br/>
                </div>)
    }
}

export default withRouter(Shortlists);