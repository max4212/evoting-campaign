import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/" className="navbar-brand">E-Voting App</a></div>
                    <div><a href="/users" className="navbar-brand">Users</a></div>
                    <div><a href="/voter-list/1" className="navbar-brand">Voter</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
