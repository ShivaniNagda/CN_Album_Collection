import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url="https://jsonplaceholder.typicode.com/albums";
//initial state of the application
const initialState={
    albums:[],
    loading:false,
    error:null,
    edit:false,
    showForm:false,
    albumToEdit:null
}

//retrieving the albumns from the api
export const getAlbumsAsync=createAsyncThunk("albums/fetch",
    async()=>{
        const res=await axios.get(url);
        // console.log(res);
        return res.data;
    }
)

//adding a new album
export const addAlbumAsync=createAsyncThunk("albums/add",
    async(payload,thunkAPI)=>{
        const res= await axios.post(url,payload);
        // console.log(res);
        return res.data;
    }
)


//updating/editing an album
export const editAlbumAsync=createAsyncThunk("albums/edit",
    async(payload,thunkAPI)=>{
        console.log(payload);
        const url=`https://jsonplaceholder.typicode.com/albums/${payload.id}`;
        const res=await axios.put(url,payload);
        // console.log(res);
        return res.data;
    }
)



//deleting an album
export const deleteAlbumAsync=createAsyncThunk("albums/delete",
    async(payload,thunkAPI)=>{
        // console.log(payload);
        const url=`https://jsonplaceholder.typicode.com/albums/${payload.id}`;
        //dummy api call deleting the album
        await axios.delete(url,payload);
        //deleting from the state
        thunkAPI.dispatch(AlbumActions.delete(payload));
    }
)










//AlbumSlice
const AlbumSlice=createSlice({
    name:"albums",
    initialState,
    reducers:{
        reset:(state,action)=>{

        },
        setShowForm:(state,action)=>{
            state.showForm=!state.showForm;
        },
        edit:(state,action)=>{
            state.edit=true;
            state.showForm=true;
            state.albumToEdit=action.payload;
        },
        add:(state,action)=>{
            state.edit=false
        },
        delete:(state,action)=>{
            state.albums=state.albums.filter((album)=>album.id!==action.payload.id);
        }
    },
    extraReducers:(builder)=>{
        //sucessful fetch
        builder.addCase(getAlbumsAsync.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.loading=false;
            state.error=null;
            state.albums=action.payload;
        })
        //error in fetching
        .addCase(getAlbumsAsync.rejected,(state,action)=>{
            // console.log(action.payload);
            state.loading=false;
            state.error="Error fetching the albums"
        })
        //loading
        .addCase(getAlbumsAsync.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })

        //adding an album
       .addCase(addAlbumAsync.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.albums=[action.payload,...state.albums];
            state.loading=false;
            state.error=null;
        })
        //error in adding
        .addCase(addAlbumAsync.rejected,(state,action)=>{
            // console.log(action.payload);
            state.loading=false;
            state.error="Error adding an album, please try later"
        })
        //loading
        .addCase(addAlbumAsync.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })


        //updating an album
       .addCase(editAlbumAsync.fulfilled,(state,action)=>{
            console.log(action.payload);
            // find the album with this id 
            const updatedAlbums=state.albums.map((album)=>{
                if(album.id===action.payload.id){
                   console.log(action.payload);
                    return action.payload;
                }else{
                    return album
                }
            });
            state.albums=[...updatedAlbums];
            state.loading=false;
            state.error=null;
        })
        //error in updating
        .addCase(editAlbumAsync.rejected,(state,action)=>{
            // console.log(action.payload);
            state.loading=false;
            state.error="Error updating the album, please try later"
        })
        //loading
        .addCase(editAlbumAsync.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })

    }
})



//reducer
export const AlbumReducer=AlbumSlice.reducer;
//actions
export const AlbumActions=AlbumSlice.actions;
//selector
export const AlbumSelector=state=>state.AlbumReducer;