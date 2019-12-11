import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter, useHistory } from 'react-router-dom';
import { detailView } from '../../data-source/mockData';
import ModalView from './modalView.jsx';

function progress() {
    let preferenceKey = this.preferenceKey;
    let index = this.index;
    let progressBarId = 'progress-'+preferenceKey+'-'+index;
   var curWidthVal = document.getElementById(progressBarId).style.width;
   curWidthVal = parseInt(curWidthVal.replace(/px/,''),10);
   document.getElementById(progressBarId).style.width = (curWidthVal+1)+'px';
}

class PreferenceCard extends Component {

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
        let {index, data, onSetPreference} = this.props;
        return (
        <div id={`card-${data.preferenceKey}-${index}`} className="card-container">
            <div id={`progress-${data.preferenceKey}-${index}`} style={{width: '30px'}} className="progress-line" />
            <div className="section-one">
                   {`${data.questionPrefix} ${data.preferenceName}`}
                   <hr className="line"/>
                   {data.preferenceKeyIndex}
                   {data.img}
                   <br/><br/>
                   <input type="submit" value="Like" onClick={()=>{onSetPreference(index, data, 6)}}/>
            </div>
        </div>)
    }
}



class Discover extends Component {

    constructor() {
        super();
        this.state = {
            activeQuestionIndex: 0,
            showLoader: false
        }
        this.onSetPreference = this.onSetPreference.bind(this);
        this.userPreferences = [];
        this.initPreference = this.initPreference.bind(this);
        this.preferences = {
                            "interest": {
                               "cards": [
                              {
                                "preferenceName": "a Karaoke event",
                                "userPreference": 10,
                                "img": "/karaoke.png",
                                "cluster": 7,
                                "tags": "dj|music",
                                "questionPrefix": "How much would you be interested in ",
                                "preferenceKey": "interest",
                                "preferenceKeyIndex": 0
                              },
                              {
                                "preferenceName": "Bollywood Music event",
                                "userPreference": 10,
                                "img": "/bm.png",
                                "cluster": 7,
                                "tags": "dj|music",
                                "questionPrefix": "How much would you be interested in ",
                                "preferenceKey": "interest",
                                "preferenceKeyIndex": 0
                              },
                              {
                                "preferenceName": "an Outdoor event",
                                "userPreference": 10,
                                "img": "/Outdoor.png",
                                "cluster": 5,
                                "tags": "",
                                "questionPrefix": "How much would you be interested in ",
                                "preferenceKey": "interest",
                                "preferenceKeyIndex": 0
                              }
                            ]},
                            "preference": {
                            "cards": [
                              {
                                "preferenceName": "Parking",
                                "userPreference": 10,
                                "img": "/Parking.png",
                                "cluster": 7,
                                "tags": "",
                                "questionPrefix": "How much would you prefer ",
                                "preferenceKey": "preference",
                                "preferenceKeyIndex": 1
                              },
                              {
                                "preferenceName": "Unlimited food",
                                "userPreference": 10,
                                "img": "/uf.png",
                                "cluster": 4,
                                "tags": "",
                                "questionPrefix": "How much would you prefer ",
                                "preferenceKey": "preference",
                                "preferenceKeyIndex": 1
                              },
                              {
                                "preferenceName": "Small budget",
                                "userPreference": 10,
                                "img": "/sm.png",
                                "cluster": 1,
                                "tags": "",
                                "questionPrefix": "How much would you prefer ",
                                "preferenceKey": "preference",
                                "preferenceKeyIndex": 1
                              },
                              {
                                "preferenceName": "Unlimited alcohol",
                                "userPreference": 10,
                                "img": "/ua.png",
                                "cluster": 0,
                                "tags": "",
                                "questionPrefix": "How much would you prefer ",
                                "preferenceKey": "preference",
                                "preferenceKeyIndex": 0
                              }
                            ]},
                            "experience": {
                             "cards":[
                              {
                                "preferenceName": "a DJ",
                                "userPreference": 10,
                                "img": "/DJ.png",
                                "cluster": 7,
                                "tags": "dj|music",
                                "questionPrefix": "How much would you be interested in ",
                                "preferenceKey": "experience",
                                "preferenceKeyIndex": 2
                              },
                              {
                                "preferenceName": "Rooftop",
                                "userPreference": 10,
                                "img": "/rt.png",
                                "cluster": 0,
                                "tags": "",
                                "questionPrefix": "How much would you be interested in ",
                                "preferenceKey": "experience",
                                "preferenceKeyIndex": 2
                              },
                              {
                                "preferenceName": "Skip",
                                "userPreference": 10,
                                "img": "",
                                "cluster": 5,
                                "tags": "",
                                "questionPrefix": "How much would you be interested in ",
                                "preferenceKey": "experience",
                                "preferenceKeyIndex": 2
                              }
                            ]},
                            "place": {
                            "cards":[
                              {
                                "preferenceName": "Skip",
                                "userPreference": 10,
                                "img": "",
                                "cluster": 7,
                                "tags": "",
                                "questionPrefix": "How much would you be like a place like ",
                                "preferenceKey": "place",
                                "preferenceKeyIndex": 3
                              },
                              {
                                "preferenceName": "a Mall",
                                "userPreference": 10,
                                "img": "/mall.png",
                                "cluster": 3,
                                "tags": "",
                                "questionPrefix": "How much would you be like a place like ",
                                "preferenceKey": "place",
                                "preferenceKeyIndex": 3
                              },
                              {
                                "preferenceName": "a Homestay",
                                "userPreference": 10,
                                "img": "/hs.png",
                                "cluster": 5,
                                "tags": "",
                                "questionPrefix": "How much would you be like a place like ",
                                "preferenceKey": "place",
                                "preferenceKeyIndex": 3
                              },
                              {
                                "preferenceName": "a Beach",
                                "userPreference": 10,
                                "img": "/bh.png",
                                "cluster": 6,
                                "tags": "",
                                "questionPrefix": "How much would you be like a place like ",
                                "preferenceKey": "place",
                                "preferenceKeyIndex": 3
                              }
                            ]},
                            "activity": {
                             "questionPrefix": "How much would you like a place ",
                             "cards":[
                              {
                                "preferenceName": "that's Kid friendly",
                                "userPreference": 10,
                                "img": "/DJ.png",
                                "cluster": 5,
                                "tags": "dj|music",
                                "questionPrefix": "How much would you like a place ",
                                "preferenceKey": "activity",
                                "preferenceKeyIndex": 4
                              },
                              {
                                "preferenceName": "that has Camping",
                                "userPreference": 10,
                                "img": "/rt.png",
                                "cluster": 5,
                                "tags": "",
                                "questionPrefix": "How much would you like a place ",
                                "preferenceKey": "activity",
                                "preferenceKeyIndex": 4
                              }
                            ]}
                           };
    }
    componentWillUnmount() {
    }
    componentDidMount() {
        const { params } = this.props.match;
        setTimeout(function(){document.getElementById('logoHeading').style.opacity = '1';},200);
        setTimeout(function(){this.setState({showLoader: false})}.bind(this),400);
        scrollTo(document.body, 0, 100);
        this.initPreference();
    }
    initProgress(preferenceKey, index, data){
            let progressBarId = 'progress-'+preferenceKey+'-'+index;
            var progressTimer = setInterval(progress.bind({preferenceKey, index}),21);
            window.currPrefData = data;
            setTimeout(function(){
                clearInterval(window.progressTimer);
                document.getElementById(progressBarId).style.width = '30px';
                console.log('data: ', window.currPrefData);
                this.onSetPreference(index, window.currPrefData, 4, typeof progressTimer === 'undefined' ? false : progressTimer)
            }.bind(this),6000);
        }
    initPreference(){
        document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
        document.querySelector(`#card-${Object.keys(this.preferences)[0]}-0`).style.display='block';
        this.initProgress(Object.keys(this.preferences)[0], 0, this.preferences[Object.keys(this.preferences)[0]].cards[0]);
    }
    onSetPreference(cardIndex, data, value, progressTimer){
        if(typeof progressTimer!=='undefined') {
            console.log('clearing');
            clearInterval(progressTimer);
        }
        let preferenceKeyIndex = data.preferenceKeyIndex;
        let preferenceKey = data.preferenceKey;
        let preferenceName = data.preferenceName;
        let cluster = data.cluster;
        let tags = data.tags;
        let pref = {};
        pref.cluster = cluster;
        pref.tags = tags;
        pref.value = value;
        this.userPreferences.push(pref);

        console.log('preferenceKey: ', preferenceKey);
        console.log('Object.keys(this.preferences) ', Object.keys(this.preferences));
        console.log('Object.keys(this.preferences)[preferenceKey]: ', Object.keys(this.preferences)[preferenceKey]);
        if(preferenceKeyIndex === 0) {
                //not the last card
            if(cardIndex != this.preferences[preferenceKey]['cards'].length - 1) {
                console.log('in if', this.preferences[preferenceKey]['cards'][cardIndex+1].cluster - cluster );
                if((this.preferences[preferenceKey]['cards'][cardIndex+1].cluster - cluster >= 0 && this.preferences[preferenceKey]['cards'][cardIndex+1].cluster - cluster <= 2)  ||
                    (cluster - this.preferences[preferenceKey]['cards'][cardIndex+1].cluster >= 0 && cluster - this.preferences[preferenceKey]['cards'][cardIndex+1].cluster <= 2)){
                       document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
                       document.querySelector(`#card-${preferenceKey}-${cardIndex+1}`).style.display='block';
                       this.initProgress(preferenceKey, cardIndex+1, data);
                }
            } else {
                //the last card, move to next pref key
                preferenceKey = Object.keys(this.preferences)[preferenceKeyIndex+1];
                if((this.preferences[preferenceKey]['cards'][0].cluster - cluster >= 0 && this.preferences[preferenceKey]['cards'][0].cluster - cluster <= 2)  ||
                                    (cluster - this.preferences[preferenceKey]['cards'][0].cluster >= 0 && cluster - this.preferences[preferenceKey]['cards'][0].cluster <= 2)){
                                       document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
                                       document.querySelector(`#card-${preferenceKey}-0`).style.display='block';
                                       this.initProgress(preferenceKey, 0, data);
                                }
                else if((this.preferences[preferenceKey]['cards'][1].cluster - cluster >= 0 && this.preferences[preferenceKey]['cards'][1].cluster - cluster <= 2)  ||
                                                    (cluster - this.preferences[preferenceKey]['cards'][1].cluster >= 0 && cluster - this.preferences[preferenceKey]['cards'][1].cluster <= 2)){
                                                       document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
                                                       document.querySelector(`#card-${preferenceKey}-1`).style.display='block';
                                                       this.initProgress(preferenceKey, 1, data);
                                                }
                else if((this.preferences[preferenceKey]['cards'][2].cluster - cluster >= 0 && this.preferences[preferenceKey]['cards'][2].cluster - cluster <= 2)  ||
                                                                    (cluster - this.preferences[preferenceKey]['cards'][2].cluster >= 0 && cluster - this.preferences[preferenceKey]['cards'][2].cluster <= 2)){
                                                                       document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
                                                                       document.querySelector(`#card-${preferenceKey}-2`).style.display='block';
                                                                       this.initProgress(preferenceKey, 2, data);
                                                                }
                else if((this.preferences[preferenceKey]['cards'][3].cluster - cluster >= 0 && this.preferences[preferenceKey]['cards'][3].cluster - cluster <= 2)  ||
                                                                                    (cluster - this.preferences[preferenceKey]['cards'][3].cluster >= 0 && cluster - this.preferences[preferenceKey]['cards'][3].cluster <= 2)){
                                                                                       document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
                                                                                       document.querySelector(`#card-${preferenceKey}-3`).style.display='block';
                                                                                       this.initProgress(preferenceKey, 3, data);
                                                                                }

            }
        } else {
             //the last card, move to next pref key
                            preferenceKey = Object.keys(this.preferences)[preferenceKeyIndex+1];
                            if((this.preferences[preferenceKey]['cards'][0].cluster - cluster >= 0 && this.preferences[preferenceKey]['cards'][0].cluster - cluster <= 2)  ||
                                                (cluster - this.preferences[preferenceKey]['cards'][0].cluster >= 0 && cluster - this.preferences[preferenceKey]['cards'][0].cluster <= 2)){
                                                   document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
                                                   document.querySelector(`#card-${preferenceKey}-0`).style.display='block';
                                            }
                            else if((this.preferences[preferenceKey]['cards'][1].cluster - cluster >= 0 && this.preferences[preferenceKey]['cards'][1].cluster - cluster <= 2)  ||
                                                                (cluster - this.preferences[preferenceKey]['cards'][1].cluster >= 0 && cluster - this.preferences[preferenceKey]['cards'][1].cluster <= 2)){
                                                                   document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
                                                                   document.querySelector(`#card-${preferenceKey}-1`).style.display='block';
                                                            }
                            else if((this.preferences[preferenceKey]['cards'][2].cluster - cluster >= 0 && this.preferences[preferenceKey]['cards'][2].cluster - cluster <= 2)  ||
                                                                                (cluster - this.preferences[preferenceKey]['cards'][2].cluster >= 0 && cluster - this.preferences[preferenceKey]['cards'][2].cluster <= 2)){
                                                                                   document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
                                                                                   document.querySelector(`#card-${preferenceKey}-2`).style.display='block';
                                                                            }
                            else if((this.preferences[preferenceKey]['cards'][3].cluster - cluster >= 0 && this.preferences[preferenceKey]['cards'][3].cluster - cluster <= 2)  ||
                                                                                                (cluster - this.preferences[preferenceKey]['cards'][3].cluster >= 0 && cluster - this.preferences[preferenceKey]['cards'][3].cluster <= 2)){
                                                                                                   document.querySelectorAll(".card-container").forEach((node)=>{node.style.display='none'});
                                                                                                   document.querySelector(`#card-${preferenceKey}-3`).style.display='block';
                                                                                            }
        }
        console.log('preferenceKeyIndex:', preferenceKeyIndex);
        console.log('this.userPreferences: ', this.userPreferences);
    }

    render() {
         const { activeQuestionIndex, showLoader } = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px'}}>
                        <Link to="/?navigatingBack=true"><img id="logo" className="logo-img" style={{width: '40px'}} src="../img/images/logo_ic.png" /></Link>
                        <div id="logoHeading" className="logo-heading">Your preferences</div>
                    </div>
                    <div><i className="loading" style={{display: showLoader ? 'block' : 'none'}}></i></div>
                    <div className="main fadeInBottom" style={{marginTop: '108px'}}>

                        {this.preferences && Object.keys(this.preferences).map((preferenceKey, index) => {
                            let questionPrefix = this.preferences[preferenceKey].questionPrefix;
                            return this.preferences[preferenceKey].cards.map((preference, i, questionPrefix) => {
                            return (<PreferenceCard index={i} data={preference} onSetPreference={this.onSetPreference} questionPrefix={questionPrefix} />);

                            })
                        })}

                    </div>
                <div className="desc copyright" style={{textAlign: 'center',fontSize: '14px'}}>Copyright © 2019 Stint.do</div><br/>
                </div>)
    }
}

export default withRouter(Discover);