import { useState } from "react"
import {  Offcanvas } from "react-bootstrap"
import Cart from "../Cart"
import FavoriteProduct from "./product"

export default function OffCanvasFavorite({data}:any) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      
      <Cart 
        onClick={handleShow}
        items={data.length}
        element = {<i className="bi bi-heart"></i>}
      />
  
      <Offcanvas className="offcanvas__favorite" show={show} placement={"end"} onHide={handleClose} /* {...data} */>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title >Your Favorites {data.length}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FavoriteProduct />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}