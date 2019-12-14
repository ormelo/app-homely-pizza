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
        <div id={`card-${data.preferenceKey}-${index}`} className="card-container" style={{backgroundImage: `url(./img/images/${data.img})`}}>
            <div id={`progress-${data.preferenceKey}-${index}`} style={{width: '30px'}} className="progress-line" />
            <div className="section-one">
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

        this.userPreferences = [];
        this.preferences = {
                            "interest": {
                               "cards": [
                              {
                                "preferenceName": "a Karaoke event",
                                "userPreference": 10,
                                "img": "/karaoke.jpg",
                                "cluster": 7,
                                "tags": "dj|music",
                                "questionPrefix": "How much would you be interested in ",
                                "preferenceKey": "interest",
                                "preferenceKeyIndex": 0
                              },
                              {
                                "preferenceName": "Bollywood Music event",
                                "userPreference": 10,
                                "img": "/bm.jpg",
                                "cluster": 7,
                                "tags": "dj|music",
                                "questionPrefix": "How much would you be interested in ",
                                "preferenceKey": "interest",
                                "preferenceKeyIndex": 0
                              },
                              {
                                "preferenceName": "an Outdoor event",
                                "userPreference": 10,
                                "img": "/Outdoor.jpg",
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
                                "img": "/Parking.jpg",
                                "cluster": 7,
                                "tags": "",
                                "questionPrefix": "How much would you prefer ",
                                "preferenceKey": "preference",
                                "preferenceKeyIndex": 1
                              },
                              {
                                "preferenceName": "Unlimited food",
                                "userPreference": 10,
                                "img": "/uf.jpg",
                                "cluster": 4,
                                "tags": "",
                                "questionPrefix": "How much would you prefer ",
                                "preferenceKey": "preference",
                                "preferenceKeyIndex": 1
                              },
                              {
                                "preferenceName": "Small budget",
                                "userPreference": 10,
                                "img": "/sb.jpg",
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
                                "img": "/DJ.jpg",
                                "cluster": 7,
                                "tags": "dj|music",
                                "questionPrefix": "How much would you be interested in ",
                                "preferenceKey": "experience",
                                "preferenceKeyIndex": 2
                              },
                              {
                                "preferenceName": "Rooftop",
                                "userPreference": 10,
                                "img": "/rt.jpg",
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
                                "img": "/mall.jpg",
                                "cluster": 3,
                                "tags": "",
                                "questionPrefix": "How much would you be like a place like ",
                                "preferenceKey": "place",
                                "preferenceKeyIndex": 3
                              },
                              {
                                "preferenceName": "a Homestay",
                                "userPreference": 10,
                                "img": "/hs.jpg",
                                "cluster": 5,
                                "tags": "",
                                "questionPrefix": "How much would you be like a place like ",
                                "preferenceKey": "place",
                                "preferenceKeyIndex": 3
                              },
                              {
                                "preferenceName": "a Beach",
                                "userPreference": 10,
                                "img": "/bh.jpg",
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
                                "img": "/kf.jpg",
                                "cluster": 5,
                                "tags": "dj|music",
                                "questionPrefix": "How much would you like a place ",
                                "preferenceKey": "activity",
                                "preferenceKeyIndex": 4
                              },
                              {
                                "preferenceName": "that has Camping",
                                "userPreference": 10,
                                "img": "/cp.jpg",
                                "cluster": 5,
                                "tags": "",
                                "questionPrefix": "How much would you like a place ",
                                "preferenceKey": "activity",
                                "preferenceKeyIndex": 4
                              }
                            ]}
                           };
    }
    componentDidMount() {
        const { params } = this.props.match;
        setTimeout(function(){document.getElementById('logoHeading').style.opacity = '1';},200);
        setTimeout(function(){this.setState({showLoader: false})}.bind(this),400);
        scrollTo(document.body, 0, 100);
    }
    render() {
         const { activeQuestionIndex, showLoader } = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px'}}>
                        <Link to="/?navigatingBack=true"><img id="logo" className="logo-img" style={{width: '43px'}} src="../img/images/logo_ic.png" /></Link>
                        <div id="logoHeading" className="logo-heading">Your preferences</div>
                    </div>
                    <div><i className="loading" style={{display: showLoader ? 'block' : 'none'}}></i></div>
                    <div className="main fadeInBottom" style={{marginTop: '108px'}}>

                        {this.preferences && Object.keys(this.preferences).map((preferenceKey, index) => {
                            let questionPrefix = this.preferences[preferenceKey].questionPrefix;
                            return this.preferences[preferenceKey].cards.map((preference, i, qPrefix) => {
                            return (<div className="question-card"><span>{`${preference.questionPrefix} ${preference.preferenceName}?`}</span><PreferenceCard index={i} data={preference} onSetPreference={this.onSetPreference} questionPrefix={questionPrefix} /></div>);

                            })
                        })}
                        <canvas id="canvas" width="1600" height="1200" style={{width: '800px', height: '600px'}}></canvas>
                    </div>
                    <script src="./scripts/p5.min.js"></script>
                    <script src="./scripts/p5.dom.min.js"></script>
                    <script src="./scripts/p5.sound.min.js"></script>
                    <script src="./scripts/sketch.js"></script>
                <div className="desc copyright" style={{textAlign: 'center',fontSize: '14px'}}>Copyright © 2019 Stint.do</div><br/>
                </div>)
    }
}

export default withRouter(Discover);