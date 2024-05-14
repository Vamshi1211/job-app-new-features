import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const AllJobs = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <li className="each-job-item-container">
      <Link to={`jobs/${id}`} className="job-link-item">
        <div className="logo-and-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title-heading">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-internship-package">
          <div className="location-internship">
            <div className="location-internship-container">
              <IoLocationSharp className="icon" />
              <p className="name">{location}</p>
            </div>
            <div className="location-internship-container">
              <BsFillBriefcaseFill className="icon" />
              <p className="name">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="break-line" />
        <div className="description-container">
          <p className="description-heading">Description</p>
          <p className="description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default AllJobs
