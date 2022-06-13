import React, { Component } from 'react'
import CampaignService from '../services/CampaignService'

class ViewCampaign extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            campaign: {}
        }
    }

    componentDidMount(){
        CampaignService.getCampaignById(this.state.id).then( res => {
            this.setState({campaign: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> CAMPAIGN DETAILS</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> CAMPAIGN NAME: </label>
                            <div> { this.state.campaign.campaignName }</div>
                        </div>
                        <div className = "row">
                            <label> CLOSING DATE: </label>
                            <div> { this.state.campaign.deadline }</div>
                        </div>
                        <div className = "row">
                            <label> CAMPAIGN STATUS: </label>
                            <div> { this.state.campaign.status }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCampaign