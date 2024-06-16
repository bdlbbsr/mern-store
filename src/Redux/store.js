import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import AuthReducer from "./features/Auth/AuthSlice";
import ProductReducer from "./features/Product/ProductSlice";
import CartReducer from "./features/Cart/CartSlice";
import WishListReducer from "./features/wishlist/WishListSlice";
import FilterProductReducer from "./features/ProductFilter/FilterSlice";
import { composeWithDevTools } from "@redux-devtools/extension";
import logger from "redux-logger";

// console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger);
const enhancers = (getDefaultEnhancers) =>
  getDefaultEnhancers({
    autoBatch: { type: 'tick' },
  })

const composeEnhancers = {
  features: {
    pause: true, // start/pause recording of dispatched actions
    lock: true, // lock/unlock dispatching actions and side effects
    persist: false, // persist states on page reloading
    export: false, // export history of actions in a file
    import: "custom", // import history of actions from a file
    jump: false, // jump back and forth (time travelling)
    skip: false, // skip (cancel) actions
    reorder: true, // drag and drop actions in the history list
    dispatch: true, // dispatch custom actions or action creators
    test: false, // generate tests for the selected actions
  },
};

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    products: ProductReducer,
    cart: CartReducer,
    wishlist: WishListReducer,
    productFilter: FilterProductReducer,
  },
  middleware,
  enhancers,
  devTools: composeEnhancers,
});
