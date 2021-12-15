import { useState } from 'react'
import { Container, Pagination } from 'react-bootstrap'
import PageItem from 'react-bootstrap/PageItem'
import { useSelector } from 'react-redux'
import DisplayProducts from '../../components/DisplayProducts'
import SearchComponent from '../../components/Search'
import useFetchProducts from '../../hooks/useFetchProducts'

import './style.scss'
export default function Home() {
  const state = useSelector(state => state)
  console.log(state, 'state from home')

  const [search, setSearch] = useState('')
  const [error, data] = useFetchProducts(search,true, '')
  let active = 2;
  let items = [];
  if(error){
    setSearch('')
  }
  for (let number = 1; number <= 10; number++) {
    items.push(
      <PageItem key={number} active={number === active}>
        {number}
      </PageItem>,
    );
  }
  return (
    <Container fluid className='container__products'>
      <SearchComponent
        handleChange={(e) => setSearch(e.target.value)}
        placeholder="search product"
      />
      <DisplayProducts products={data} /> <br/><br/><br/>
      <Pagination size='lg'>{items}</Pagination>
      {(error !== '') ? console.log(error, 'error') : ''}
    </Container>
  )
}
