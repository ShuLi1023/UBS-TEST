import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

export const theme = createTheme({
	overrides: {
		MuiPickersToolbar: {
			toolbar: {
				backgroundColor: grey['800'],
			},
		},
		MuiPickersDay: {
			day: {
				color: grey.A700,
			},
			daySelected: {
				backgroundColor: grey['800'],
			},
			current: {
				color: grey['800'],
			},
		},
		MuiPickersModal: {
			dialogAction: {
				color: grey['400'],
			},
		},
	},
	typography: {
		fontFamily: ['Montserrat', 'sans-serif'].join(','),
	},
})
export const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
      minWidth: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      textTransform: 'none',
    },
    lineChart: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(3),
      margin: theme.spacing(1),
    },
    chartInput: {
      marginTop: theme.spacing(3),
    }

  }));