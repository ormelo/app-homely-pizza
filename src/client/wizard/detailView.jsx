import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { detailView } from '../../data-source/mockData';
import ModalView from './modalView.jsx'
class DetailView extends Component {

    constructor() {
        super();
        this.state = {
            searchQuery: '',
            details: {},
            selectedSentiment: {},
            openModal: false
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        this.setState({
            searchQuery: params.searchQuery,
            details: detailView,
            selectedSentiment: detailView.sentiments && Object.keys(detailView.sentiments)[0] || {}
        })
    }

    render() {
        const { searchQuery, details, selectedSentiment = '', openModal } = this.state;
        const sentimentDetails = details.sentiments && details.sentiments[selectedSentiment] || {}

        return (<div className="details-view-container">
            <div className="row">
                <div className="col-md-12">
                    <Link to={`/search?q=${searchQuery}`}> <div className="go-back">{'< Go Back'}</div></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="details-header">
                        <img src={'../../img/sample_img.jpeg'} className="banner-image" />
                        <div className="details-title"> {details.title}</div>
                        <div className="sentiments">
                            {details.sentiments && Object.keys(details.sentiments).map((key) => <div className="sentiment">{key}</div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="title">"{sentimentDetails.title}"</div>
                    <div className="speciality" onClick={() => this.setState({ openModal: true })}>{sentimentDetails.speciality}</div>
                    {(sentimentDetails.opinions || []).map((opinion) => {
                        return (<div>
                            <div className="opinion">{opinion.text} <span className="opinion_created_at"> - {opinion.createdOn}</span></div>
                        </div>)
                    })}
                </div>
            </div>
            <div className="row call-to-action">
                <div className="col-md-12">
                    {details.callToAction && details.callToAction.type === 'tel' && <button title={details.callToAction.number} className="btn btn-primary"> {details.callToAction.label}</button>}
                </div>
            </div>
            {openModal && <ModalView />}
        </div>)
    }
}

export default withRouter(DetailView);