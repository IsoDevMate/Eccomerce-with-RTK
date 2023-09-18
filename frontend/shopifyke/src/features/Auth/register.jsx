import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { FetchUserData } from "./authSlice"
import authslice from "../authslice"
const Register = () => {

    const dispatch=useDispatch()
    //set the state of the user
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const {registerStatus,registerError}=useSelector(state=>state.auth)
    console.log(registerStatus)
    console.log(registerError)
    console.log(authslice)
    //handle submit
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(FetchUserData (user))
    }
  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text" 
            placeholder="name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input 
            type="email"
             placeholder="email"
             onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            <input 
            type="password" 
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
             />
            <input
             type="password"
              placeholder="confirm password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
               />
            <button type="submit">Register</button>
        
        </form>
    </div>
  )
}

export default Register