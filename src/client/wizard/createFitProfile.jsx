import React, { Component } from 'react';
import { render } from 'react-dom';
import DetailView from './detailView.jsx';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
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
                            <img src='../img/download.jpeg' className="main-image" />
                            <img src='../img/sample_img.jpeg' className="image1" />
                            <img src='../img/sample_img.jpeg' className="image2" />
                            <img src='../img/sample_img.jpeg' className="image3" />
                            <img src='../img/sample_img.jpeg' className="image4" />
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


export class ResultsList extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        document.querySelector('.loading').style.display = 'none';
    }


    render() {
        return (<div class="search-results-container">
            <QuestionAnswer question="Do you like IT ?" answers={['Yes', 'No', 'Not Sure']} />
            <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                    <span className="result-info">"60" results short listed</span>
                </div>
            </div>
            <div className="row">
               {[1,2,3].map(()=>{
                  return( <div className="col-sm-12 col-md-4">
                   <div className="results-list">
                       <h3><Link to="/search/details"> #1 Pannambur Beach</Link></h3>
                       <span>from <spam className="bt">travel triangle</spam>  and 5 other</span>
                       <ImageThumbnail />
                   </div>
               </div>)})} 
            </div>
        </div>
        )
    }

}

var QuizWithRouter = withRouter(DetailView)

render(<Router>
    <div>
        <Route path="/search" render={() => (
            <div className="results">
                <Route exact path="/search" component={ResultsList} />
                <Route exact path="/search/details" component={QuizWithRouter} />
            </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));