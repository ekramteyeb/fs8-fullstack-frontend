import './style.scss'

type Props = {
  items: number
  onClick?: (input: React.BaseSyntheticEvent) => void
  element : any
}

export default function Cart({ items, element, onClick }: Props) {
  return (
    <div className="cart__wrapper">
      <div 
        role="button" 
        tabIndex={0} 
        onKeyPress={
          () => alert('me')} 
        onClick={onClick}>
        {element}
      </div>
      <span > {items} </span>
    </div>
  )
}
