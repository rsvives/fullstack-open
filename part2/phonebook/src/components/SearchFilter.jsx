import React from 'react'

const SearchFilter = ({ filterName, handleNameFilter }) => {
  return (
    <>
      <h2>Look for someone</h2>
      <label htmlFor="filter-name">Show people named: </label>
      <input
        id="filter-name"
        type="text"
        placeholder="Search..."
        value={filterName}
        onChange={handleNameFilter}
      />
    </>
  )
}

export default SearchFilter
