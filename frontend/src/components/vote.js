import React from "react";
import OptionService from "../services/OptionService";
import CampaignService from "../services/CampaignService";
class vote extends React.Component
{  
  constructor(props)
    {
        super(props)
        this.state={id: this.props.match.params.id, choice:"" , campaign:[], options:[],currentDate : new Date(), alert:""}
    }

    componentDidMount()
    {
        CampaignService.getCampaignById(this.state.id).then((response)=>{this.setState({campaign:response.data})
    });
        OptionService.getOptionsByCampaign(this.state.id).then((response)=>{this.setState({options:response.data})
    });
    }

  update(status)
  {
    if(status==="Open")
    {
      this.state.alert =""
      OptionService.updateVote(this.state.id,this.state.choice)
    }
    else
    {
      this.state.alert = "The campaign has been closed, please exit to see results"
    }
  } 

  compare()
  {
    var date =
                ("00" + (this.state.currentDate.getMonth() + 1)).slice(-2)
                + "/" + ("00" + this.state.currentDate.getDate()).slice(-2)
                + "/" + this.state.currentDate.getFullYear() + " "
                + ("00" + this.state.currentDate.getHours()).slice(-2) + ":"
                + ("00" + this.state.currentDate.getMinutes()).slice(-2)
                + ":" + ("00" + this.state.currentDate.getSeconds()).slice(-2);
  } 

  setter(event) 
  {
   this.setState({choice:event.target.value})
}

back(){
  this.props.history.push('/voter-list/1');
}
render() {

  return (     
    <div>
      <button className="btn btn-danger" onClick={this.back.bind(this)} style={{marginTop: "10px",width: "100px"}}>Back</button>
      <h1 className="text-center">
      {this.state.campaign.campaignName}
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
      <br></br><button className="btn" onClick={this.update(this.state.campaign.campaignStatus)}>Submit</button>
      <p className="text-center">{this.state.alert}</p>
      </body>
      </div>
    )
    
   
}

}  
export default vote;