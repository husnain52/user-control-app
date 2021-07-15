import * as types from './types'

// actions
export const userData = (value) => ({ type: types.DATA,payload:value });
export const user = (value) => ({ type: types.USER,payload:value });