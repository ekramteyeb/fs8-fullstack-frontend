//import { BiCart } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import './style.scss'
type Props = {
  items: number
  handleClick?: (input: React.BaseSyntheticEvent) => void
  element : any
}
export default function Cart({ items, element }: Props) {
  return (
    <div className="cart__wrapper">
      <Link to="/products">
        {element}
      </Link>
      <span> {items} </span>
    </div>
  )
}
