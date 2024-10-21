import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
  };

  
  export const addNewProduct = createAsyncThunk(
    "/products/addnewproduct",
    async (formData) => {
      const result = await axios.post(
        "http://localhost:5173/api/admin/products/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );

  export const getAllProducts = createAsyncThunk(
    "/products/getallproducts",
    async () => {
      const result = await axios.get("http://localhost:5173/api/admin/products/get");
      return result?.data;
    }
  );

  export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({ id, formData }) => {
      const result = await axios.put(
        `http://localhost:5173/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );

  export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id) => {
      const result = await axios.delete(
        `http://localhost:5173/api/admin/products/delete/${id}`
      );
  
      return result?.data;
    }
  );
  
  const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data;
          })
          .addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
          });
      },
  });

    export default productSlice.reducer;





