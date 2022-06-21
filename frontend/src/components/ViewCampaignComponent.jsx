import React, { Component } from 'react'
import CampaignService from '../services/CampaignService'
import OptionService from '../services/OptionService'
import VoterService from '../services/VoterService'

class ViewCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            campaign: {},
            option: {},
            voter: {}
        }
    }

    componentDidMount(){
        CampaignService.getCampaignById(this.state.id).then( res => {
            this.setState({campaign: res.data});
        })
        OptionService.getOptionsByCampaign(this.state.id).then( res => {
            this.setState({option: res.data});
        })
        VoterService.getVotersByCampaign(this.state.id).then( res => {
            this.setState({voter: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Campaign Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Campaign Name: </label>
                            <div> { this.state.campaign.campaignName }</div>
                        </div>
                        <div className = "row">
                            <label> Closing Date: </label>
                            <div> { this.state.campaign.deadline }</div>
                        </div>
                        <div className = "row">
                            <label> Campaign Status: </label>
                            <div> { this.state.campaign.campaignStatus }</div>
                        </div>
                        <div className = "row">
                            <label> Options: </label>
                            <div> { this.state.option.optionDesc }</div>
                        </div>
                        <div className = "row">
                            <label> Voter ID: </label>
                            <div> { this.state.voter.user_id }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCampaignComponent
