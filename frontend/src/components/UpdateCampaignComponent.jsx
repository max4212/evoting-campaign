import React, { Component } from 'react'
import CampaignService from '../services/CampaignService';
import OptionService from '../services/OptionService';

class UpdateCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            campaignName: '',
            deadline: '',
            campaignStatus: ''
        }
        this.changeCampaignNameHandler = this.changeCampaignNameHandler.bind(this);
        this.changeDeadlineHandler = this.changeDeadlineHandler.bind(this);
        this.updateCampaign = this.updateCampaign.bind(this);
    }

    componentDidMount(){
        CampaignService.getCampaignById(this.state.id).then( (res) =>{
            let campaign = res.data;
            this.setState({campaignName: campaign.campaignName,
                deadline: campaign.deadline,
                campaignStatus : campaign.campaignStatus
            });
        });
    }

    updateCampaign = (e) => {
        e.preventDefault();
        let campaign = {campaignName: this.state.campaignName, deadline: this.state.deadline, campaignStatus: this.state.campaignStatus};
        console.log('campaign => ' + JSON.stringify(campaign));
        console.log('id => ' + JSON.stringify(this.state.id));
        CampaignService.updateCampaign(campaign, this.state.id).then( res => {
            this.props.history.push('/campaigns');
        });
    }
    
    changeCampaignNameHandler= (event) => {
        this.setState({campaignName: event.target.value});
    }

    changeDeadlineHandler= (event) => {
        this.setState({deadline: event.target.value});
    }

    changeCampaignStatusHandler= (event) => {
        this.setState({campaignStatus: event.target.value});
    }

    cancel(){
        this.props.history.push('/campaigns');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Campaign</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Campaign Name: </label>
                                            <input placeholder="Campaign Name" name="campaignName" className="form-control" 
                                                value={this.state.campaignName} onChange={this.changeCampaignNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Closing Date: </label>
                                            <input placeholder="Closing Date" name="deadline" className="form-control" 
                                                value={this.state.deadline} onChange={this.changeDeadlineHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Campaign Status: </label>
                                            <input placeholder="Campaign Status" name="campaignStatus" className="form-control" 
                                                value={this.state.campaignStatus} onChange={this.changeCampaignStatusHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateCampaign}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateCampaignComponent
