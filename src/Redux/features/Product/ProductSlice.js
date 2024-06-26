import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../../../constants/Status";

const apiUrl = "/api/products";

const initialState = {
  status: "",
  products: [],
  productId:null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductId: (state, action) => {
     
        state.productId = action.payload;
    }
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

//fetching product using build in thunk on toolkit

export const fetchProducts = createAsyncThunk("fetch/prodcuts", async () => {
  const data = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${apiUrl}`).then((res) => res.data);
  return data.data;
});

export const { setProductId } = productSlice.actions;
export default productSlice.reducer;
