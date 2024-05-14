import './index.css'

const SalaryTypeFilter = props => {
  const {eachSalary, salary} = props
  const {salaryRangeId, label} = eachSalary

  const onChangeSalary = () => {
    salary(salaryRangeId)
  }

  return (
    <li className="each-employee-list-item">
      <input
        type="checkbox"
        className="checkbox-input"
        id={salaryRangeId}
        onChange={onChangeSalary}
        value={salaryRangeId}
      />
      <label className="label-element" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryTypeFilter
