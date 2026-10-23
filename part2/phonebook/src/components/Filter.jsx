const Filter = ({ value, onSearch }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onSearch} />
    </div>
  )
}

export default Filter
