import { configureStore } from "@reduxjs/toolkit";
import ScheduleSlice from "./slices/ScheduleSlice";

const store = configureStore({
    reducer: {
        ScheduleSlice: ScheduleSlice,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ serializableCheck: false, }),],
});

export default store;