import React from 'react'
import { Input } from '../ui/input'

const SearchBar = () => {
  return (
    <div className={`flex items-center gap-2`}>
      <Input placeholder='Search post...' />
    </div>
  )
}

export default SearchBar