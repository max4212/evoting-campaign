import React, { Component } from 'react'
import CampaignService from '../services/CampaignService'
import VoterService from '../services/VoterService'

class VoterListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                campaigns: [],            
        }
    }
    componentDidMount(){
        const userid = localStorage.getItem("inputValue");
        VoterService.getCampaignByVoter(userid).then((res) => {
            this.setState({ campaigns: res.data});
        });
        
    }
    Vote(id){
        localStorage.setItem("campaign",id);
        this.props.navigate("/Optionpage");
    }
    Results(id){
        localStorage.setItem("campaign",id);
        this.props.navigate("/Resultpage");
    }
    viewCampaign(campaign){
        this.props.navigate("/View", { state: { campaign: campaign } });
    }
    editUser(){
        const userid = localStorage.getItem("inputValue");
        this.props.navigate("updateUser", {state: {userid : userid} });
    }
    
    compare(status,type)
    {
        if(type==="vote")
        {
            if(status==="Pending")
            {
            return ''
            }
            else 
            {
            return 'false'
            }
        }
        else if(type==="result")
        {
            if(status==="Closed")
            {
            return ''
            }
            else 
            {
            return 'false'
            }
        }
    }
    title()
    {
        return<div className = "row">
                 <button className="btn btn-primary" onClick={() => this.editUser()} style={{marginLeft: "1px",width: "100px"}}>Update Profile</button>
                 <button className="btn btn-primary" onClick={this.back.bind(this)} style={{marginLeft: "1100px",width: "100px"}}> search</button>
        </div>
    }
        render() {
            return (
                <div>                
                     <h2 className="text-center">Campaigns List</h2>
                    
                     <br></br>
                     <div className = "row">
                            <table className = "table table-striped table-bordered">
    
                                <thead>
                                    <tr>
                                        <th> Campaign Name</th>
                                        <th> Closing Date</th>
                                        <th> Campaign Status</th>
                                        <th> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.campaigns.map(
                                            campaign => 
                                            <tr key = {campaign.id}>
                                                 <td> {campaign.campaignName} </td>   
                                                 <td> {campaign.deadline}</td>
                                                 <td> {campaign.campaignStatus}</td>
                                                 <td>                                            
                                                     <button 
                                                        onClick={ () => this.viewCampaign(campaign)} 
                                                        className="btn btn-info"
                                                     >
                                                     View 
                                                     </button>
                                                     <button 
                                                        style={{marginLeft: "10px"}} 
                                                        onClick={ () => this.Vote(campaign.id)} 
                                                        disabled={this.compare(campaign.campaignStatus,"vote")} 
                                                        className="btn btn-info"
                                                     >
                                                     Vote 
                                                     </button>
                                                     <button 
                                                        style={{marginLeft: "10px"}} 
                                                        onClick={ () => this.Results(campaign.id, this.state.campaigns)} 
                                                        disabled={this.compare(campaign.campaignStatus,"result")} 
                                                        className="btn btn-info"
                                                     >
                                                     Results 
                                                     </button>
                                                 </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
    
                     </div>
    
                </div>
            )
        }
    }

export default VoterListComponent
