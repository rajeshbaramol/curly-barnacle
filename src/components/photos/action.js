import * as actionTypes from './actionTypes';

export const getPhotos = (params) => {
    return {
        type: actionTypes.GET_PHOTOS,
        uri: `http://jsonplaceholder.typicode.com/photos?_start=${params._start}&_limit=${params._limit}`,
        body: {},
        params,
    };
};
export const deleteItem = (params) => {
    return {
        type: actionTypes.DELETE,
        uri: `https://jsonplaceholder.typicode.com/posts/${params.id}`,
        method:'DELETE',
        body: {},
        params,
    };
};
export const onChange = (params) => {
    return {
        type: actionTypes.ON_CHANGE,
        params,
    };
};
