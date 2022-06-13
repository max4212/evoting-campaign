import React, { Component } from 'react' 
import OptionService from '../services/OptionService';
  
class AddOption extends Component { 
     constructor(props) { 
         super(props) 
  
         this.state = {  
             id: this.props.match.params.id, 
             option: ''
         } 
         this.changeOptionHandler = this.changeOptionHandler.bind(this);  
         this.saveOrUpdateOption = this.saveOrUpdateOption.bind(this); 
     } 
   
     componentDidMount(){ 

         if(this.state.id === '_add'){ 
             return 
         }else{ 
             OptionService.getOptionById(this.state.id).then( (res) =>{ 
                 let option = res.data; 
                 this.setState({option: option.option}); 
             }); 
         }         
     } 
     saveOrUpdateOption = (e) => { 
         e.preventDefault(); 
         let option = {option: this.state.option, deadline: this.state.deadline, emailId: this.state.emailId}; 
         console.log('option => ' + JSON.stringify(option)); 
   
         if(this.state.id === '_add'){ 
             OptionService.addOption(option).then(res =>{ 
                 this.props.history.push('/options'); 
             }); 
         }else{ 
             OptionService.editOption(option, this.state.id).then( res => { 
                 this.props.history.push('/options'); 
             }); 
         } 
     } 
      
     changeOptionHandler= (event) => { 
         this.setState({option: event.target.value}); 
     } 
  
     cancel(){ 
         this.props.history.push('/options'); 
     } 
  
     } 
     render() { 
         return ( 
             <div> 
                 <br></br> 
                    <div className = "container"> 
                         <div className = "row"> 
                             <div className = "card col-md-6 offset-md-3 offset-md-3"> 
                                 <div className = "card-body"> 
                                     <form> 
                                         <div className = "form-group"> 
                                             <label> Option: </label> 
                                             <input placeholder="Option" name="option" className="form-control"  
                                                 value={this.state.option} onChange={this.changeOptionHandler}/> 
                                         </div>
                                         <button className="btn btn-success" onClick={this.saveOrUpdateOption}>Save</button> 
                                         <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button> 
                                     </form> 
                                 </div> 
                             </div> 
                         </div> 
  
                    </div> 
             </div> 
         ) 
     } 
 } 
  
 export default AddOption
