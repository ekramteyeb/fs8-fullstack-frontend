import { Image } from 'react-bootstrap'

type PropType = {
    width?:string,
    height?:string,
    src : string,
    alt? : string

}
export default function CustomImage({width,height,src, alt, ...props}:PropType){
  return (
    <>
      <Image 
        src={src} 
        style={{width:width, height:height}} 
        alt={alt} 
        {...props} />
    </>
  )
}

