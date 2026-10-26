import { addManyToCart } from './cartSlice'
import { clearWishlist } from './wishlistSlice'

// Ikkita slice'ga tegadigan amal — thunk orqali bajariladi:
// wishlist dagi hamma narsa savatga o'tadi va wishlist tozalanadi.
export const moveAllToCart = () => (dispatch, getState) => {
  const { items } = getState().wishlist
  dispatch(addManyToCart(items))
  dispatch(clearWishlist())
}
