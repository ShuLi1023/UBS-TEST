import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
import ChartInput from './ChartInput'
import Chart from './Chart'
import { connect, useDispatch } from 'react-redux'
import {
    getData,
    getInitialData,
} from '../Actions'
import { useStyles } from '../Styles/Styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import * as htmlToImage from 'html-to-image'
import { jsPDF } from 'jspdf'

const SousJacentPage = ({
    data,
    isLoading,
    errMess,
    startDate,
    endDate,
    type,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    useEffect(() => {
        if (isLoading) {
            dispatch(getInitialData())
        }
        if (data.length) {
            dispatch(getData(startDate, endDate, type))
        }
    }, [dispatch, isLoading, type, startDate, endDate])

    const printDocument = () => {
        htmlToImage
            .toPng(document.getElementById('savePage'), { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a')
                link.download = 'my-image-name.jpeg'
                const pdf = new jsPDF()
                const imgProps = pdf.getImageProperties(dataUrl)
                const pdfWidth = pdf.internal.pageSize.getWidth()
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
                pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
                pdf.save('download.pdf')
            })
    }
    if (isLoading) {
        return (
            <div>
                <p>Loading</p>
            </div>
        )
    } else if (errMess) {
        return (
            <div>
                <p>{errMess}</p>
            </div>
        )
    } else
        return (
            <div>
                <Grid container  >
                    <Typography variant="h5" className='pageTittle' >
                        <ArrowRightIcon />Elaborez et personnalisez votre graphique du sous-jacent
                    </Typography>
                    <IconButton aria-label="save" className='saveButton' onClick={printDocument}>
                        <SaveIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid container id='savePage' >
                    <Grid container item md={12} lg={3} className={classes.chartInput}>
                        <ChartInput />
                    </Grid>
                    <Grid container item md={12} lg={9}>
                        <Chart />
                    </Grid>
                </Grid>
            </div>
        )
}

const mapStateToProps = (state) => ({
    data: state.data.data,
    isLoading: state.data.isLoading,
    errMess: state.data.errMess,
    startDate: state.data.startDate,
    endDate: state.data.endDate,
    type: state.data.type,
})
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SousJacentPage)