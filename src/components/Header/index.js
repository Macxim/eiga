import React, { Component } from 'react';
import logo from '../../_img/eiga.svg';
import logoKanji from '../../_img/eiga_kanji.svg';
import SearchBar from '../../components/SearchBar';
import UserMenu from '../../components/UserMenu';
import { Link } from 'react-router-dom';


import './index.css';

class Header extends Component {

  constructor() {
    super()
    this.state = {
      userMenuOpen: false
    }
  }

  toggleUserMenu = () => {
    this.setState({
      userMenuOpen: !this.state.userMenuOpen
    })
  }

  render () {

    return (
      <div className="App-header">
        <div className="App-logo">
          <a className="App-header-title" href="/"><img src={logo} alt="Eiga"/></a>
          <a className="App-header-title-kanji" href="/"><img src={logoKanji} alt="Eiga in Kanji"/></a>
        </div>
        <SearchBar />
        {this.props.authenticated
          ? (
            <div className="user-wrapper">
              {this.props.user.photoURL
              ? (
              <img onClick={this.toggleUserMenu} className="user-wrapper-avatar" src={this.props.user.photoURL} alt={this.props.user.displayName} width="48" height="48" />
              )
              : (
                <svg onClick={this.toggleUserMenu} className="user-wrapper-avatar" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="-949 951 100 125"><path fill="#FFF" d="M-899 953.5c-26.2 0-47.5 21.3-47.5 47.5s21.3 47.5 47.5 47.5 47.5-21.3 47.5-47.5-21.3-47.5-47.5-47.5zm28.2 73.2c-1.4-2.5-3.6-4.6-6.5-5.7l-9.9-4.3c-2.6-1-4.4-3.5-4.6-6.3l-.2-1.8c4.6-3.5 7.7-10.3 7.7-17.5 0-10.4-6.6-17.6-14.7-17.6s-14.7 7.2-14.7 17.6c0 7.2 3.1 13.9 7.7 17.5l-.2 1.8c-.2 2.8-2 5.2-4.6 6.3l-9.9 4.3c-2.8 1.1-5.1 3.2-6.5 5.7-6.2-6.8-10-15.8-10-25.7 0-21 17.1-38.1 38.1-38.1S-861 980-861 1001c.1 9.9-3.7 18.9-9.8 25.7z"/></svg>
              )
              }
              {this.props.user.displayName
              ? (
              <UserMenu
                username={this.props.user.displayName}
                isOpen={this.state.userMenuOpen} />
              )
              : (
              <UserMenu
                username={this.props.user.email}
                isOpen={this.state.userMenuOpen} />
              )
              }
            </div>
          )
          : (
            <div className="login-tickets-wrapper">
              <Link className="" to="/login">
              <svg className="login-tickets" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125"><path d="M40.928 34.477H17.581l72.041-16.85.773 3.308c-2.775.798-4.469 3.635-3.804 6.478s3.441 4.635 6.282 4.119l.698 2.986c-2.774.798-4.469 3.635-3.804 6.478.666 2.843 3.441 4.634 6.281 4.119l.699 2.985c-2.775.798-4.469 3.635-3.804 6.478s3.441 4.635 6.282 4.119l.775 3.306-12.33 2.884v-2.068l-2.206-.111c-1.667-.084-2.972-1.454-2.972-3.12s1.305-3.037 2.972-3.121l2.206-.11V48.87l-1.889-.095-1.404-6.002c.336-.145.701-.236 1.087-.255l2.206-.111v-7.93h-5.232l-.427-1.822c-.289.119-.591.217-.904.29-3.146.736-6.294-1.218-7.03-4.365-.145-.615-.184-1.229-.134-1.825l-33.015 7.722zm39.24 11.161c0 2.919 2.295 5.296 5.18 5.441v3.066c-2.885.145-5.18 2.521-5.18 5.441 0 2.919 2.295 5.296 5.18 5.44v3.066c-2.885.145-5.18 2.521-5.18 5.441 0 2.919 2.295 5.296 5.18 5.441v3.396H0v-3.396c2.883-.146 5.179-2.522 5.179-5.441 0-2.92-2.295-5.297-5.179-5.441v-3.066c2.883-.145 5.179-2.521 5.179-5.44 0-2.92-2.295-5.297-5.179-5.441v-3.066c2.883-.145 5.179-2.521 5.179-5.441S2.883 40.342 0 40.197V36.8h85.348v3.397c-2.885.145-5.18 2.522-5.18 5.441zm-5.653 4.061c-.308.05-.624.077-.946.077-3.232 0-5.853-2.62-5.853-5.852 0-.631.101-1.238.286-1.807H17.523c.07.362.108.736.108 1.119 0 3.231-2.62 5.852-5.852 5.852-.323 0-.639-.027-.947-.078v20.464c.309-.051.625-.078.947-.078 3.231 0 5.852 2.62 5.852 5.853 0 .631-.101 1.237-.286 1.807h50.479c-.07-.362-.108-.735-.108-1.118 0-3.232 2.62-5.852 5.853-5.852.322 0 .639.027.946.077V49.699zM48.25 61.844l8.107-3.794v15.324L48.25 69.58v2.996H30.611v-13.95c-2.176-1.007-3.686-3.209-3.686-5.765 0-3.506 2.842-6.348 6.349-6.348 2.919 0 5.377 1.97 6.119 4.654.742-2.684 3.2-4.654 6.12-4.654 3.506 0 6.348 2.842 6.348 6.348 0 2.526-1.475 4.707-3.611 5.729v3.254zm-14.976-4.295c2.588 0 4.687-2.099 4.687-4.688 0-2.588-2.099-4.687-4.687-4.687s-4.687 2.099-4.687 4.687c0 2.589 2.099 4.688 4.687 4.688zm9.434 1.01c-1.607-.793-2.83-2.244-3.315-4.002-.486 1.758-1.708 3.209-3.314 4.002h6.629zm7.491-5.698c0-2.588-2.098-4.687-4.687-4.687s-4.688 2.099-4.688 4.687c0 2.589 2.099 4.688 4.688 4.688s4.687-2.099 4.687-4.688zm-16.925-2.463c-1.361 0-2.464 1.103-2.464 2.463s1.103 2.464 2.464 2.464c1.36 0 2.463-1.104 2.463-2.464s-1.103-2.463-2.463-2.463zm12.238 0c-1.36 0-2.464 1.103-2.464 2.463s1.104 2.464 2.464 2.464 2.463-1.104 2.463-2.464-1.102-2.463-2.463-2.463z"/></svg>
                <span className="login-tickets-label">Register / Log in</span>
              </Link>
            </div>
          )
        }
      </div>
    );
  }
}

export default Header;
