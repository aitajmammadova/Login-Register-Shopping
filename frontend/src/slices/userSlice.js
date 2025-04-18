import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
