import React from 'react'
import { useStyles } from '../Styles/Styles';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceLine,
    ReferenceDot,
    Label
} from 'recharts'
import { connect } from 'react-redux'
import { Typography, Grid } from '@material-ui/core';

const Chart = ({
    data,
    max,
    min,
    maxDate,
    minDate,
    type,
    line1,
    line2,
    line1Input,
    line2Input
}) => {
    const classes = useStyles()


    const formatXAxis = (tickItem) => {
        return GetFormattedDate(tickItem);
    }

    const GetFormattedDate = (date) => {
        const d = new Date(date)
        const month = (d.getMonth() + 1).toString()
        let m
        switch (month) {
            case '1':
                m = 'janv.'
                break;
            case '2':
                m = 'févr.'
                break;
            case '3':
                m = 'mars.'
                break;
            case '4':
                m = 'avr.'
                break;
            case '5':
                m = 'mai.'
                break;
            case '6':
                m = 'juin.'
                break
            case '7':
                m = 'juil.'
                break
            case '8':
                m = 'août.'
                break
            case '9':
                m = 'sept.'
                break
            case '10':
                m = 'oct.'
                break
            case '11':
                m = 'nov.'
                break
            case '12':
                m = 'déc.'
                break
            default:
                break;
        }
        const year = d.getFullYear().toString().slice(2)
        return `${m}-${year}`
        // return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth() + 1).toString().padStart(2,'0')}/${year}`
    }


    return (
        <div className={classes.lineChart}>
            <Grid container >
                <Grid item sx={12}>
                    <Typography variant="h6" className='chartLittle'>
                        Evolution du sous-jacent
                    </Typography>
                </Grid>
                <Grid item sx={12}>
                    <LineChart
                        className={classes.lineChart}
                        width={800}
                        height={450}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <Line
                            type="monotone"
                            dataKey={type}
                            stroke="#8884d8"
                            dot={false}
                        />
                        <CartesianGrid
                            stroke="#ccc"
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="Date" angle={-30} dy={10} tickFormatter={formatXAxis} padding={{ left: 20, right: 20 }} height={40} />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip contentStyle={{ borderStyle: 'none' }} />
                        <ReferenceLine
                            y={line1}
                            stroke="green"
                            label={line1Input + "%"}
                        />
                        <Label value="Pages of my website" offset={5} position="insideTop" />
                        <ReferenceLine
                            y={line2}
                            stroke="red"
                            label={line2Input + "%"}
                        />
                        <ReferenceDot
                            y={max}
                            x={maxDate}
                            r={3}
                            fill="green"
                            stroke="none"
                            label={max}
                        />
                        <ReferenceDot
                            y={min}
                            x={minDate}
                            r={3}
                            fill="red"
                            stroke="none"
                            label={min}
                        />
                    </LineChart>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.data.data,
    type: state.data.type,
    max: state.data.max,
    min: state.data.min,
    maxDate: state.data.maxDate,
    minDate: state.data.minDate,
    line1: state.data.line1,
    line2: state.data.line2,
    line1Input: state.data.line1Input,
    line2Input: state.data.line2Input,
})
const mapDispatchToProps = (dispatch) => ({
    // handleChangeStartDate: (d) => dispatch(setStartDate(d)),

})


export default connect(mapStateToProps, mapDispatchToProps)(Chart)