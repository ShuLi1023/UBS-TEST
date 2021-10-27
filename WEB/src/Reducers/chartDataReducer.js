import * as actions from '../Actions'

const stateDefault = {
    isLoading: true,
    errMess: null,
    data: [],
    startDate: '',
    endDate: '',
    first: null,
    last: null,
    type: '',
    max: null,
    min: null,
    maxDate: null,
    minDate: null,
    options: [1],
    line1: null,
    line2: null,
    line1Input: null,
    line2Input: null,
    endValue: null,
}
export const chartDataReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case actions.SAVE_DATA:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                data: action.payload,
            }

        case actions.DATA_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                data: [],
            }

        case actions.DATA_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
            }

        case actions.SET_START_DATE:
            return {
                ...state,
                startDate: action.payload,
            }

        case actions.SET_END_DATE:
            return {
                ...state,
                endDate: action.payload,
            }

        case actions.SET_TYPE:
            return {
                ...state,
                type: action.payload,
            }

        case actions.SET_FIRST_DATE:
            return {
                ...state,
                startDate: action.payload,
                first: action.payload,
            }

        case actions.SET_LAST_DATE:
            return {
                ...state,
                endDate: action.payload,
                last: action.payload,
            }

        case actions.SET_MAX:
            return {
                ...state,
                max: action.payload,
            }

        case actions.SET_MIN:
            return {
                ...state,
                min: action.payload,
            }

        case actions.SET_MAX_DATE:
            return {
                ...state,
                maxDate: action.payload,
            }

        case actions.SET_MIN_DATE:
            return {
                ...state,
                minDate: action.payload,
            }

        case actions.SET_OPTIONS:
            return {
                ...state,
                options: action.payload
            }

        case actions.SET_LINE1:
            return {
                ...state,
                line1: action.payload
            }

        case actions.SET_LINE2:
            return {
                ...state,
                line2: action.payload
            }

        case actions.SET_LINE1_INPUT:
            return {
                ...state,
                line1Input: action.payload
            }

        case actions.SET_LINE2_INPUT:
            return {
                ...state,
                line2Input: action.payload
            }

        case actions.SET_END_VALUE:
            return {
                ...state,
                endValue: action.payload
            }
        default:
            return state
    }
}