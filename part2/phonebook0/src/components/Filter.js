import React from 'react'

const Filter = ({keyword, handleKeywordChange}) => {
  return (
    <div>
      filter show with <input value={keyword} onChange={handleKeywordChange}/>
    </div>
  )
}

export default Filter