import React, { Component, useState } from 'react'
import OptionService from '../services/OptionService'

class OptionsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                options: []
        }

        this.changeOptionDescHandler = this.changeOptionDescHandler.bind(this);
        this.addOption = this.addOption.bind(this);
        this.deleteOption = this.deleteOption.bind(this);
        this.saveOptions = this.saveOptions.bind(this)
    }
	
	componentDidMount(){
        OptionService.getOptionsByCampaign().then((res) => {
            this.setState({ options: res.data});
        });
    }
	
	saveOptions = (e) => {
        e.preventDefault();
        OptionService.getOptionById(this.state.id).then( res => {
            this.setState({option: res.data});
        })
        let option = {optionDesc: this.state.optionDesc, option: this.state.option};
        console.log('option => ' + JSON.stringify(option));

        OptionService.createOption(option).then(res =>{
                this.props.history.push('/options');
        });
        OptionService.updateOption(option, this.state.id).then( res => {
            this.props.history.push('/options');
        });
    
    }
	
	changeOptionDescHandler= (event) => {
        this.setState({optionName: event.target.value});
    }

    addOption(){
        
    }

    deleteOption(id){
        OptionService.deleteOption(id).then( res => {
            this.setState({options: this.state.options.filter(option => option.id !== id)});
        });
    }
/*
    handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }
*/


    cancel(){
        this.props.history.push('/options');
    }

	render() {
        return (
            <div>
				<div className = "row">
					<table className = "table table-striped table-bordered">
						<thead>
							<tr>
								<th> Options</th>
								<th> </th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.options.map
								(
									option => 
									<tr key = {option.id}>
										<td><input placeholder="Option" name="optionDesc" className="form-control" value={option.optionDesc} onChange={this.changeOptionDescHandler}/> </td>
										<td>
											<button onClick={ () => {  }} className="btn btn-info"> Add</button>
											<button style={{marginLeft: "10px"}} onClick={ () => {if(window.confirm('Confirm to Delete?'))this.deleteOption(option.id)}} className="btn btn-danger"> Delete</button>
										</td>
									</tr>
								)
							}
							<tr>
								<button className="btn btn-success" onClick={this.saveOptions}>Save</button>
								<button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
							</tr>
						</tbody>
					</table>
                 </div>
            </div>
        )
    }
}
export default OptionsComponent
