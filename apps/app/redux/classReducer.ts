import { ClassesType } from "../types/class-types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchClassById = createAsyncThunk<
  ClassesType,                      
  { classId: string; token: string },
  { rejectValue: string }             
>(
  "class/fetchClassById",
  async ({ classId, token }, { rejectWithValue }) => {
    try {
      const response = await api.get<ClassesType>(`/api/class/load/${classId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch class";
      return rejectWithValue(message);
    }
  }
);


export interface ClassState {
    classData: ClassesType | null;
    loading: boolean;
    error: string | null;
}


const initialState: ClassState = {
    classData: null,
    loading: false,
    error: null,
};


const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {
        clearClassData: (state) => {
            state.classData = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchClassById.fulfilled,
                (state, action: PayloadAction<ClassesType>) => {
                    state.loading = false;
                    state.classData = action.payload;
                }
            )
            .addCase(fetchClassById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});


export const { clearClassData } = classSlice.actions;
export default classSlice.reducer;
