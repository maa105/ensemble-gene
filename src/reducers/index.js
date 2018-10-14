import { combineReducers } from 'redux';
import genesReducer from './genes.reducer';

export default combineReducers({
  gene: genesReducer
});
