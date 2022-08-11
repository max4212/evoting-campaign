import React from "react";
import OptionService from "../services/OptionService";
import CampaignService from "../services/CampaignService";
import VoterService from '../services/VoterService'
class voteComponent extends React.Component
{  
  constructor(props)
    {
        super(props)
        this.state={
          choice:"" , campaign:[], options:[],alert:"",voter:[]
        }
    }

    componentDidMount()
    {
      const userid = localStorage.getItem("inputValue");
      const id = localStorage.getItem("campaign");
        CampaignService.getCampaignById(id).then((response)=>{this.setState({campaign:response.data})
    });
        OptionService.getOptionsByCampaign(id).then((response)=>{this.setState({options:response.data})
    });
        VoterService.getVoter(userid,id).then((res) => { this.setState({ voter: res.data});
    });
    }

    title(campaign)
    {
      if(typeof(campaign)==="string"){
      if(campaign.startsWith("http"))
      {
        return <a href={campaign}>
        <img src={campaign} alt ={campaign} height="200px" width="200px"/>
        </a>
      }else
      {
        return <h1 className="text-center">
          {campaign}
          </h1>
      }
    }
    }

  update()
  {
    const userid = localStorage.getItem("inputValue");
    const id = localStorage.getItem("campaign");
    if(this.state.campaign.campaignStatus === "Pending"){
      for(var i of this.state.voter){ 
        if(i.voteStatus !== 'Voted'){
         if(this.state.choice !==""){
          OptionService.updateVote(id,this.state.choice);
          VoterService.voted(userid,id);
          this.props.navigate("/voters");
          localStorage.removeItem("campaign");
         }
     }else{
      this.setState({ alert: "You have voted"})};
      this.props.navigate("/voters");
      localStorage.removeItem("campaign");
    }
  }else{
    this.setState({ alert: "This poll has closed"})
    this.props.navigate("/voters");
    localStorage.removeItem("campaign");
  }
  } 

  setter(event) 
  {
   this.setState({choice:event.target.value})
   console.log(this.state.choice)
 }

back(){
  this.props.navigate('/voters');
}

render() {
  return (     
    <div>
      <button className="btn btn-danger" onClick={this.back.bind(this)} style={{marginTop: "10px",width: "100px"}}>Back</button>
      <h1 className="text-center">
      {this.title(this.state.campaign.campaignName)}
      </h1>
      <body className="text-center">
      {
        this.state.options.map((item) => 
        <p key={item}>
        <input 
        type="radio"
        name="option"
        value={item.optionDesc} 
        onClick={this.setter.bind(this)}/> {item.optionDesc} 
        </p>
        )}
      <br></br><button className="btn btn-info" onClick={() => this.update()}>Submit</button>
      <p className="text-center">{this.state.alert}</p>
      </body>
      </div>
    )
    
   
}

}  
export default voteComponent;