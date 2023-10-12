 //if you use create async thunk
import { useDispatch,useSelector } from "react-redux"
import { useGetProductsByNameQuery } from "../features/productAPIS"
import   addToCart   from "../features/cartSlice"
import { useNavigate } from "react-router-dom"

export const Home = () => {
 const { items:products,status } = useSelector((state) => state.products)  
  const { data, error, isLoading  }= useGetProductsByNameQuery()
  console.log("Api", isLoading);
  
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
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button handleClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
}

