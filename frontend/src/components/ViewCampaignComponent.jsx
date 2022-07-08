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
            option: [],
            voter: []
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

    back(){
        this.props.history.push('/campaigns');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Campaign Details</h3>
                    <button className="btn btn-danger" onClick={this.back.bind(this)} style={{marginLeft: "10px",width: "100px"}}>Back</button>
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
                            <div> 
                                <table className="">
                                    {
                                        this.state.option.map(
                                            option => 
                                            <tr key = {option.id}>
                                                <td> {option.optionDesc} </td>   
                                            </tr>
                                        )
                                    }
                                </table>
                            </div>
                        </div>
                        <div className = "row">
                            <label> Voter ID: </label>
                            <div> 
                                <table className="">
                                    {
                                        this.state.voter.map(
                                            voter => 
                                            <tr key = {voter.id}>
                                                <td> {voter.id} </td>   
                                            </tr>
                                        )
                                    }
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCampaignComponent
