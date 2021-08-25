import React from 'react'
import { Container, Select, makeStyles, TextField } from '@material-ui/core'

const useStyles =makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
}))

const cameraList = rover => {
    switch (rover) {
      case 'curiosity':
        return [{name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera'}, {name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera'},
                {name: 'NAVCAM', fullName: 'Navigation Camera'}, {name: 'MAST', fullName: 'Mast Camera'}, 
                {name: 'CHEMCAM', fullName: 'Chemistry and Camera Complex'}, {name: 'MAHLI', fullName: 'Mars Hand Lens Imager'}, 
                {name: 'MARDI', fullName: 'Mars Descent Imager'}];
        case 'opportunity':
        return [{name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera'}, {name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera'},
                {name: 'NAVCAM', fullName: 'Navigation Camera'}, {name: 'PANCAM', fullName: 'Panoramic Camera'}, 
                {name: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)'}];
        case 'spirit':
          return [{name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera'}, {name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera'},
                  {name: 'NAVCAM', fullName: 'Navigation Camera'}, {name: 'PANCAM', fullName: 'Panoramic Camera'}, 
                  {name: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)'}];
          default:
        return [];
    }
  }

export default function SelectFilter({filter,setFilter}) {
    const classes = useStyles();
    const handleChange = (event) => {
        const name = event.target.name;
        setFilter({...filter, ...{[name]: event.target.value, page: '1'},
        });
        console.log(filter)
      };

    return (
        <>
        <Container  className={classes.container}>
        <Select
          native
          className={classes.textField}
          value={filter.rover}
          onChange={handleChange}
          inputProps={{
            name: 'rover',
            id: 'rover',
          }}
        >
          <option value={'curiosity'}>Curiosity</option>
          <option value={'opportunity'}>Opportunity</option>
          <option value={'spirit'}>Spirit</option>
        </Select>
 
        <Select
          native
        //   className={classes.textField}
          value={filter.camera}
          onChange={handleChange}
          inputProps={{
            name: 'camera',
            id: 'camera',
          }}
        >
            {/* <option aria-label="None" value="" /> */}
            <option value="all">{"All cameras"}</option>
            {cameraList(filter.rover).map(item => <option key={item.name} value={item.name}>{item.fullName}</option>)}
        </Select>

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
            }}/>
            
            {/* <Select
            name="rover"
            label="select rover*"
            // isRequired={true}
            options={[{value: 'curiosity',label: 'Curiosity'}, {value: 'opportunity',label: 'Opportunity'}, {value: 'spirit',label: 'Spirit'} ]}
            width={320}
            // onInputClick={() => this.handleInputClick(0)}
            // onButtonClick={() => this.handleButtonClick(0)}
            // displayInstructions={instructions[0].display}
            // visited={instructions[0].visited}
            instructions="Instructions: Here are some instructions for the first - select a program from the drop-down list."
          /> */}
        </Container>
        </>
    )
}
