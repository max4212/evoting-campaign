import React, { Component } from 'react'
import CampaignService from '../services/CampaignService'

class ListCampaignComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                campaigns: []
        }
        
        this.addCampaign = this.addCampaign.bind(this);
        this.addOption = this.addOption.bind(this);
        this.editCampaign = this.editCampaign.bind(this);
        this.deleteCampaign = this.deleteCampaign.bind(this);
    }

    deleteCampaign(id){
        CampaignService.deleteCampaign(id).then( res => {
            this.setState({campaigns: this.state.campaigns.filter(campaign => campaign.id !== id)});
        });
    }
    
    viewCampaign(id){
        this.props.history.push(`/view-campaign/${id}`);
    }

    editCampaign(id){
        this.props.history.push(`/add-campaign/${id}`);
    }

    launchCampaign(id){
        CampaignService.launchCampaign(id).then( res => {
            this.setState({campaigns: this.state.campaigns.filter(campaign => campaign.id !== id)});
        });
    }

    componentDidMount(){
        CampaignService.getCampaigns().then((res) => {
            this.setState({ campaigns: res.data});
        });
    }

    addCampaign(){
        this.props.history.push('/add-campaign/_add');
    }
    
    addOption(){
        this.props.history.push('/add-option/_add');
    }
    
    render() {
        return (
            <div>
                 <h2 className="text-center">Campaigns List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addCampaign}> Add Campaign</button>
                 </div>
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
                                                 <button onClick={ () => this.viewCampaign(campaign.id)} className="btn btn-info">View </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.addOption(campaign.id)} className="btn btn-info">Options </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.editCampaign(campaign.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.launchCampaign(campaign.id)} className="btn btn-info">Launch </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewResults(campaign.id)} className="btn btn-info">Results </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCampaign(campaign.id)} className="btn btn-danger">Delete </button>
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

export default ListCampaignComponent
