import React, { Component } from 'react'
import UserService from '../services/UserService'

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {}
        }
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( res => {
            this.setState({user: res.data});
        })
    }

    back(){
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View User Details</h3>   
                    <button className="btn btn-danger" onClick={this.back.bind(this)} style={{marginLeft: "10px",width: "100px"}}>Back</button>
                    <div className = "card-body">
                        <div className = "row">
                            <label> User Name: </label>
                            <div style={{marginLeft: "10px"}}> { this.state.user.userName }</div>
                        </div>
                        <div className = "row">
                            <label> Password: </label>
                            <div style={{marginLeft: "10px"}}> { this.state.user.userPW }</div>
                        </div>
                        <div className = "row">
                            <label> Email Address: </label>
                            <div style={{marginLeft: "10px"}}> { this.state.user.email }</div>
                        </div>
                        <div className = "row">
                            <label> User Type: </label>
                            <div style={{marginLeft: "10px"}}> { this.state.user.userType }</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ViewUserComponent
