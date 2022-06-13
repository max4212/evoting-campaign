import React, { Component } from 'react'

export default class HostHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

  render() {
    return (
      <div>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div><a href='/'/>You're Logged In As A Campaign Host</div>
            </nav>
        </header>
      </div>
    )
  }
}
