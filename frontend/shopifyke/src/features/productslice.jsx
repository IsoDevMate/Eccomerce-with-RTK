import { CreateSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: null,
};
const productSlice = CreateSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
