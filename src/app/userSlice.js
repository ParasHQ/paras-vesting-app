import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { contractGetReleasableAmount, contractGetBalance } from "../near/near"
import { prettyBalance } from "../utils/common"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    userBalance: 0,
    userReward: 0,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload
    },
    setBalance: (state, action) => {
      state.userBalance = action.payload
    },
    setReward: (state, action) => {
      state.userReward = action.payload
    },
  },
})

export const {
  setUser,
  setBalance,
  setReward,
  setVestingTime,
} = userSlice.actions

export default userSlice.reducer

export const fetchBalance = createAsyncThunk(
  "fetchBalance",
  async (_, { dispatch }) => {
    const response = await contractGetBalance()
    dispatch(setBalance(prettyBalance(response, 24, 4)))
  }
)

export const fetchReward = createAsyncThunk(
  "fetchVesting",
  async (_, { dispatch }) => {
    const response = await contractGetReleasableAmount()
    dispatch(setReward(prettyBalance(response, 24, 4)))
  }
)
