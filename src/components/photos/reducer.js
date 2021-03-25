import { defaultState } from './defaultState';
import * as actionTypes from './actionTypes';
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_PHOTOS: {
        if(action.state==='SENT'){}
        
        if(action.state==='FINISHED'){
            return state.set('photoList', action.response.data );
        }
      return state;
    }
    case actionTypes.ON_CHANGE:{
        return state.set(action.params.key, action.params.value);
    }
    default:
      return state;
  }
};
