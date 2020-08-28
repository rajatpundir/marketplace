import { REPLACE_VARIABLES, REPLACE_VARIABLE } from '../Actions/action';

const initialState = {};

export default function (state = initialState, action) {
	const newState = {...state}
	switch (action.type) {
		case REPLACE_VARIABLES:
			newState[action.typeName] = action.payload
			return newState;
		case REPLACE_VARIABLE:
			if (state[action.payload.typeName] !== undefined) {
				newState[action.payload.typeName] = [...state[action.payload.typeName].filter((varibale) => varibale.variableName !== action.payload.variableName), action.payload]
			}
			else {
				newState[action.payload.typeName] = [action.payload]
			}
			return newState;
		default:
			return state;
	}
}
