import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Dayjs} from "dayjs";
import {DateRange} from "@mui/x-date-pickers-pro";

export interface FiltersState {
    "primary_release_date.gte": string;
    "primary_release_date.lte": string;
    with_genres: string;
}

const initialState: Partial<FiltersState> = {
    "primary_release_date.gte": '',
    "primary_release_date.lte": '',
    with_genres: ''
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDates(state, action: PayloadAction<DateRange<Dayjs>>) {
            const [startDate, endDate] = action.payload;
            state["primary_release_date.gte"] = startDate ? startDate.format('YYYY-MM-DD') : '';
            state["primary_release_date.lte"] = endDate ? endDate.format('YYYY-MM-DD') : '';
        },
        setGenres(state, action: PayloadAction<string[]>){
            if(action.payload.length > 0){
                console.log(`SET GENRES ${action.payload}`);
                state.with_genres = action.payload.join(',');
            }
        },
        clearFilters(state){
            state["primary_release_date.gte"] = '';
            state["primary_release_date.lte"] = '';
            state.with_genres = '';
        }
    },
});

export const { setDates, setGenres, clearFilters} = filtersSlice.actions;
export default filtersSlice.reducer;
