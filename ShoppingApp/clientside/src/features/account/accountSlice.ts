import { User } from "../../app/models/user";
import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import apihandler from "../../app/api/apihandler";
import { history } from "../..";

interface AccountState {
    user:User |null
}

const initialState: AccountState = {
    user:null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const user = await apihandler.Account.login(data);
            // const {basket, ...user} = userDto;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        // thunkAPI.dispatch();
        try {
            const user = await apihandler.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

// export const accountSlice = createSlice(

//     {
//         name:'account',
//         initialState,
//         reducers:{},
//         extraReducers:(builder => 
            // {
            // builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            //     state.user = action.payload;
            // })
//         builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
//                 //  throw action.payload;
//                 console.log(action.payload);
//             })
        
//     }


// )

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {

        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.push('/')
        },
        
    },
    extraReducers:(

        builder =>{
            builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
                state.user = action.payload;
            });
            builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
                console.log(action.payload);
            })
        }
    )
})

export const {signOut} = accountSlice.actions; 
    