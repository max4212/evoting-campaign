import React, { Component } from "react";
import CampaignService from "../services/CampaignService";
// import { campaigns } from '../dummyData';
import { connect } from "react-redux";

class ListCampaignComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campaigns: [],
    };

    this.addCampaign = this.addCampaign.bind(this);
    this.deleteCampaign = this.deleteCampaign.bind(this);
  }

  deleteCampaign(id) {
    CampaignService.deleteCampaign(id).then((res) => {
      this.setState({
        campaigns: this.state.campaigns.filter(
          (campaign) => campaign.id !== id
        ),
      });
    });
  }

  viewCampaign(campaign) {
    // this.props.history.push(`/view-campaign/${id}`);
    this.props.navigate("/campaignDetails", { state: { campaign: campaign } });
  }

  launchCampaign(id) {
    CampaignService.launchCampaign(id);
  }

  Results(id){
    localStorage.setItem("campaign",id);
    this.props.navigate("/Resultpage");
  }

  componentDidMount() {
    console.log(localStorage.getItem("inputValue"));
    const userid = localStorage.getItem("inputValue");
    console.log(this.props.user.id);
    const userId = this.props.user.id;
    CampaignService.getCampaignsByUser(userid).then((res) => {
      this.setState({ campaigns: res.data });
    });
  }

  addCampaign() {
    this.props.navigate("/newCampaignForm");
    // this.props.history.push('/add-campaign/_add');
  }

  addOption() {
    this.props.history.push("/options");
  }

  compare(status,type)
  {
    if(type==="launch")
    {
      if(status==="Open")
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
    }else if(type==="delete")
    {
      if(status==="Open")
      {
      return ''
      }
      else 
      {
      return 'false'
      }
    }
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Campaigns List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addCampaign}>
            {" "}
            Add Campaign
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Campaign Name</th>
                <th> Closing Date</th>
                <th> Campaign Status</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* this.state.campaigns.map( */}
              {this.state.campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td> {campaign.campaignName} </td>
                  <td> {campaign.deadline}</td>
                  <td> {campaign.campaignStatus}</td>
                  <td>
                    <button
                      onClick={() => this.viewCampaign(campaign)}
                      className="btn btn-info"
                    >
                      View{" "}
                    </button>
                    {/* <button onClick={() => this.props.navigate('/campaignDetails', { state: {campaign} })} className="btn btn-info">View </button> */}
                    <button 
                      style={{ marginLeft: "10px" }}
                      className="btn btn-info"
                      onClick={ () => this.launchCampaign(campaign.id, this.state.campaigns)} 
                      id="launchBtn"
                      disabled={this.compare(campaign.campaignStatus,"launch")}
                    >
                      Launch{" "}
                    </button>
                    <button style={{marginLeft: "10px"}} 
                      onClick={ () => this.Results(campaign.id, this.state.campaigns)} 
                      disabled={this.compare(campaign.campaignStatus,"result")} 
                      className="btn btn-info"
                    >
                      Results{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => {if (window.confirm("Confirm to Delete?"))this.deleteCampaign(campaign.id);}}
                      className="btn btn-danger"
                      disabled={this.compare(campaign.campaignStatus,"delete")}
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.user;
};

export default connect(mapStateToProps)(ListCampaignComponent);
