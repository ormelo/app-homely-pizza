import React, { Component } from 'react';
import { render } from 'react-dom';
import CaptureMeasurements from './captureMeasurements.jsx';
import Quiz from './quiz.jsx';
import Merchant from './merchant.jsx';
import Shop from './shop.jsx';
// Import routing components
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

let emojis = { "positive": ["./img/inlove.png","./img/smiling.png","./img/inlove.png","./img/inlove.png","./img/favorite.png"],
  "neutral": ["./img/thinking.png","./img/thinking1.png","./img/smiling.png","./img/thinking.png","./img/thinking.png"]};

let searchResults = [
                      {
                        "id": 1,
                        "thumbnail": "th01.jpg",
                        "title": "Sri Annapoorneshwari Catering",
                        "address": "365, Ideal Homes Layout, RR Nagar",
                        "specialities": [
                          {
                            "icon": "ic_food.jpg",
                            "title": "Karnataka, Andhra, Tamil, North Indian"
                          },
                          {
                            "icon": "ic_group.jpg",
                            "title": "Ideal for parties of all sizes"
                          }
                        ],
                        "verifiedStories": [
                          {
                            "avatar": "https://randomuser.me/api/portraits/men/66.jpg",
                            "title": "Good food served",
                            "score": "80",
                            "sentiment": "positive",
                            "story": [
                              {
                                "from": "bot",
                                "message": ""
                              },
                              {
                                "from": "user",
                                "message": ""
                              }
                            ]
                          },
                          {
                            "avatar": "",
                            "title": "Authentic Menu",
                            "score": "60",
                            "sentiment": "positive"
                          },
                          {
                              "avatar": "",
                              "title": "Timely service",
                              "score": "20",
                              "sentiment": "neutral"
                          },
                          {
                            "avatar": "",
                            "title": "Prompt service",
                            "score": "30",
                            "sentiment": "positive"
                          },
                          {
                              "avatar": "",
                              "title": "Value for money",
                              "score": "50",
                              "sentiment": "positive"
                            },
                            {
                              "avatar": "",
                              "title": "No extras",
                              "score": "10",
                              "sentiment": "neutral"
                            },
                          {
                            "avatar": "40",
                            "title": "Menu variety",
                            "sentiment": "positive"
                          }
                        ],
                        "cta": "Get instant quote"
                      },
                      {
                          "id": 2,
                          "thumbnail": "th01.jpg",
                          "title": "Bangalore Catering",
                          "address": "Ashoka pillar, 2nd Block Jayanagar",
                          "specialities": [
                            {
                              "icon": "ic_food.jpg",
                              "title": "North Indian, South Indian"
                            },
                            {
                              "icon": "ic_group.jpg",
                              "title": "Ideal for parties of all sizes"
                            }
                          ],
                          "verifiedStories": [
                            {
                              "avatar": "https://randomuser.me/api/portraits/men/77.jpg",
                              "title": "Timely service        ",
                              "sentiment": "neutral",
                              "story": [
                                {
                                  "from": "bot",
                                  "message": ""
                                },
                                {
                                  "from": "user",
                                  "message": ""
                                }
                              ]
                            },
                            {
                              "avatar": "",
                              "title": "Good food served \uD83D\uDC4D",
                              "sentiment": "neutral"
                            }
                          ],
                          "cta": "Get instant quote"
                        }
                    ];

class ResultHeadline extends Component {
    render() {
        return (
            <div className="result-c">
                <div className="result-headline">{this.props.title} <span className="grey-rbox"> ✓&nbsp;&nbsp;5-step verification</span></div>
            </div>
        );
    }
}

class Card extends Component {

    renderSpecialities(specialities) {
        let results = [];
        specialities.map((item,key)=> {
                            results.push(<div className="icon-c"><img src={`./img/${item.icon}`}/><div className="icon-title">{item.title}</div></div>);
                        });
        return results;
    }
    renderVerifiedStories(stories, rindex) {
            let results = [];
            stories.map((item,key)=> {
                                if(key == 0) {
                                    results.push(<li className="me"><span className="stitle">{item.title}</span><div className="parent" id={"reaction"+rindex}>
                                                                        {this.renderReactions(item.sentiment)}</div></li>);
                                                                        setTimeout("window.showReactions()",800);
                                }
                            });
            return results;
        }

    renderTopics(stories, rindex) {
                let results = [];
                stories.map((item,key)=> {
                                        results.push(<div className="topic tag rounded"><label className={`score${item.score}`}>#{item.title}</label></div>);
                                });
                return results;
            }
    renderReactions(sentiment) {
        console.log('sentiment: ', sentiment);
        let reactions = [];
        emojis[sentiment].map((item, key)=> {
            reactions.push(<img className="emoji" src={item} />);
        });
        return reactions;
    }
    render() {
        return (
            <div className="card">
               <div className="card-c">
                    <div className="detail">
                        <div className="thumbnail-section">
                            <img src={`./img/${this.props.thumbnail}`} />
                        </div>
                        <div className="detail-section">
                            <div className="title">{this.props.title}</div>
                            <div className="address">{this.props.address}</div>
                            <div className="spec-c">{this.renderSpecialities(this.props.specialities)}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="detail story">
                        <div className="topics tag-wrapper left">
                            {this.renderTopics(this.props.verifiedStories, this.props.rindex)}

                        </div>
                    </div>
               </div>
               <div className="card-d"></div>
               <div className="ctabtn top">
                                  Learn More
                              </div>
               <div className="ctabtn">
                                                 Get Instant Quote
                                             </div>
            </div>
        );
    }
}

class SearchResult extends Component {

    renderCards() {
        let results = [];
        searchResults.map((item,key)=> {
            results.push(<Card title={item.title} address={item.address} specialities={item.specialities} verifiedStories={item.verifiedStories} rindex={key} thumbnail={item.thumbnail}/>);
        });
        return results;
    }

    render() {
        return (
            <div>
                <ResultHeadline title="Reviews based on " />
                {this.renderCards()}
            </div>
        );
    }
}

class CreateFitProfile extends Component {
    propTypes: {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    }
    componentDidMount(){
        document.querySelector('.loading').style.display = 'none';
    }
    render(){
        const { match, location, history } = this.props;
        return (<div>
                <SearchResult />
              </div>
          );
    }
}

var CreateFitProfileWithRouter = withRouter(CreateFitProfile)
var ShopWithRouter = withRouter(Shop)
var QuizWithRouter = withRouter(Quiz)

render(<Router>
        <div>
        <Route path="/search" render={()=>(
            <div className="results">
            <Route exact path="/search" component={CreateFitProfile}/>
            <Route exact path="/search/update" component={CaptureMeasurements}/>
            <Route exact path="/search/quiz" component={QuizWithRouter}/>
          </div>)} />
        <Route path="/shop" render={()=>(
            <div>
            <div className="merchant-frame">
              <div className="logo">
                <img src="../img/logoimg.png" style={{width:'16px',left:'20px',position:'absolute',top:'-4px'}}/>
                <span className="logoFont">a</span>
              </div>
              <span className="merchant-size-container">Please select size <span id="merchantSize">XL</span> below</span>
            </div>
            <Route exact path="/shop" component={ShopWithRouter}/>
            <Route path="/shop/buy" component={Merchant}/>
          </div>
          )}/>
        </div>
    </Router>, document.getElementById('containerWiz'));