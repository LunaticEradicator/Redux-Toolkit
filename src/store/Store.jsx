import { createSlice, configureStore, createAction } from '@reduxjs/toolkit'

const reset = createAction('app/reset');

const songSlice = createSlice({
    name: 'songs',  // used for action creator [pattern is name/miniReducer Name] = > songs/addSong
    initialState: [], //slice [1]

    // It is the Bigger reducer which holds all mini reducers
    // [can hold more than one reducer that's why we use redux-toolkit than useReducer]
    reducers: { //slice [2 min-reducers to reducers]
        // songs/addSong
        addSong(state, action) {
            state.push(action.payload)
        },
        // songs/ removeSong 
        removeSong(state, action) {
            const index = state.indexOf(action.payload)
            state.splice(index, 1)
        }
    },
    extraReducers(builder) {
        // builder.addCase("movies/reset", (state, action) => {
        // builder.addCase(movieSlice.actions.reset, (state, action) => { // same as above
        builder.addCase(reset, (state, action) => { // same as above
            return [] // to reset 
            // state.push('Something new'); 
            // we can mutate directly here without using payload

            // state = [] 
            // won't work because since we are using immer [in-build in redux] 
            // it won't mutate but will give a new value = [] [pretty bad]
        })
    }
})

const movieSlice = createSlice({
    name: 'movies',
    initialState: [],
    reducers: {
        addMovie(state, action) {
            state.push(action.payload)
        },
        removeMovie(state, action) {
            const index = state.indexOf(action.payload)
            state.splice(index, 1)
        },
        // reset(state, action) {
        //     return []
        // }
    },
    extraReducers(builder) {
        builder.addCase(reset, (state, action) => {
            return []
        })
    }
})


const store = configureStore({ // to store all state
    reducer: {
        addedSongs: songSlice.reducer,
        addedMovie: movieSlice.reducer
    }
})

export const { addSong, removeSong, extraReducer } = songSlice.actions
export const { addMovie, removeMovie } = movieSlice.actions
export { store, reset }

// calling dispatch within the reduxToolkit using store [used mainly for debugging]
// normal we use redux-react library to communicate between react and redux

// store.dispatch({                             //slice [3 Action-Creator]
//     type: 'songs/addSong',
//     payload: "Baby Don't hurt me"
// })

// store.dispatch(songSlice.actions.addSong("Baby Don't Hurt Me")); //slice [3 Action-Creator]
// const updatedState = store.getState()
// console.log(JSON.stringify(updatedState));

