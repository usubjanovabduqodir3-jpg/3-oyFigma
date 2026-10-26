import { createSlice } from '@reduxjs/toolkit'

// Firebase User obyekti serializable emas (ichida funksiyalar va tokenlar bor),
// shuning uchun Redux ga faqat kerakli maydonlarni saqlaymiz.
const serializeUser = (firebaseUser) =>
  firebaseUser
    ? {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      }
    : null

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: true },
  reducers: {
    // dispatch(setUser(firebaseUser)) deb chaqiriladi — prepare ichida
    // oddiy obyektga aylantiriladi, shuning uchun action ham serializable bo'ladi.
    setUser: {
      reducer(state, action) {
        state.user = action.payload
        state.loading = false
      },
      prepare(firebaseUser) {
        return { payload: serializeUser(firebaseUser) }
      },
    },
  },
})

export const { setUser } = authSlice.actions

export const selectUser = (state) => state.auth.user
export const selectAuthLoading = (state) => state.auth.loading

export default authSlice.reducer
