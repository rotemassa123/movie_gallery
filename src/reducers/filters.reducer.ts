import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Dayjs} from "dayjs";
import {DateRange} from "@mui/x-date-pickers-pro";

export interface FiltersState {
    "primary_release_date.gte": string;
    "primary_release_date.lte": string;
    region: string;
    language: string;
    areFiltersOn: boolean;
}

const initialState: Partial<FiltersState> = {
    "primary_release_date.gte": '',
    "primary_release_date.lte": '',
    region: '',
    language: ''
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDates(state, action: PayloadAction<DateRange<Dayjs>>) {
            const [startDate, endDate] = action.payload;
            state["primary_release_date.gte"] = startDate ? startDate.format('YYYY-MM-DD') : '';
            state["primary_release_date.lte"] = endDate ? endDate.format('YYYY-MM-DD') : '';
            state.areFiltersOn = true;
        },
        setRegion(state, action: PayloadAction<string>) {
            state.region = action.payload;
            state.areFiltersOn = true;
        },
        setLanguage(state, action: PayloadAction<string>){
            state.language = action.payload;
            state.areFiltersOn = true;
        },
        clearFilters(state){
            state["primary_release_date.gte"] = '';
            state["primary_release_date.lte"] = '';
            state.region = '';
            state.language = '';
            state.areFiltersOn = false;
        }
    },
});

export const { setDates, setRegion, setLanguage, clearFilters} = filtersSlice.actions;
export default filtersSlice.reducer;
