import React, { Component } from 'react'
import OptionService from '../services/OptionService';
import CampaignService from '../services/CampaignService';

class OptionsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: ['']
        }
        this.addOptionsHandler = this.addOptionsHandler.bind(this);
        this.removeOptionsHandler = this.removeOptionsHandler.bind(this);
        this.changeOptionDescHandler = this.changeOptionDescHandler.bind(this);
        this.saveOrUpdateOptions = this.saveOrUpdateOptions.bind(this);
    }

    componentDidMount(){
        OptionService.getOptionsByCampaign().then((res) => {
            this.setState({ options: res.data});
        });
    }

    addOptionsHandler = (event) => {

    }

    removeOptionsHandler = (event) => {

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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">{ ' < ' + this.state.campaign.campaignName + ' > '} Options</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                        {
                                            this.state.options.map(
                                                option => 
                                                <tr key = {option.id}>
                                                    <td> 
                                                        <input placeholder="Option" name="optionDesc" className="form-control" 
                                                        value={option.optionDesc} onChange={this.changeOptionDescHandler}/>
                                                    </td>
                                                </tr>
                                            )
                                        }
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

export default OptionsComponent