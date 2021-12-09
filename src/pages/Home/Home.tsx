import { Container, Pagination } from 'react-bootstrap'
import PageItem from 'react-bootstrap/PageItem'
import { useSelector } from 'react-redux'
import DisplayProducts from '../../components/DisplayProducts'
import useFetchProducts from '../../hooks/useFetchProducts'

import './style.scss'
export default function Home() {
  const state = useSelector(state => state)
  console.log(state, 'state from home')

  const [error, data] = useFetchProducts('',true, '')
  let active = 2;
  let items = [];
  for (let number = 1; number <= 10; number++) {
    items.push(
      <PageItem key={number} active={number === active}>
        {number}
      </PageItem>,
    );
  }
  return (
    <Container fluid className='container__products'>
      <DisplayProducts products={data} /> <br/><br/><br/>
      <Pagination size='lg'>{items}</Pagination>
      {/* {
        data.map((product:ProductType) => <Product product={product} handleAdd={handleAddCart} />)
      } */}
      {(error !== '') ? console.log(error, 'error') : ''}
    </Container>
  )
}
