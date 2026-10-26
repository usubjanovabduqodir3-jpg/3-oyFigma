import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import wishlistReducer from './wishlistSlice'
import cartReducer, { clampQty } from './cartSlice'
import authReducer from './authSlice'

const WISHLIST_KEY = 'wishlist'
const CART_KEY = 'cart'

const readStorage = (key) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage to'la yoki o'chirilgan bo'lsa — jimgina o'tkazib yuboramiz
  }
}

// localStorage dagi eski ma'lumot (kalitlar o'zgarmagan) shu yerdan Redux ga tushadi.
const preloadedState = {
  wishlist: { items: readStorage(WISHLIST_KEY) },
  cart: {
    items: readStorage(CART_KEY).map((item) => ({
      ...item,
      qty: clampQty(item.qty),
    })),
  },
}

export const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState,
})

// wishlist yoki cart o'zgarganda localStorage ga yozib boramiz.
let prevWishlist = store.getState().wishlist.items
let prevCart = store.getState().cart.items

store.subscribe(() => {
  const { wishlist, cart } = store.getState()

  if (wishlist.items !== prevWishlist) {
    prevWishlist = wishlist.items
    writeStorage(WISHLIST_KEY, prevWishlist)
  }
  if (cart.items !== prevCart) {
    prevCart = cart.items
    writeStorage(CART_KEY, prevCart)
  }
})
