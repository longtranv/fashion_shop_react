import { createSlice, current } from "@reduxjs/toolkit";


const initialState ={
    products:[],
    quantity: 0,
    total: 0,
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addProduct: (state, action)=>{
            state.products.push(action.payload);
            console.log(current(state.products));
            state.quantity += 1;
            state.total += action.payload.price*action.payload.quantity;
        },
        removeProduct: (state, action)=>{
            console.log(current(state.products));
            let products = state.products.filter((item)=> item._id !== action.payload);
            let quantity = products.length;
            let total = 0;
            products.forEach((item)=>{
                total += item.price * item.quantity;
            });
            return {
                products,
                quantity,
                total
            }
        },
        resetCart: (state, action)=>{
            return initialState;
        }
    },
});

export const {addProduct, removeProduct ,resetCart} = cartSlice.actions
export default cartSlice.reducer;