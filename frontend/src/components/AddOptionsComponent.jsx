import React, { Component } from 'react'
import OptionService from '../services/OptionService';
import CampaignService from '../services/CampaignService';

class AddOptionsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            optionDesc: ''
        }

        this.changeOptionDescHandler = this.changeOptionDescHandler.bind(this);
        this.saveOrUpdateOptions = this.saveOrUpdateOptions.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            OptionService.getOptionById(this.state.id).then( (res) =>{
                let option = res.data;
                this.setState({optionDesc: option.optionDesc});
            });
        }        
    }

    saveOrUpdateOptions = (e) => {
        e.preventDefault();
        CampaignService.getCampaignById(this.state.id).then( res => {
            this.setState({campaign: res.data});
        })
        let option = {optionDesc: this.state.optionDesc, campaign: this.state.campaign};
        console.log('option => ' + JSON.stringify(option));

        if(this.state.id === '_add'){
            OptionService.createOption(option).then(res =>{
                  this.props.history.push('/campaigns');
            });
        }else{
            OptionService.updateOption(option, this.state.id).then( res => {
                this.props.history.push('/campaigns');
            });
        }
    }
    
    changeOptionDescHandler= (event) => {
        this.setState({campaignName: event.target.value});
    }

    cancel(){
        this.props.history.push('/campaigns');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Option</h3>
        }else{
            return <h3 className="text-center">Update Option</h3>
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
                                            <label> Option: </label>
                                            <input placeholder="Option" name="optionDesc" className="form-control" 
                                                value={this.state.optionDesc} onChange={this.changeOptionDescHandler}/>
                                        </div>
                                      
                                        <button className="btn btn-success" onClick={this.saveOrUpdateOptions}>Save</button>
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

export default AddOptionsComponent