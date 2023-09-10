import { createSlice /* ,createAsyncThunk */ } from "@reduxjs/toolkit";
/*  import axios from 'axios' */ 
const initialState = {
  products: [],
  status: null,
  error: null,
};
 /* export const FetchProducts = createAsyncThunk( 
  "products/fetchProducts",
  async({ rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/products ')
      return response?.data
  
} catch (err) {
  // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue('an error occured')
}

    
  } 
)
  console.log(FetchProducts())
 */


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  /* extraReducers: {  
    //fetch products
    [FetchProducts.pending]: (state) => {
      state.status = "pending"
 },
    [FetchProducts.fulfilled]: (state,action) => {
      state.status = "success"
      state.products = action.payload
 },
    [FetchProducts.rejected]: (state,action) => {
      state.status = "rejected"
      state.error = action.payload //action.error.message 
 }
  }  */
});

export default productSlice.reducer;
