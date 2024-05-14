import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', onSubmitError: false, errMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({onSubmitError: true, errMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  userPassword = () => {
    const {password} = this.state

    return (
      <div className="password-container">
        <label htmlFor="userInputId" className="label-text">
          PASSWORD
        </label>
        <input
          type="password"
          className="user-input"
          id="userInputId"
          placeholder="Password"
          onChange={this.passwordChange}
          value={password}
        />
      </div>
    )
  }

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  usernameInput = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label htmlFor="userInputId" className="label-text">
          USERNAME
        </label>
        <input
          className="user-input"
          id="userInputId"
          placeholder="Username"
          onChange={this.usernameChange}
          value={username}
        />
      </div>
    )
  }

  render() {
    const {onSubmitError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onFormSubmit}>
            {this.usernameInput()}
            {this.userPassword()}
            <button type="submit" className="login-button">
              Login
            </button>
            {onSubmitError && <p className="error-msg">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
