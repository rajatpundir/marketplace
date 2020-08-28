import { combineReducers } from 'redux';

// Import Reducers
import ErrorReducer from './errors';
import TypeReducer from './types';
import VariableReducer from './variables';

export default combineReducers({
	errors: ErrorReducer,
	types: TypeReducer,
	variables: VariableReducer,
});


