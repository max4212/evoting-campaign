import React, { Component } from 'react'
import UserService from '../services/UserService';
import CampaignService from '../services/CampaignService';
import OptionService from '../services/OptionService';
import VoterService from '../services/VoterService';

class CreateCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            campaignName: '',
            deadline: '',
            campaignStatus: '',
            optionDesc: '',
            voting: ''
        }

        this.changeCampaignNameHandler = this.changeCampaignNameHandler.bind(this);
        this.changeDeadlineHandler = this.changeDeadlineHandler.bind(this);
        this.changeCampaignStatusHandler = this.changeCampaignStatusHandler.bind(this);
		this.changeOptionDescHandler = this.changeOptionDescHandler.bind(this);
		this.changeVotingHandler = this.changeVotingHandler.bind(this);
        this.saveOrUpdateCampaign = this.saveOrUpdateCampaign.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            CampaignService.getCampaignById(this.state.id).then( (res) =>{
                let campaign = res.data;
                this.setState({campaignName: campaign.campaignName,
                    deadline: campaign.deadline,
                    user_id : campaign.user_id,
                    campaignStatus : campaign.campaignStatus
                });
            });
			OptionService.getOptionsByCampaign(this.state.campaign_id).then( (res) =>{
				let option = res.data;
				this.setState({optionDesc: option.optionDesc});
			});
			VoterService.getVotersByCampaign(this.state.campaign_id).then( (res) =>{
				let voter = res.data;
				this.setState({voting : voter.voting});
			});
        }        
    }
    
    saveOrUpdateCampaign = (e) => {
        e.preventDefault();
        UserService.getUserById(this.state.id).then( res => {
            this.setState({user: res.data});
        })
        let campaign = {campaignName: this.state.campaignName, deadline: this.state.deadline, campaignStatus: this.state.campaignStatus, user: this.state.user};
		let option = {optionDesc: this.state.optionDesc, campaign: campaign};
		let voter = {user: this.state.user, campaign: campaign}
        console.log('campaign => ' + JSON.stringify(campaign));
        console.log('option => ' + JSON.stringify(option));
        console.log('voter => ' + JSON.stringify(voter));

        if(this.state.id === '_add'){
            CampaignService.createCampaignTest(campaign).then(res =>{
				OptionService.createOption(option);
				VoterService.createVoter(voter);
				this.props.history.push('/campaigns');
            });
        }else{
            CampaignService.updateCampaign(campaign, this.state.id).then( res => {
				OptionService.updateOption(option, this.state.option_id)
                this.props.history.push('/campaigns');
            });
        }
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

    changeOptionDescHandler= (event) => {
        this.setState({optionDesc: event.target.value});
    }

    changeVotingHandler= (event) => {
        this.setState({voting: event.target.value});
    }

    cancel(){
        this.props.history.push('/campaigns');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Campaign</h3>
        }else{
            return <h3 className="text-center">Update Campaign</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Campaign Name: </label>
                                            <input placeholder="Campaign Name" name="campaignName" className="form-control" 
                                                value={this.state.campaignName} onChange={this.changeCampaignNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Closing Date: </label>
                                            <input placeholder="Closing Date" name="deadline" className="form-control" type="date"
                                                value={this.state.deadline} onChange={this.changeDeadlineHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Campaign Status: </label>
                                            <input placeholder="Campaign Status" name="campaignStatus" className="form-control" 
                                                value={this.state.campaignStatus} onChange={this.changeCampaignStatusHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Options: </label>
                                            <input placeholder="Options" name="optionDesc" className="form-control" 
                                                value={this.state.optionDesc} onChange={this.changeOptionDescHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Voter: </label>
                                            <input placeholder="Voter" name="voting" className="form-control" 
                                                value={this.state.voting} onChange={this.changeVotingHandler}/>
                                        </div>
                                      
                                        <button className="btn btn-success" onClick={this.saveOrUpdateCampaign}>Save</button>
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
/*
function optionInput() {

}

function selectVoter() {
    
}
*/

export default CreateCampaignComponent