import axios from 'axios';
import db from './database';
import { domain } from './config';
import { updateErrors } from './errors';
import { REPLACE_VARIABLES, REPLACE_VARIABLE } from './action';

async function loadVariables(dispatch, typeName) {
	await db.variables.where('typeName').equals(typeName).toArray().then((variables) => {
		dispatch({
			type: REPLACE_VARIABLES,
			payload: variables,
			typeName: typeName
		});
	});
}

async function loadVariable(dispatch, typeName: String, variableName: String) {
	await db.variables
		.where('[typeName+variableName]')
		.equals([ typeName, variableName ])
		.toArray()
		.then((variables) => {
			if (variables[0]) {
				dispatch({
					type: REPLACE_VARIABLE,
					payload: variables[0]
				});
			}
		});
}

async function replaceVariables(dispatch, payload, typeName: String) {
	await db.variables.where('typeName').equals(typeName).delete();
	await db.variables.bulkAdd(payload).then(() => {
		dispatch({
			type: REPLACE_VARIABLES,
			payload: payload,
			typeName: typeName
		});
	});
}

async function replaceVariable(dispatch, payload) {
	await db.variables.where('[typeName+variableName]').equals([ payload.typeName, payload.variableName ]).delete();
	await db.variables.add(payload).then(() => {
		dispatch({
			type: REPLACE_VARIABLE,
			payload: payload
		});
	});
}

function mapToObjectRec(m) {
	let lo = {};
	if (!(m instanceof Map)) {
		return m;
	}
	for (let [ k, v ] of m) {
		if (v instanceof Map) {
			lo[k] = mapToObjectRec(v);
		} else {
			if (v instanceof Array || v instanceof Set) {
				lo[k] = v.map((variable) => mapToObjectRec(variable));
			} else {
				lo[k] = v;
			}
		}
	}
	return lo;
}

export function objToMapRec(obj) {
	let map = new Map();
	Object.keys(obj).forEach((key) => {
		if (Array.isArray(obj[key])) {
			map.set(key, obj[key].map((variable) => objToMapRec(variable)));
		} else if (obj[key] instanceof Object) {
			map.set(key, objToMapRec(obj[key]));
		} else {
			map.set(key, obj[key]);
		}
	});
	return map;
}

export const getVariables = (typeName: String) => async (dispatch) => {
	try {
		await loadVariables(dispatch, typeName);
		const url = domain + '/variable/query';
		const request = {
			organization: 'zs',
			typeName: typeName,
			query: {
				values: {}
			}
		};
		const response = await axios.post(url, request);
		await replaceVariables(dispatch, response.data, typeName);
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const createVariable = (variable: Map) => async (dispatch) => {
	try {
		const url = domain + '/variable/create';
		const request = mapToObjectRec(variable);
		console.log('--REQUEST--');
		console.log(request);
		const response = await axios.post(url, request);
		console.log('--RESPONSE--');
		console.log(response);
		if (response.status === 200) {
			if (response.data !== undefined) {
				await replaceVariable(dispatch, response.data);
				return response.status;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};
export const createBidVariable = (variable: Object) => async (dispatch) => {
	try {
		const url = domain + '/variable/create';
		const request = variable;
		console.log('--REQUEST--');
		console.log(request);
		const response = await axios.post(url, request);
		console.log('--RESPONSE--');
		console.log(response);
		if (response.status === 200) {
			if (response.data !== undefined) {
				await replaceVariable(dispatch, response.data);
				return response.status;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const updateBidVariable = (variable: Object) => async (dispatch) => {
	try {
		const url = domain + '/variable/update';
		const request = variable;
		const response = await axios.post(url, request);
		if (response.status === 200) {
			if (response.data !== undefined) {
				console.log(response.data);
				await replaceVariable(dispatch, response.data);
				return response.status;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const getVariable = (typeName: String, variableName: String) => async (dispatch) => {
	try {
		await loadVariable(dispatch, typeName, variableName);
		const url = domain + '/variable/query';
		const request = {
			organization: 'zs',
			typeName: typeName,
			query: {
				variableName: variableName,
				values: {}
			}
		};
		const response = await axios.post(url, request);
		if (response.status === 200) {
			if (response.data !== undefined) {
				await replaceVariable(dispatch, response.data[0]);
				return response.status;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

export const updateVariable = (prevVariable: Map, newVariable: Map) => async (dispatch) => {
	try {
		const url = domain + '/variable/update';
		const request = {
			organization: prevVariable.get('organization'),
			typeName: prevVariable.get('typeName'),
			variableName: prevVariable.get('variableName'),
			values: mapToObjectRec(computeUpdates(prevVariable.get('values'), newVariable.get('values')))
		};
		console.log(JSON.stringify(request));
		const response = await axios.post(url, request);
		console.log('--RESPONSE--');
		console.log(response.data);
		if (response.status === 200) {
			if (response.data !== undefined) {
				console.log(response.data);
				await replaceVariable(dispatch, response.data);
				return response.status;
			}
		} else {
			updateErrors(dispatch, response.data);
			return response.status;
		}
	} catch (error) {
		if (error.response) {
			updateErrors(dispatch, error.response.data);
			return false;
		}
	}
};

function computeUpdates(prevValues: Map, newValues: Map) {
	const map = new Map();
	for (let [ key, value ] of prevValues.entries()) {
		if (value instanceof Map) {
			const values = new Map();
			values.set('values', computeUpdates(value.get('values'), newValues.get(key).get('values')));
			values.set('variableName', value.get('variableName'));
			if (values.get('values').size !== 0) {
				map.set(key, values);
			}
		} else if (value instanceof Array) {
			const newValue = newValues.get(key);
			const valueNames = value.map((variable) => variable.get('variableName'));
			const newValueNames = newValue.map((variable) => variable.get('variableName'));
			const updates = [];
			const deletions = value
				.map((variable) => variable.get('variableName'))
				.filter((variableName) => !newValueNames.includes(variableName));
			const insertions = newValue.filter((variable) => !valueNames.includes(variable.get('variableName')));
			for (let variable of value) {
				const variableName = variable.get('variableName');
				if (!insertions.includes(variableName) && !deletions.includes(variableName)) {
					const newVariable = newValue.filter((variable) => variable.get('variableName') === variableName)[0];
					if (variable !== newVariable) {
						const variableValues = computeUpdates(variable.get('values'), newVariable.get('values'));
						if (variableValues.size !== 0)
							updates.push(new Map([ [ 'variableName', variableName ], [ 'values', variableValues ] ]));
					}
				}
			}
			const listMap = new Map();
			if (insertions.length !== 0) {
				listMap.set('add', insertions);
			}
			if (deletions.length !== 0) {
				listMap.set('remove', deletions);
			}
			if (updates.length !== 0) {
				listMap.set('update', updates);
			}
			if (listMap.size !== 0) {
				map.set(key, listMap);
			}
		} else if (value !== newValues.get(key)) {
			map.set(key, newValues.get(key));
		}
	}
	return map;
}
