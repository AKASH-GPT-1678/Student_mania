import {createSlice , PayloadAction} from "@reduxjs/toolkit";

interface UserState{

    id : string,
    token  : string | null
}

const initialState : UserState = {
    id : "",
    token : null
};


const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state , action : PayloadAction<{id : string , token : string}>) => {
            state.id = action.payload.id;
            state.token = action.payload.token;
        },
        logout : (state) => {
            state.id = "";
            state.token = null;
        }
    }
});


export const {login , logout} = userSlice.actions;
export default userSlice.reducer;