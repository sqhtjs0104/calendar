import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../firebase';
import { collection, doc, getDocs, setDoc, query, where } from 'firebase/firestore/lite';

export const getSchedule = createAsyncThunk('ScheduleSlice/getSchedule', async (payload, { rejectWithValue }) => {
    const data = [];
    let snapshot = null;

    try {
        const ref = collection(db, "calendar");
        const q = query(ref, where("yearMonth", "in", [payload.format('YYYY-MM'), payload.subtract(1, 'month').format('YYYY-MM'), payload.add(1, 'month').format('YYYY-MM')]));
        snapshot = await getDocs(q);
        snapshot.forEach(doc => {
            const temp = doc.data();
            temp.id = doc.id;
            data.push(temp);
        });
    } catch (err) {
        return rejectWithValue(err.response);
    }

    return data;
});

const ScheduleSlice = createSlice({
    name: 'ScheduleSlice',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        getCurrentData: (state, { payload }) => {
            return state;
        },
    },
    extraReducers: {
        [getSchedule.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [getSchedule.fulfilled]: (state, { payload }) => {
            return {
                data: payload,
                loading: false,
                error: null
            }
        },
        [getSchedule.rejected]: (state, { payload }) => {
            const err = new Error();

            console.log(payload);

            err.code = payload.data.rtcode;
            err.name = payload.data.rt;
            err.message = payload.data.rtmsg;
        
            return {
                ...state,
                loading: false,
                error: err
            }
        },
    }
});

export const { getCurrentData } = ScheduleSlice.actions;

export default ScheduleSlice.reducer;