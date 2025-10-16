import {createSlice , PayloadAction} from "@reduxjs/toolkit";

interface UserState{

    id : string,
    token  : string | null,
    isLoggedIn : boolean
}

const initialState : UserState = {
    id : "",
    token : null,
    isLoggedIn : false
};


const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state , action : PayloadAction<{id : string , token : string}>) => {
            state.id = action.payload.id;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout : (state) => {
            state.id = "";
            state.token = null;
            state.isLoggedIn = false;
        }
    }
});


export const {login , logout} = userSlice.actions;
export default userSlice.reducer;