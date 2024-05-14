import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import EmployeeTypeFilter from '../EmployeeTypeFilter'
import SalaryTypeFilter from '../SalaryTypeFilter'
import AllJobs from '../AllJobs'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusValue.initial,
    searchInput: '',
    minimumPackageArr: [],
    search: '',
    employmentArr: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})

    const {search, minimumPackageArr, employmentArr} = this.state
    const employmentType = employmentArr.join(',')
    const minimumPackage = minimumPackageArr.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${search}&employment_type=${employmentType}&minimum_package=${minimumPackage}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        title: eachItem.title,
        rating: eachItem.rating,
      }))
      this.setState({jobsList: updatedData, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-des">
        We Could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length !== 0 ? (
          <ul className="list-container-for-jobs">
            {jobsList.map(eachItem => (
              <AllJobs key={eachItem.id} eachJob={eachItem} />
            ))}
          </ul>
        ) : (
          this.renderNoJobs()
        )}
      </>
    )
  }

  retryButtonClicked = () => {
    this.getJobs()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="error-heading">Oops! Something Went Wrong</h1>
      <p className="error-des">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.retryButtonClicked}
      >
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.success:
        return this.renderJobs()
      case apiStatusValue.inProgress:
        return this.renderLoader()
      case apiStatusValue.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchIconClicked = () => {
    const {searchInput} = this.state
    this.setState({search: searchInput}, this.getJobs)
  }

  selectedEmploymentType = employmentId => {
    const {employmentArr} = this.state

    if (employmentArr.includes(employmentId)) {
      const updatedArr = employmentArr.filter(
        eachItem => eachItem !== employmentId,
      )
      this.setState(
        {
          employmentArr: updatedArr,
        },
        this.getJobs,
      )
    } else {
      this.setState(
        {
          employmentArr: [...employmentArr, employmentId],
        },
        this.getJobs,
      )
    }
  }

  selectedSalaryRange = salaryId => {
    const {minimumPackageArr} = this.state

    if (minimumPackageArr.includes(salaryId)) {
      const updatedSalary = minimumPackageArr.filter(
        eachItem => eachItem !== salaryId,
      )
      this.setState({minimumPackageArr: updatedSalary}, this.getJobs)
    } else {
      this.setState(
        {minimumPackageArr: [...minimumPackageArr, salaryId]},
        this.getJobs,
      )
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="mobile-input-container">
            <input
              type="search"
              className="mobile-search-input"
              placeholder="Search"
              onChange={this.changeSearchInput}
              value={searchInput}
            />
            <button
              type="button"
              className="mobile-search-button"
              data-testid="searchButton"
              onClick={this.searchIconClicked}
            >
              .<BsSearch className="search-icon" />
            </button>
          </div>

          <div className="profile-filters-group-container">
            <Profile />
            <hr className="break-line" />
            <ul className="filters-container">
              <h3 className="filter-heading">Type of Employement</h3>
              {employmentTypesList.map(eachItem => (
                <EmployeeTypeFilter
                  key={eachItem.employmentTypeId}
                  eachType={eachItem}
                  employee={this.selectedEmploymentType}
                />
              ))}
            </ul>
            <hr className="break-line" />
            <ul className="filters-container">
              <h3 className="filter-heading">Salary Range</h3>
              {salaryRangesList.map(eachItem => (
                <SalaryTypeFilter
                  key={eachItem.salaryRangeId}
                  eachSalary={eachItem}
                  salary={this.selectedSalaryRange}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-details-container">
            <div className="desktop-input-container">
              <input
                type="search"
                className="mobile-search-input"
                placeholder="Search"
                onChange={this.changeSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                className="mobile-search-button"
                data-testid="searchButton"
                onClick={this.searchIconClicked}
              >
                .<BsSearch className="search-icon" />
              </button>
            </div>
            <div className="job-list-container">{this.renderViews()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
