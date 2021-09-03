import React from 'react'
import { Container, makeStyles, TextField, withStyles, Slider, Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { lightGreen as green } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
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
    color: green[300],
    '&$checked': {
      color: green[500],
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

const cameraList = rover => {
  switch (rover) {
    case 'curiosity':
      return [{ name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' }, { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
      { name: 'NAVCAM', fullName: 'Navigation Camera' }, { name: 'MAST', fullName: 'Mast Camera' },
      { name: 'CHEMCAM', fullName: 'Chemistry and Camera Complex' }, { name: 'MAHLI', fullName: 'Mars Hand Lens Imager' },
      { name: 'MARDI', fullName: 'Mars Descent Imager' }];
    case 'opportunity':
      return [{ name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' }, { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
      { name: 'NAVCAM', fullName: 'Navigation Camera' }, { name: 'PANCAM', fullName: 'Panoramic Camera' },
      { name: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)' }];
    case 'spirit':
      return [{ name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' }, { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
      { name: 'NAVCAM', fullName: 'Navigation Camera' }, { name: 'PANCAM', fullName: 'Panoramic Camera' },
      { name: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)' }];
    default:
      return [];
  }
}

export default function SelectFilter({ filter, setFilter, setPage, setPhotos }) {

  const classes = useStyles();
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 250,
      label: '250',
    },
    {
      value: 500,
      label: '500',
    },
    {
      value: 750,
      label: '750',
    },
    {
      value: 1000,
      label: '1000',
    },
  ];

  const valuetext = value => `${value}`

  const handleChange = event => {
    const name = event.target.name;
    setFilter({
      ...filter, ...{
        [
          name]: event.target.value,
      }
    });
    setPage(1)
    setPhotos([])
  }

  const setSol = value => {
    setFilter({
      ...filter, ...{
        sol: value,
      }
    });
    setPage(1)
    setPhotos([])
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
