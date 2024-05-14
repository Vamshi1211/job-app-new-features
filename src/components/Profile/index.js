import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Profile extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-details-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  retryButtonClicked = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <button
      type="button"
      className="retry-button"
      onClick={this.retryButtonClicked}
    >
      Retry
    </button>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.success:
        return this.renderProfile()
      case apiStatusValue.inProgress:
        return this.renderLoading()
      case apiStatusValue.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-container">{this.renderViews()}</div>
  }
}

export default Profile
