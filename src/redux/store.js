import { configureStore } from "@reduxjs/toolkit";
import { attiviesReducer } from "./attiviesSlice";

export default configureStore({
    reducer: {
        attivies: attiviesReducer
    }
})