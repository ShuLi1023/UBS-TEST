import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { InputLabel, InputAdornment } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from '../Styles/Styles';
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { connect, useDispatch } from 'react-redux'
import {
    getData,
    setStartDate,
    setEndDate,
    setType,
    setLine1,
    setLine2,
    setLine1Input,
    setLine2Input,
} from '../Actions'


const ChartInput = (
    {
        startDate,
        endDate,
        type,
        handleChangeStartDate,
        handleChangeEndDate,
        handleSetType,
        first,
        last,
        options,
        endValue,
    }
) => {
    const classes = useStyles();


    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getData(startDate, endDate, type))
        document.getElementById('line1').value = '';
        document.getElementById('line2').value = '';

    }, [dispatch, type, startDate, endDate])

    const handleReferenceLine1 = (value) => {
        dispatch(setLine1Input(value))
        const v = endValue * value / 100
        if (value === '') {
            dispatch(setLine1())
        } else {
            dispatch(setLine1(v))

        }
    }
    const handleReferenceLine2 = (value) => {
        dispatch(setLine2Input(value))
        const v = endValue * value / 100
        if (value === '') {
            dispatch(setLine2())
        } else {
            dispatch(setLine2(v))
        }
    }
    return (
        <div>
            <Grid container className='padding'>
                <Grid container item md={8} lg={12} className='padding'>
                    <Grid item xs={12} className='padding'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="sous-jacent">Sous-Jacent</InputLabel>
                            <Select
                                labelId="sous-jacent"
                                id="sous-jacent-select"
                                value={type}
                                onChange={e => { handleSetType(e.target.value) }}
                                label="Sous-Jacent"
                            >
                                {options.map((v, index) =>
                                    <MenuItem key={index} value={v}>{v}</MenuItem>
                                )}
                            </Select>
                            <FormHelperText>Veuillez selectionner un sous-jacent</FormHelperText>
                        </FormControl>
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={6} className='padding'>
                            <form
                                className={classes.container}
                                noValidate
                            >
                                <DatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    id="startDate"
                                    label="Début"
                                    format="dd-MM-yyyy"
                                    value={startDate}
                                    minDate={first}
                                    maxDate={endDate}
                                    onChange={handleChangeStartDate}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={12} sm={6} className='padding'>
                            <form
                                className={classes.container}
                                noValidate
                            >
                                <DatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    id="endDate"
                                    label="Fin"
                                    format="dd-MM-yyyy"
                                    value={endDate}
                                    minDate={startDate}
                                    maxDate={last}
                                    onChange={handleChangeEndDate}
                                />
                            </form>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid container item md={4} lg={12} className='padding'>
                    <Grid item xs={12} className='padding'>
                        <InputLabel >
                            Ajouter une barriere de protection?
                        </InputLabel>

                        <Input
                            id="line1"
                            onChange={(e) =>
                                handleReferenceLine1(
                                    e.target.value
                                )
                            }
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <Grid item xs={12} className='padding'>
                        <InputLabel >
                            Ajouter une barriere de coupon?
                        </InputLabel>

                        <Input
                            id="line2"
                            onChange={(e) =>
                                handleReferenceLine2(
                                    e.target.value
                                )
                            }
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}
const mapStateToProps = (state) => ({
    data: state.data.data,
    startDate: state.data.startDate,
    endDate: state.data.endDate,
    type: state.data.type,
    first: state.data.first,
    last: state.data.last,
    options: state.data.options,
    endValue: state.data.endValue,
})

const mapDispatchToProps = (dispatch) => ({
    handleChangeStartDate: (d) => dispatch(setStartDate(d)),
    handleChangeEndDate: (d) => dispatch(setEndDate(d)),
    handleSetType: (value) => dispatch(setType(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartInput)