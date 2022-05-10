import React from 'react'
import {Form } from 'react-bootstrap'

import './search.scss'

type PropTypes = {
  placeholder: string
  // possible to use (//React.BaseSyntheticEvent;)
  handleChange: (input: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchComponent = ({ handleChange, placeholder }: PropTypes) => {
  return (
    <Form className="d-flex col-4 search">
      <Form.Control
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        className="me-2 search__bar"
        aria-label="Search"
      />
    </Form> 
  )  
}
export default React.memo(SearchComponent)
