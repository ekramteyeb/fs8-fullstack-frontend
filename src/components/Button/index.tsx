import { Button } from 'react-bootstrap'
type PropType = {
    width?:number,
    className?:string,
    color? : string,
    text: string,
    type?: 'button' | 'submit' |'reset' | undefined,
    onClick?: ()=> void
}
export default function CustomButton({width, color, type,  text, onClick,className}:PropType){
  return (
    <Button 
      className={className}
      onClick={onClick} 
      style={{width:width}} 
      variant={color}
      type={type}
    >
      {text}
    </Button>
  )
}