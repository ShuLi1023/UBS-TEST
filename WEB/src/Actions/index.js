import Axios from 'axios'
export const DATA_LOADING = 'DATA_LOADING'
export const SAVE_DATA = 'SAVE_DATA'
export const DATA_FAILED = 'DATA_FAILED'
export const SET_START_DATE = 'SET_START_DATE'
export const SET_END_DATE = 'SET_END_DATE'
export const SET_TYPE = 'SET_TYPE'
export const SET_FIRST_DATE = 'SET_FIRST_DATE'
export const SET_LAST_DATE = 'SET_LAST_DATE'
export const SET_MAX = 'SET_MAX'
export const SET_MIN = 'SET_MIN'
export const SET_MAX_DATE = 'SET_MAX_DATE'
export const SET_MIN_DATE = 'SET_MIN_DATE'
export const SET_OPTIONS = 'SET_OPTIONS'
export const SET_LINE1 = 'SET_LINE1'
export const SET_LINE2 = 'SET_LINE2'
export const SET_LINE1_INPUT = 'SET_LINE1_INPUT'
export const SET_LINE2_INPUT = 'SET_LINE2_INPUT'
export const SET_END_VALUE = 'SET_END_VALUE'

export const saveData = (data) => ({
    type: SAVE_DATA,
    payload: data
})

export const dataFailed = (errmess) => ({
    type: DATA_FAILED,
    payload: errmess,
})

export const setStartDate = (date) => ({
    type: SET_START_DATE,
    payload: date
})

export const setEndDate = (date) => ({
    type: SET_END_DATE,
    payload: date,
})

export const setType = (date) => ({
    type: SET_TYPE,
    payload: date,
})

export const setFirstDate = (d) => ({
    type: SET_FIRST_DATE,
    payload: d,
})

export const setLastDate = (d) => ({
    type: SET_LAST_DATE,
    payload: d,
})

export const setMax = (d) => ({
    type: SET_MAX,
    payload: d,
})

export const setMin = (d) => ({
    type: SET_MIN,
    payload: d,
})

export const setMaxDate = (d) => ({
    type: SET_MAX_DATE,
    payload: d,
})

export const setMinDate = (d) => ({
    type: SET_MIN_DATE,
    payload: d,
})

export const setOptions = (d) => ({
    type: SET_OPTIONS,
    payload: d,
})

export const setLine1 = (d) => ({
    type: SET_LINE1,
    payload: d,
})

export const setLine2 = (d) => ({
    type: SET_LINE2,
    payload: d,
})

export const setLine1Input = (d) => ({
    type: SET_LINE1_INPUT,
    payload: d,
})

export const setLine2Input = (d) => ({
    type: SET_LINE2_INPUT,
    payload: d,
})

export const setEndValue = (d) => ({
    type: SET_END_VALUE,
    payload: d,
})

export const getData = (from, to, type) => async (dispatch) => {
    await Axios.get(`http://localhost:8081/data?from=${from}&to=${to}`, { responseEncoding: 'latin-1' })
        .then((response) => {
            dispatch(saveData(response.data))
            dispatch(setEndValue(response.data[response.data.length - 2][type]))

            dispatch(getMax(response.data, type))
            dispatch(getMin(response.data, type))
        })
        .catch((error) => {
            dispatch(dataFailed(error.message))
        })
}

export const getInitialData = () => async (dispatch) => {
    await Axios.get(`http://localhost:8081/data`)
        .then((response) => {
            let options = Object.keys(response.data[0]).slice(1)
            dispatch(setOptions(options))
            dispatch(setType(options[0]))
            dispatch(saveData(response.data))

            dispatch(setFirstDate(response.data[0].Date))
            dispatch(setLastDate(response.data[response.data.length - 2].Date))
        })
        .catch((error) => {
            dispatch(dataFailed(error.message))
        })
}

export const getMax = (data, type) => async (dispatch) => {
    let max, date
    max = data[0][type];
    for (var i = 1; i < data.length; i++) {
        max = Math.max(max, data[i][type])
    }

    date = data.find((o) => {

        return o[type] === max
    }).Date

    dispatch(setMaxDate(date))
    dispatch(setMax(max))
}

export const getMin = (data, type) => async (dispatch) => {
    let min, date
    min = data[0][type];
    for (var i = 1; i < data.length; i++) {
        min = Math.min(min, data[i][type])
    }

    if (min !== 0) {
        date = data.find((o) => {
            return o[type] === min
        }).Date

        dispatch(setMinDate(date))
    }

    dispatch(setMin(min))
}
export const getEndValue = (data, type, endDate) => async (dispatch) => {
    const endV = data.filter(d => { return d.Date === endDate })[type]
    dispatch(setEndValue(endV))
}