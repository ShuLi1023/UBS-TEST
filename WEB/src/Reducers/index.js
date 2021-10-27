import { combineReducers } from 'redux'
import { chartDataReducer } from './chartDataReducer'


const allReducers = combineReducers({
	data: chartDataReducer,
})

export default allReducers