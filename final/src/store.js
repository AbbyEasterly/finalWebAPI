import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from "./reducers/authReducer";
import packReducer from "./reducers/packReducer";
import cardReducer from "./reducers/cardReducer";

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        pack: packReducer,
        cards: cardReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk)
});

export default store;