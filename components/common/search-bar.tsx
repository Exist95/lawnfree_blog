import React from 'react'
import { Input } from '../ui/input'
import { ISearchBarProps } from '@/types/search-bar'

const SearchBar = ({ search, setSearch }: ISearchBarProps) => {
  return (
    <div className={`flex items-center w-full gap-2`}>
      <Input placeholder='Search post...' value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}

export default SearchBar