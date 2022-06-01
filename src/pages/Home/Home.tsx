import { useState } from 'react'
import { Pagination } from 'react-bootstrap'
import PageItem from 'react-bootstrap/PageItem'
import DisplayProducts from '../../components/DisplayProducts'
import SearchComponent from '../../components/Search'
import useFetchProducts from '../../hooks/useFetchProducts'

import './style.scss'

export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [desending, setDesending] = useState('')
  const [error, data] = useFetchProducts(search, desending, category)
  let active = 2;
  let items = [];
  if(error){
    setSearch('')
  }
  for (let number = 1; number <= 4; number++) {
    items.push(
      <PageItem key={number} active={number === active}>
        {number}
      </PageItem>
    );
  }
  return (
    <div className='container__products'>
      <div className="jumbotron">
        <h1 className="display-4">For your favorite Mobile Choices!</h1>
      </div>
      <div className="home__search__div">
        <SearchComponent
          handleChange={(e) => setSearch(e.target.value)}
          placeholder="search product"
          
        />
        <>
          <select
            name="cars"
            onChange={(e) => setCategory(e.target.value)} 
            id="category"
            className="form-select form-select-lg mr-4 "
          >
            <option value="">Category</option>
            <option value="mobile">mobile</option>
            <option value="tv">tv</option>
            <option value="tablet">tablet</option>
            
          </select> 
        </>
        
        <>
          <select 
            name="price" 
            onChange={(e) => setDesending(e.target.value)}
            id="price"
            className="form-select form-select-lg"
          >
            <option value="">Price</option>
            <option value="asc">Chepest</option>
            <option value="desc">expensive</option>
          </select>
        </>
      </div>
      <div className="search__result">
        {search || category ? 
          <small>
            {data.length} items met the search criteria
          </small> :
          ''
        }
      </div>
    
      <hr className="home__hl"></hr>
      <DisplayProducts products={data}/> <br/><br/><br/>
      <Pagination size='lg'>{items}</Pagination>
      {(error !== '') ? console.log(error, 'error') : ''}
    </div>
  )
}
