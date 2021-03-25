
import { combineReducers } from 'redux';
import photoReducer from '../components/photos/reducer'

const reducers = combineReducers({
    photos: photoReducer,
  })
  export default reducers
  