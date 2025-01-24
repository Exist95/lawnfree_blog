import React from 'react'
import { Input } from '../ui/input'
export interface ISearchBarProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchBar = ({ search, setSearch }: ISearchBarProps) => {
  return (
    <div className={`flex items-center w-full gap-2`}>
      <Input placeholder='Search post...' value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}

export default SearchBar