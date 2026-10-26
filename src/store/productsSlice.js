import { createSlice } from '@reduxjs/toolkit'
import {
  flashProducts,
  bestSellingProducts,
  exploreProducts,
  recommendedProducts,
} from './productsData'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    flash: flashProducts,
    best: bestSellingProducts,
    explore: exploreProducts,
    recommended: recommendedProducts,
  },
  // Hozircha mahsulotlar statik. Keyinchalik API dan olinsa,
  // shu yerga createAsyncThunk + extraReducers qo'shiladi.
  reducers: {},
})

export const selectFlashProducts = (state) => state.products.flash
export const selectBestProducts = (state) => state.products.best
export const selectExploreProducts = (state) => state.products.explore
export const selectRecommendedProducts = (state) => state.products.recommended

export default productsSlice.reducer
