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
            optionDesc: [{
                text: ''
            }, {
                text: ''
            }],
            voting: ''
        }
		
        this.changeCampaignNameHandler = this.changeCampaignNameHandler.bind(this);
        this.changeDeadlineHandler = this.changeDeadlineHandler.bind(this);
        this.changeCampaignStatusHandler = this.changeCampaignStatusHandler.bind(this);
		    this.addOption = this.addOption.bind(this);
		    this.removeOption = this.removeOption.bind(this);
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

    addOption(event) {
        const optionDesc = this.state.optionDesc.slice();        
        this.setState({
            optionDesc: optionDesc.concat([{
                text: ''
            }])
        });
	}

    removeOption(optionNumber) {
        const optionDesc = this.state.optionDesc.slice();
        this.setState({
            optionDesc: [...optionDesc.slice(0, optionNumber), ...optionDesc.slice(optionNumber+1)]
        });
    }

	changeOptionDescHandler= (event, index) => {
        const optionDesc = this.state.optionDesc.slice();
        const value = event.target.value;

        optionDesc[index] = {
            text: value,
        }

        this.setState({
            optionDesc: optionDesc
        });
    }

    changeVotingHandler= (event) => {
        this.setState({voting: event.target.value});
    }

    cancel(){
        this.props.history.push('/campaigns');
    }
	
    render() {
		const optionView = [];
        this.state.options.forEach((option, index) => {
            optionView.push(<optionInput key={index} option={option} optionNumber={index} removeOption={this.removeOption} handleOptionChange={this.handleOptionChange}/>);
        });
		
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
										<div className="form-group">
											{optionView}
										</div>
										<div className="form-group">
											<button onClick={this.addOption} className="btn btn-info">Add Option</button>
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

function optionInput(props) {
    return (
        <div className = "form-group">
			<input 
                placeholder = {'Option ' + (props.optionNumber + 1)}
                size="large"
                value={props.choice.text} 
                className={ props.optionNumber > 1 ? "optional-choice": null}
                onChange={(event) => props.changeOptionDescHandler(event, props.optionNumber)} />

            {
                props.optionNumber > 1 ? (
                <button
                    className="btn btn-danger"
                    type="close"
                    disabled={props.optionNumber <= 1}
                    onClick={() => props.removeOption(props.optionNumber)}>
					Remove Option
				</button> ): null
            } 
        <br/>
        </div>
    );
}
/*
function voterInput(props) {
    return (
        <div className = "form-group">
		
		</div>
	)
}
*/
export default CreateCampaignComponent
