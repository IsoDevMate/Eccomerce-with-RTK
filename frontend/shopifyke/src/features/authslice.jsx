import axios from 'axios' 
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";
import  { url } from "./api"

const initialState = { 
  token:localStorage.getItem('token'),
  name:"",
  email:"",
  id:"",
  loginStatus:"",
  loginEror:"",
  registerStatus:"",
  registerEror:"",
  userLoaded:false,
 }
// we are simpl
 export const  FetchUserData = createAsyncThunk(
    'auth/FetchUserData',
     async (values, { rejectWithValue }) => {
        try{
        const { token } = await axios.post(`${url}/register`,
        {
           name:values.name,
           email:values.email,
           password:values.password
        })
        localStorage.setItem('token',token.data)
        return token?.data
      }
     catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
          // by explicitly returning it using the `rejectWithValue()` utility
          console.log(err.response.data)
          return rejectWithValue(err.response.data)
    }
  }
    
  )
 

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    loaduser(state,action){

    //get token from the local storage
    const token= localStorage.getItem('token')  
    //check if token exists and decode it  return it as the new state
    if(token){
      const user = jwt_decode(token)
      return {
        ...state,
        token:token,
        name:user.name,
        email:user.email,
        id:user._id,
        userLoaded:true
      }
    }
  },
  logoutuser(state,action){
    localStorage.removeItem('token')
    return {
      ...state,
      token:null | "",
      name:"",
      email:"",
      id:"",
      loginStatus:"",
      loginEror:"",
      registerStatus:"",
      registerEror:"",
      userLoaded:false
    }
  },
},
  extraReducers: (builder) => {
    builder
    .addCase(FetchUserData.pending, (state) => {
      return { ...state, registerStatus: 'pending' };
    })
    .addCase(FetchUserData.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwt_decode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          id: user._id,
        };
      } else {
        return state;
      }
    })
    .addCase(FetchUserData.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: 'failed',
        registerError: action.payload,
      };
    });
},
}
)

export const { loaduser ,logoutuser } = authSlice.actions;
export default authSlice.reducer