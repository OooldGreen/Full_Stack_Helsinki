import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setHint(state, action) {
      return action.payload
    },
    removeHint() {
      return null
    }
  }
})

const { setHint, removeHint } = notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(setHint(content))
    setTimeout(() => {
      dispatch(removeHint())
    }, time)
  }
}

export default notificationSlice.reducer