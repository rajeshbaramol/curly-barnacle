import { fromJS } from 'immutable';

export const defaultState = fromJS({
    key:'photo',
    page:0,
    rowsPerPage:5,
    edit:[]
})