import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { app, facebookProvider, githubProvider, twitterProvider, googleProvider } from '../../firebase';

import joinUs from '../../_img/join-us.jpg';
import './index.css';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  authWithSocialNetwork = (provider) => {
    app.auth().signInWithPopup(provider)
      .then((result, error) => {
        if (error) {
          console.log(error.code, error.message, error.email);
        } else {
          this.setState({ redirect: true })
        }
      })
  }

  authWithEmailPassword(e) {
    e.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchProvidersForEmail(email)
    .then((providers) => {
    if (providers.length === 0) {
      // User doesn't have account, let's create it.
      return app.auth().createUserWithEmailAndPassword(email, password)
    } else if (providers.indexOf("password") === -1) {
      // User signed up with social network
      console.log('Please, try alternative login.');
    } else {
      // Sign in with email/password
      return app.auth().signInWithEmailAndPassword(email, password)
    }
  })
  .then((user) => {
    if (user && user.email) {
      this.loginForm.reset()
      this.setState({ redirect: true })
    }
  })
  .catch((error) => {
    console.log(error.message);
  })
  }

  render () {

    const movieBackdropStyles = {
      backgroundImage: `url(${joinUs})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirect } = this.state

    if (redirect) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div className="Main-wrapper">
        <div className="movie-backdrop" style={movieBackdropStyles}></div>
        <div className="Login-wrapper">
          <h1 className="App-main-title login-form-title">Join us!</h1>
          <div className="login-form-notice">If you don't have an account already, this form will create you one.</div>

          <form className="login-form eiga-form" onSubmit={(event) => this.authWithEmailPassword(event)} ref={(form) => { this.loginForm = form }}>
            <div className="login-form-content">
              <label className="" htmlFor="email">
                Email
              </label>
              <input ref={(input) => {this.emailInput = input}} className="" id="email" name="email" type="email" placeholder="Email"></input>
              <label className="" htmlFor="password">
                Password
              </label>
              <input ref={(input) => {this.passwordInput = input}} className="" id="password" name="password" type="password"  placeholder="Password"></input>
              <input type="submit" className="button login-form-submit" value="Log In"></input>
            </div>
          </form>

          <div className="alternate-login">Or</div>
          <div className="login-social-wrapper">
            <button className="login-social" onClick={() => this.authWithSocialNetwork(facebookProvider)}>
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M30.18 31.93c.97 0 1.75-.78 1.75-1.75V1.82c0-.97-.78-1.75-1.75-1.75H1.82C.85.07.07.85.07 1.82v28.36c0 .97.78 1.75 1.75 1.75h28.36z" fill="#3C5A99"/><path d="M22.05 31.93V19.6h4.15l.62-4.82h-4.77V11.7c0-1.38.4-2.33 2.4-2.33h2.53v-4.3c-.44-.06-1.95-.2-3.7-.2-3.68 0-6.2 2.25-6.2 6.37v3.54h-4.15v4.8h4.16v12.35h4.93z" fill="#FFF"/></svg>
            </button>

            <button className="login-social" onClick={() => this.authWithSocialNetwork(githubProvider)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M15.999.395C7.164.395 0 7.558 0 16.396c0 7.068 4.584 13.065 10.943 15.181.8.147 1.092-.347 1.092-.77 0-.38-.014-1.387-.022-2.722-4.451.967-5.39-2.145-5.39-2.145-.727-1.848-1.776-2.34-1.776-2.34-1.453-.993.11-.973.11-.973 1.605.113 2.45 1.65 2.45 1.65 1.428 2.444 3.745 1.738 4.657 1.328.145-1.034.559-1.739 1.016-2.139-3.553-.404-7.288-1.776-7.288-7.907 0-1.747.623-3.175 1.647-4.294-.165-.405-.714-2.03.156-4.234 0 0 1.344-.43 4.4 1.64a15.36 15.36 0 0 1 4.006-.539c1.359.007 2.728.184 4.006.54 3.054-2.07 4.395-1.64 4.395-1.64.873 2.202.324 3.828.159 4.233 1.026 1.12 1.645 2.547 1.645 4.294 0 6.146-3.741 7.5-7.305 7.895.574.494 1.086 1.47 1.086 2.963 0 2.14-.02 3.864-.02 4.39 0 .427.288.925 1.1.768C27.42 29.455 32 23.462 32 16.396c0-8.838-7.164-16-16.001-16" fill="#FFFFFF" />
              </svg>
            </button>

            <button className="login-social" onClick={() => this.authWithSocialNetwork(twitterProvider)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 26">
                <path d="M32 3.076a13.14 13.14 0 0 1-3.771 1.034A6.584 6.584 0 0 0 31.116.478a13.166 13.166 0 0 1-4.169 1.593 6.557 6.557 0 0 0-4.792-2.073 6.565 6.565 0 0 0-6.565 6.565c0 .514.058 1.015.17 1.496a18.639 18.639 0 0 1-13.532-6.86 6.539 6.539 0 0 0-.889 3.3 6.563 6.563 0 0 0 2.92 5.465 6.532 6.532 0 0 1-2.973-.821l-.001.083a6.568 6.568 0 0 0 5.267 6.437 6.578 6.578 0 0 1-2.965.113 6.571 6.571 0 0 0 6.133 4.559 13.172 13.172 0 0 1-8.154 2.81c-.53 0-1.052-.031-1.566-.091a18.587 18.587 0 0 0 10.064 2.949c12.076 0 18.679-10.004 18.679-18.68 0-.284-.006-.567-.019-.85A13.315 13.315 0 0 0 32 3.077" fill="#55acee" />
              </svg>
            </button>

            <button className="login-social" onClick={() => this.authWithSocialNetwork(googleProvider)}>
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none"><rect fill="#FFF" width="40" height="40" rx="2"/><path d="M28.64 20.2c0-.63-.06-1.25-.16-1.84H20v3.48h4.84c-.2 1.13-.84 2.08-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.87 2.68-6.62z" fill="#4285F4" /><path d="M20 29c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.82.54-1.85.86-3.06.86-2.34 0-4.33-1.58-5.04-3.7h-3v2.32C13.44 26.98 16.48 29 20 29z" fill="#34A853" /><path d="M14.96 21.7c-.18-.53-.28-1.1-.28-1.7 0-.6.1-1.17.28-1.7v-2.34h-3c-.6 1.2-.96 2.6-.96 4.04 0 1.45.35 2.83.96 4.04l3-2.33z" fill="#FBBC05" /><path d="M20 14.58c1.32 0 2.5.45 3.44 1.35l2.58-2.6C24.46 11.9 22.42 11 20 11c-3.52 0-6.56 2.02-8.04 4.96l3 2.33c.7-2.15 2.7-3.73 5.04-3.73z" fill="#EA4335" /></g></svg>
            </button>

          </div>
        </div>
      </div>
    );
  }
}

export default Login;
