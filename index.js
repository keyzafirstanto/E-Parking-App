import { combineReducers } from 'redux';
import userReducer from './user';
import ticketReducer from './ticket';

export default combineReducers({
  user: userReducer,
  ticket: ticketReducer,
});
