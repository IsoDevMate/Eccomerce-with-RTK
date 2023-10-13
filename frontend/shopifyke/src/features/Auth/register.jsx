import { useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
//import fetchuserdata  
import { FetchUserData } from "../authslice";
import authSlice from "../authslice";
import RegisterForm from"./registerstyle"
import { useNavigate } from "react-router-dom";




    const Register = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const auth = useSelector((state) => state.auth);
      const registerStatus = auth && auth.registerStatus;
      const registerError = auth && auth.registerError;

      useEffect(() => {
        if (auth && auth._id) {
          navigate("/cart");
        }
      }, [auth, navigate]);

      console.log(registerStatus);
      console.log(registerError);
      console.log(authSlice);

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

            <button type="submit">
                 {registerStatus === "pending" ? "Submitting..." : "Register"}
            </button>
            {registerStatus === "rejected" ? (
              <p>{registerError}</p>
            ) : null}
            
            </form>
        </div>
      )
    
            }
    export default Register

  