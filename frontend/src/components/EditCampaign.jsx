import React, { Component } from 'react'
import CampaignService from '../services/CampaignService';

class EditCampaign extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            campaignName: '',
            deadline: '',
            emailId: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDeadlineHandler = this.changeDeadlineHandler.bind(this);
        this.updateCampaign = this.updateCampaign.bind(this);
    }

    componentDidMount(){
        CampaignService.getCampaignById(this.state.id).then( (res) =>{
            let campaign = res.data;
            this.setState({campaignName: campaign.campaignName,
                deadline: campaign.deadline
            });
        });
    }

    updateCampaign = (e) => {
        e.preventDefault();
        let campaign = {campaignName: this.state.campaignName, deadline: this.state.deadline};
        console.log('campaign => ' + JSON.stringify(campaign));
        console.log('id => ' + JSON.stringify(this.state.id));
        CampaignService.updateCampaign(campaign, this.state.id).then( res => {
            this.props.history.push('/campaigns');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({campaignName: event.target.value});
    }

    changeDeadlineHandler= (event) => {
        this.setState({deadline: event.target.value});
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
                                <h3 className="text-center">EDIT CAMPAIGN</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> CAMPAIGN NAME: </label>
                                            <input placeholder="Campaign Name" name="campaignName" className="form-control" 
                                                value={this.state.campaignName} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> CLOSING DATE: </label>
                                            <input placeholder="Closing Date" name="deadline" className="form-control" 
                                                value={this.state.deadline} onChange={this.changeDeadlineHandler}/>
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

export default EditCampaign