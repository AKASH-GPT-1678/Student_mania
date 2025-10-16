import { use } from "react";
import { RootState } from "./store/store";
import { AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const token = useAppSelector((state) => state.user.token);

export const reduxValue = {
    token : token,
    isLoggedIn : useAppSelector((state) => state.user.isLoggedIn),
    id : useAppSelector((state) => state.user.id)
}