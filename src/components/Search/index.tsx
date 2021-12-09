import React from 'react'
import {Form } from 'react-bootstrap'

import './search.scss'

type PropTypes = {
  placeholder: string
  // possible to use (//React.BaseSyntheticEvent;)
  handleChange: (input: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchComponent = ({ handleChange, placeholder }: PropTypes) => {
  //console.log("search component rendering");
  return (
    <Form className="d-flex search">
      <Form.Control
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        className="me-2 search__bar"
        aria-label="Search"
      />
      {/* <Button variant="outline-success">Search</Button> */}
    </Form> 
  )  
}
export default React.memo(SearchComponent)
