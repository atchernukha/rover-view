import React from 'react'
import { Container, makeStyles, TextField, withStyles, Slider, Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { lightGreen as green } from '@material-ui/core/colors';
import { marks, cameraList } from './const';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color: green[700],
    },
  },
  slider: {
    marginTop: 30,
    width: 640,
    color: green[300],
  },
}))

const GreenRadio = withStyles({
  root: {
    color: green[500],
    '&$checked': {
      color: green[400],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export const GreenButton = withStyles({
  root: {
    color: green[500],
    marginBottom: 60,
  }
})((props) => <Button color="default" {...props} />);

export default function SelectFilter({ filter, setFilter, resetSearch }) {

  const classes = useStyles();
  

  const valuetext = value => `${value}`

  const handleChange = event => {
    const name = event.target.name;
    setFilter({
      ...filter, ...{
        [name]: event.target.value,
      }
    });
    resetSearch();
  }

  const setSol = value => {
    setFilter({
      ...filter, ...{
        sol: value,
      }
    });
    resetSearch();
  }

  return (
    <>
      <Container className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Rover</FormLabel>
          <RadioGroup aria-label="Rover" name="rover" value={filter.rover} onChange={handleChange} row>
            <FormControlLabel value='curiosity' control={<GreenRadio />} label="Curiosity" />
            <FormControlLabel value='opportunity' control={<GreenRadio />} label="Opportunity" />
            <FormControlLabel value='spirit' control={<GreenRadio />} label="Spirit" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Camera</FormLabel>
          <RadioGroup aria-label="Camera" name='camera' value={filter.camera} onChange={handleChange} row>
            {cameraList(filter.rover).map(item => <FormControlLabel key={item.name} value={item.name} control={<GreenRadio />} label={item.fullName} />)}
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Day</FormLabel>
          <RadioGroup aria-label="Date" name="earth" value={filter.earth} onChange={handleChange} row>
            <FormControlLabel value="true" control={<GreenRadio />} label="Earth date" />
            <FormControlLabel value="" control={<GreenRadio />} label="Martian sol" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          {filter.earth ?
            <TextField
              id="date"
              label="Earth date"
              name="earth_date"
              type="date"
              value={filter.earth_date}
              onChange={handleChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }} /> :
            <div>
              <GreenButton onClick={() => setSol(--filter.sol)}>-</GreenButton>
              <Slider className={classes.slider}
                min={0}
                max={1000}
                value={filter.sol}
                name="sol"
                getAriaValueText={valuetext}
                step={1}
                marks={marks}
                valueLabelDisplay="on"
                onChangeCommitted={(event, newValue) => setSol(newValue)}
              />
              <GreenButton onClick={() => setSol(++filter.sol)}>+</GreenButton>
            </div>
          }
        </FormControl>
      </Container>
    </>
  )
}
