import { configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./features/Auth/AuthSlice";
import ProductReducer from "./features/Product/ProductSlice";
import CartReducer from "./features/Cart/CartSlice";
import WishListReducer from "./features/wishlist/WishListSlice";
import FilterProductReducer from "./features/ProductFilter/FilterSlice";
 
//console.log("env", process.env.NODE_ENV);
 
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    products: ProductReducer,
    cart: CartReducer,
    wishlist: WishListReducer,
    productFilter: FilterProductReducer,
  }
  
});
