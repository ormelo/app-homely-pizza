import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter, useHistory } from 'react-router-dom';
import { detailView } from '../../data-source/mockData';
import ModalView from './modalView.jsx';

function progress() {
    let progressBarId = 'progress';
   var curWidthVal = document.getElementById(progressBarId).style.width;
   curWidthVal = parseInt(curWidthVal.replace(/px/,''),10);
   if(curWidthVal >= screen.width) {
        clearInterval(window.pr);
   }
   document.getElementById(progressBarId).style.width = (curWidthVal+1)+'px';
}

class PreferenceCard extends Component {

    constructor(props) {
        super(props);
        this.state = {animated: false};
        this.likeUnlike = this.likeUnlike.bind(this);
    }
    componentDidMount() {
    }
    likeUnlike() {
        if(!this.state.animated){
            this.setState({animated: true});
            document.getElementById('heartLike').classList.add('happy')
            document.getElementById('heartLike').classList.remove('broken');
          }
          else {
            this.setState({animated: false});
            document.getElementById('heartLike').classList.remove('happy')
            document.getElementById('heartLike').classList.add('broken');
          }
    }
    appendZero(number) {
        if (number > 0 && number < 10) {
            return '0' + number;
        }
        return number;
    }

    render() {
        let {index, data, onSetPreference, animated} = this.props;
        return (
        <div id={`card-${data.preferenceKey}-${index}`} className="card-container" style={{backgroundImage: `url(./img/images/${data.img})`}}>
            <div className="section-one">
                   <div id="heartLike" className="heart" onClick={this.likeUnlike}>
                                                                                   <svg enableBackground="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" >
                                                                                   <path d="m0 173.51c0-77.535 62.854-140.39 140.39-140.39 34.388 0 65.865 12.383 90.262 32.918 14.664 12.343 36.039 12.343 50.702 0 24.396-20.536 55.873-32.918 90.262-32.918 77.533 0 140.39 62.852 140.39 140.39v-4.129c0 136.15-165.57 258.94-230.41 301.8-15.528 10.265-35.662 10.265-51.189 0-64.831-42.863-230.4-165.66-230.4-301.8" fill="#FFF"/>
                                                                                   <g fill="#FFF">
                                                                                   	<path d="m0 173.51c0-0.594 0.082-1.167 0.089-1.759-0.012-0.791-0.089-1.577-0.089-2.37v4.129z"/>
                                                                                   	<path d="m114.82 182.73c-6e-3 0.639-0.063 1.258-0.063 1.899v-4.457c0 0.856 0.055 1.704 0.063 2.558 0.544-66.886 29.431-123.32 69.206-142.54-13.749-4.506-28.381-7.068-43.641-7.068-76.94 0-139.35 61.913-140.3 138.63 1.909 135.2 165.86 256.82 230.32 299.43 6.614 4.372 14.069 6.766 21.643 7.414-53.184-59.763-136.09-172.58-137.23-295.87z"/>
                                                                                   </g>
                                                                                   <circle cx="449.53" cy="153.94" r="32.044" fill="#FFF"/>
                                                                                   <circle cx="408.44" cy="92.844" r="20.028" fill="#FFF"/>
                                                                                   </svg>
</div>
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
                                "img": "/outdoor.jpg",
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
                                "img": "/psarking.jpg",
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
                                "img": "/dj.jpg",
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
        window.pr = setInterval(function(){progress()},35);
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
                        <div id="progress" style={{width: '30px'}} className="progress-line" />
                        {this.preferences && Object.keys(this.preferences).map((preferenceKey, index) => {
                            let questionPrefix = this.preferences[preferenceKey].questionPrefix;
                            return this.preferences[preferenceKey].cards.map((preference, i, qPrefix) => {
                            return (<div className="question-card"><span>{`${preference.questionPrefix} ${preference.preferenceName}?`}</span><PreferenceCard index={i} data={preference} onSetPreference={this.onSetPreference} questionPrefix={questionPrefix} /></div>);

                            })
                        })}
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