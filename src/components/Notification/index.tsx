import './style.scss'

type PropTypes ={
    message:string,
    color:boolean
}

export default function Notification({message, color} : PropTypes){
  return(
    <div className="notify" style={{
      backgroundColor : color ? 'green' : '#EC0B2F'
    }} >
      {message}
    </div>
  )
}