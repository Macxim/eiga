import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { app } from '../../firebase'

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    app.auth().signOut().then((user, error) => {
      this.setState({ redirect: true })
    });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />
    }

    return null
  }
}

export default Logout
