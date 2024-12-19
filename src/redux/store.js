import { configureStore } from "@reduxjs/toolkit";
import { AlbumReducer } from "./AlbumReducer";


export const store= configureStore({
    reducer:{
        AlbumReducer
    }
})