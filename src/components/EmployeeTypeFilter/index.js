import './index.css'

// let clicked = false
const EmployeeTypeFilter = props => {
  const {eachType, employee} = props
  const {label, employmentTypeId} = eachType

  const onEmployeeFilterClicked = () => {
    employee(employmentTypeId)
  }

  return (
    <li className="each-employee-list-item">
      <input
        type="checkbox"
        className="checkbox-input"
        id={employmentTypeId}
        onChange={onEmployeeFilterClicked}
        value={employmentTypeId}
      />
      <label className="label-element" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmployeeTypeFilter
