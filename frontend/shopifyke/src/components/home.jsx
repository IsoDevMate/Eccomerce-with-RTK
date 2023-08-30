/* import { UseSelector } from "react-redux/es/hooks/useSelector" */ //if you use create async thunk
import { useDispatch } from "react-redux"
import { useGetProductsByNameQuery } from "../features/productAPIS"
import  { addToCart }  from "../features/cartSlice"
import { useNavigate } from "react-router-dom"

export const Home = () => {
/*   const { products,status } = UseSelector((state) => state.product) */
  const { data, error,/* isFetching,*/ isLoading  }= useGetProductsByNameQuery()
  const dispatch=useDispatch()
const navigate=useNavigate()

  const handleClick=(product)=>{
    dispatch(addToCart(product))
    navigate('/cart')
  }
  console.log(data)
  console.log(error)

  return (    
    <div className="container">
      {isLoading ? (<h1>Loading...</h1> ): error ? (<h1>An Error Occurred.</h1>) : 
      <>
      <h3>NEW Products</h3>
      <div className="products"></div>
      {data?.map(product =>(<div key={product.id} className="product">
        
        <h3>{product.name}</h3>
       {  <img src={product.Image} alt={product.name} /> }
       <div className="details">
         <span>{product.description}</span>
         <span className="price">{product.price}</span>
       </div>
          <button onClick={handleClick}>ADD TO CART{product.price}</button>
        </div>)      
      )}
        </>
     }
    </div>
    
    
    
  )
}

