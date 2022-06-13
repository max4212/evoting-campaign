import React, { Component } from 'react'
import CampaignService from '../services/CampaignService';

class AddCampaign extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            campaignName: '',
            deadline: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDeadlineHandler = this.changeDeadlineHandler.bind(this);
        this.saveCampaign = this.saveCampaign.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            CampaignService.getCampaignById(this.state.id).then( (res) =>{
                let campaign = res.data;
                this.setState({campaignName: campaign.campaignName,
                    deadline: campaign.deadline
                });
            });
        }        
    }
    saveCampaign = (e) => {
        e.preventDefault();
        let campaign = {campaignName: this.state.campaignName, deadline: this.state.deadline};
        console.log('campaign => ' + JSON.stringify(campaign));

        if(this.state.id === '_add'){
            CampaignService.createCampaign(campaign).then(res =>{
                this.props.history.push('/campaigns');
            });
        }else{
            CampaignService.updateCampaign(campaign, this.state.id).then( res => {
                this.props.history.push('/campaigns');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">ADD CAMPAIGN</h3>
        }else{
            return <h3 className="text-center">EDIT CAMPAIGN</h3>
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
                                            <label> CAMPAIGN NAME: </label>
                                            <input placeholder="Campaign Name" name="campaignName" className="form-control" 
                                                value={this.state.campaignName} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> CLOSING DATE: </label>
                                            <input placeholder="Closing Date" name="deadline" className="form-control" 
                                                value={this.state.deadline} onChange={this.changeDeadlineHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> OPTIONS: </label>
                                            <input placeholder="Option One" name="option" className="form-control" 
                                                value={this.state.option} onChange={this.changeOptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> VOTERS: </label>
                                            <input placeholder="Voter One" name="voter" className="form-control" 
                                                value={this.state.voter} onChange={this.changeVoterHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveCampaign}>Save</button>
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

export default AddCampaign