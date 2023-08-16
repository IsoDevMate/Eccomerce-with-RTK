
import { useGetProductsByNameQuery } from "../features/productAPIS"
export const Home = () => {
  const { data, error/* isFetching, isLoading */ }= useGetProductsByNameQuery('')
  console.log(data)
  console.log(error)


  return (
    <div>home</div>
  )
}

