import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Filters} from "../interfaces/Filters";
import {Dayjs} from "dayjs";

const initialState: Partial<Filters> = {
    year: null,
    with_genres: ''
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilterYear(state, action: PayloadAction<Dayjs | null>) {
            if(!action.payload){
                state.year = null;
            } else {
                state.year = action.payload.year();
            }
        },
        setGenres(state, action: PayloadAction<string[]>){
            state.with_genres = action.payload.join(',');
        },
        clearFilters(state){
            state.year = null;
            state.with_genres = '';
        }
    },
});

export const { setFilterYear, setGenres, clearFilters} = filtersSlice.actions;
export default filtersSlice.reducer;
