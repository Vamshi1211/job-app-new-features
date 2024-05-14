import {Link, withRouter} from 'react-router-dom'
import {FaHome, FaBriefcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-mobile-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="nav-image"
        />
        <div className="mobile-icons-container">
          <Link to="/" className="icon-link-item">
            <FaHome className="home-icon" />
          </Link>
          <Link to="/jobs" className="icon-link-item">
            <FaBriefcase className="home-icon" />
          </Link>
          <button type="button" className="button" onClick={onLogout}>
            <FiLogOut className="home-icon" />.
          </button>
        </div>
      </div>

      <div className="navbar-website-container">
        <div className="nav-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website-logo"
            className="nav-image"
          />
        </div>
        <div className="nav-info-container">
          <Link to="/" className="nav-link">
            <p className="nav-item">Home</p>
          </Link>
          <Link to="/jobs" className="nav-link">
            <p className="nav-item">Jobs</p>
          </Link>
        </div>
        <button className="logout-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
