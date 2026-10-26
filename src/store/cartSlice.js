import { createSlice } from '@reduxjs/toolkit'

export const MAX_QTY = 99

export const clampQty = (qty) =>
  Math.min(MAX_QTY, Math.max(1, Number(qty) || 1))

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      if (!state.items.some((item) => item.id === product.id)) {
        state.items.push({ ...product, qty: 1 })
      }
    },
    addManyToCart(state, action) {
      for (const product of action.payload) {
        if (!state.items.some((item) => item.id === product.id)) {
          state.items.push({ ...product, qty: 1 })
        }
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    changeQty(state, action) {
      const { id, qty } = action.payload
      const item = state.items.find((i) => i.id === id)
      if (item) item.qty = clampQty(qty)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, addManyToCart, removeFromCart, changeQty, clearCart } =
  cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) => state.cart.items.length
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)

export default cartSlice.reducer
