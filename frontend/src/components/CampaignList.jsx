import React, { Component } from 'react'
import CampaignService from '../services/CampaignService';

class CampaignList extends Component{
    constructor(props) {
        super(props)

        this.state = {
                campaigns: []
        }
        this.addCampaign = this.addCampaign.bind(this);
        this.editCampaign = this.editCampaign.bind(this);
        this.deleteCampaign = this.deleteCampaign.bind(this);
    }

    deleteCampaign(id){
        CampaignService.deleteCampaign(id).then( res => {
            this.setState({campaigns: this.state.campaigns.filter(campaign => campaign.id !== id)});
        });
    }
    
    viewCampaign(id){
        this.props.history.push(`/campaign/${id}`);
    }

    editCampaign(id){
        this.props.history.push(`/add-campaign/${id}`);
    }

    componentDidMount(){
        CampaignService.getCampaigns().then((res) => {
            this.setState({ campaigns: res.data});
        });
    }

    addCampaign(){
        this.props.history.push('/add-campaign/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">CAMPAIGN LIST</h2>
                 <div className="row">
                    <button className="btn btn-primary" onClick={this.addCampaign}> ADD CAMPAIGN</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> CAMPAIGN NAME</th>
                                    <th> CLOSING DATE</th>
                                    <th> CAMPAIGN STATUS</th>
                                    <th> ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.campaigns.map(
                                        campaign => 
                                        <tr key = {campaign.id}>
                                             <td> {campaign.campaignName} </td>   
                                             <td> {campaign.deadline}</td>
                                             <td> {campaign.status}</td>
                                             <td>
                                                 <button onClick={ () => this.editCampaign(campaign.id)} className="btn btn-info">EDIT </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCampaign(campaign.id)} className="btn btn-danger">DELETE </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCampaign(campaign.id)} className="btn btn-info">VIEW </button>
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

export default CampaignList
