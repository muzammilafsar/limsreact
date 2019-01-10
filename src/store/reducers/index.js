import {
    combineReducers
} from 'redux';
import addBook from './addBook.reducer';
import UiReducer from './ui.reducer';
import authReducer from './auth.reducer';
export default combineReducers({
    addBook,
    UiReducer,
    authReducer
});