import React, { Component } from 'react';
import { render } from 'react-dom';
import CaptureMeasurements from './captureMeasurements.jsx';
import Quiz from './quiz.jsx';
import Merchant from './merchant.jsx';
import Shop from './shop.jsx';
// Import routing components
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
let emojis = {
    "positive": ["./img/inlove.png", "./img/smiling.png", "./img/inlove.png", "./img/inlove.png", "./img/favorite.png"],
    "neutral": ["./img/thinking.png", "./img/thinking1.png", "./img/smiling.png", "./img/thinking.png", "./img/thinking.png"]
};

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
    render() {
        return (
            <div className="card">
                <div className="card-c">
                </div>
            </div>
        );
    }
}


class QuestionAnswer extends Component {
    render() {
        return (
            <div className={`question-answers-container ${this.props.className}`}>
                <div className="row pr-2">
                    <div className="col-md-12">
                        <div className="question">{this.props.question}</div>
                    </div>
                </div>
                <div className="row pr-2">
                    <div className="col-md-12 pb-2">
                        <div className="answers-container">
                            {this.props.answers.map((answer) => {
                                return (<div className={this.props.selectedAns ? "answer" : "answer active-ans"} onClick={() => this.props.onSelect(answer)}>
                                    <span className="ans-text" >{answer}</span>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


class ImageThumbnail extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                       <div className="image-animation-conatiner ">
                            <img src='../img/download.jpeg' className="main-image"/>
                            <img src='../img/sample_img.jpeg' className="image1"/>
                            <img src='../img/sample_img.jpeg' className="image2"/>
                            <img src='../img/sample_img.jpeg' className="image3"/>
                            <img src='../img/sample_img.jpeg' className="image4"/>
                            <div className="text-container">
                                <span className="key-words">Beautiful view</span><i class="fa fa-question-circle-o" aria-hidden="true"></i>
                                <span className="key-words">water sports</span>
                                <span className="key-words">Beach fast Food Center</span>
                                <span className="key-words">cosy place</span>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        );
    }
}

class SearchResult extends Component {

    renderCards() {
        let results = [];
        searchResults.map((item, key) => {
            results.push(<Card title={item.title} address={item.address} specialities={item.specialities} verifiedStories={item.verifiedStories} rindex={key} thumbnail={item.thumbnail} />);
        });
        return results;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <ResultsList />
                    </div>
                </div>
                <ImageThumbnail/>
            </div>
        );
    }
}

export class ResultsList extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {

    }

    searchResults() {

        return (<div className="results-list">
            <h3><Link to="/detail-view"> #1 Pannambur Beach</Link></h3>
            <span>from <spam className="bt">travel triangle</spam>  and 5 other</span>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="result-background">
                    </div>
                </div>
            </div>
        </div>)
    }

    render() {
        return (<div class="search-results-container">
            <QuestionAnswer question="Do you like IT ?" answers={['Yes', 'No', 'Not Sure']} />
            <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                    <span className="result-info">"60" results short listed</span>
                </div>
            </div>
            <div className="row search-results-container ">
                <div className="col-md-12">
                    {this.searchResults()}
                </div>
            </div>
        </div>
        )
    }

}

class CreateFitProfile extends Component {
    propTypes: {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    componentDidMount() {
        document.querySelector('.loading').style.display = 'none';
    }
    render() {
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
        <Route path="/search" render={() => (
            <div className="results">
                <Route exact path="/search" component={CreateFitProfile} />
                <Route exact path="/search/update" component={CaptureMeasurements} />
                <Route exact path="/search/quiz" component={QuizWithRouter} />
            </div>)} />
        <Route path="/shop" render={() => (
            <div>
                <div className="merchant-frame">
                    <div className="logo">
                        <img src="../img/logoimg.png" style={{ width: '16px', left: '20px', position: 'absolute', top: '-4px' }} />
                        <span className="logoFont">a</span>
                    </div>
                    <span className="merchant-size-container">Please select size <span id="merchantSize">XL</span> below</span>
                </div>
                <Route exact path="/shop" component={ShopWithRouter} />
                <Route path="/shop/buy" component={Merchant} />
            </div>
        )} />
    </div>
</Router>, document.getElementById('containerWiz'));