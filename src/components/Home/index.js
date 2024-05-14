import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="home-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-des">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <button
            type="button"
            className="home-button"
            onClick={onClickFindJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
