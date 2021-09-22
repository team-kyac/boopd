import React from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Checkbox
} from "@material-ui/core";
import { withStyles, } from '@material-ui/core/styles'
import { petNewStyles } from './petNewStyles'

class PetNew extends React.Component {
  constructor(props) {
    super(props)
    this.medicalInput= React.createRef()
    this.state={
      pet:{
        name:"",
        age:"",
        sex:"",
        species:"",
        breed:"",
        behavior:"",
        city:"",
        state:"",
        available:"",
        description:"",
        housetrained:false,
        vaccinations:false,
        livedWithAnimals:false,
        fixed:false,
        declawed:false,
        livedWithChildren:false,
        medical:[]
      }
    }
  }

  handleChange = (e) => {
    let { pet } = this.state
    const { name, value } = e.target
    if(name == "housetrained" || name == "vaccinations" || name == "livedWithAnimals" || name == "fixed" || name == "declawed" || name == "livedWithChildren"){
      pet[name] = e.target.checked
    } else {
      pet[name]=value
    }
    this.setState({pet})
  }

  handleMedical = (e) => {
    //get value from medical field
    let value = this.medicalInput.current.value
    //add value to pet medical array
    let pet = this.state.pet
    pet.medical.push(value)
    this.setState({pet})
    this.medicalInput.current.value = ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let { pet } = this.state
    let data = {
      name: pet.name,
      age: pet.age,
      sex: pet.sex,
      species: pet.species,
      breed: pet.breed,
      behavior: pet.behavior,
      city: pet.city,
      state: pet.state,
      available: pet.available,
      description: pet.description,
      housetrained: pet.housetrained,
      vaccinations: pet.vaccinations,
      lived_with_animals: pet.livedWithAnimals,
      fixed: pet.fixed,
      declawed: pet.declawed,
      lived_with_children: pet.livedWithChildren,
      medical: pet.medical
    }
    fetch('/pets', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({ pet: data })
    })
      .then(response => {
        if(response.status === 422){
          alert('Please check required fields. Your post has not been saved.')
        } else {
        this.props.history.push('/petindex')
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    let { medical }=this.state.pet
    const { classes } = this.props
    return (
      <>
      <div>
        <Grid className={classes.gridContainer}>
          <h3 className="header">Create your listing!</h3>
          <FormControl className={classes.form}>
            <Grid>
              <Grid className={classes.formRowOne}>
              <Grid className={classes.formGrid}>
              <FormLabel>Name</FormLabel>
                  <TextField
                    className={classes.textInputName}
                    aria-label="Name"
                    variant="outlined"
                    name="name"
                    onChange={this.handleChange}
                  />
              </Grid>
              <Grid className={classes.formGrid}>
              <FormLabel>Age</FormLabel>
                  <TextField
                  className={classes.textInputAge}
                    aria-label="Age"
                    variant="outlined"
                    name="age"
                    onChange={this.handleChange}
                  />
              </Grid>
              <Grid className={classes.formGrid}>
              <FormLabel>City</FormLabel>
                  <TextField
                  className={classes.textInputCity}
                    aria-label="City"
                    variant="outlined"
                    name="city"
                    onChange={this.handleChange}
                  />
              </Grid>
              <Grid className={classes.formGrid}>
              <FormLabel>State</FormLabel>
                  <TextField
                  className={classes.textInputState}
                    aria-label="State"
                    variant="outlined"
                    name="state"
                    onChange={this.handleChange}
                  />
              </Grid>
            </Grid>
            <Grid className={classes.formRowTwo}>
            <Grid className={classes.formGrid}>
              <FormLabel>Species</FormLabel>
                <TextField
                  className={classes.textInputSpecies}
                  aria-label="Species"
                  variant="outlined"
                  name="species"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid className={classes.formGrid}>
                <FormLabel>Breed</FormLabel>
                  <TextField
                    className={classes.textInputBreed}
                    aria-label="Breed"
                    variant="outlined"
                    name="breed"
                    onChange={this.handleChange}
                  />
                </Grid>
            <Grid className={classes.formGrid}>
              <FormLabel>Behavior/Personality</FormLabel>
                <TextField
                className={classes.textInputBehavior}
                  aria-label="Behavior/Personality"
                  variant="outlined"
                  name="behavior"
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid className={classes.formRowThree}>
            <Grid className={classes.formGrid}>
              <RadioGroup
                  className={classes.radioGroup}
                  aria-label="sex"
                  name="sex"
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                    aria-label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                    aria-label="Female"
                  />
                </RadioGroup>
                </Grid>
              </Grid>
              <FormControl className={classes.form}>
              <Grid className={classes.formRowFour}>
                  <FormControlLabel
                  control={<Checkbox checked={this.state.housetrained}
                  onChange={this.handleChange}
                  name="housetrained"/>}
                  label="Housetrained"
                  />
                  <FormControlLabel
                  control={<Checkbox checked={this.state.vaccinations}
                  onChange={this.handleChange}
                  name="vaccinations"/>}
                  label="Vaccinations Current"
                  />
                  <FormControlLabel
                  control={<Checkbox checked={this.state.livedWithAnimals}
                  onChange={this.handleChange}
                  name="livedWithAnimals"/>}
                  label="Lived With Animals"
                  />
                  <FormControlLabel
                  control={<Checkbox checked={this.state.fixed}
                  onChange={this.handleChange}
                  name="fixed"/>}
                  label="Spayed/Neutered"
                  />
                  <FormControlLabel
                  control={<Checkbox checked={this.state.declawed}
                  onChange={this.handleChange}
                  name="declawed"/>}
                  label="Declawed(Cats Only)"
                  />
                  <FormControlLabel
                  control={<Checkbox checked={this.state.livedWithChildren}
                  onChange={this.handleChange}
                  name="livedWithChildren"/>}
                  label="Lived With Children"
                  />
                </Grid>
              </FormControl>

            </Grid>
            <Grid className={classes.formRowFive}>
                <RadioGroup
                  className={classes.radioGroup}
                  aria-label="availability"
                  name="available"
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Available Now"
                  aria-label="Available Now"
                  />
                  <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Not Available"
                  aria-label="Not Available"
                  />
                </RadioGroup>
              </Grid>
              <Grid>
                <FormLabel>Description</FormLabel>
                <TextField
                  className={classes.textInputDescription}
                  aria-label="Description"
                  variant="outlined"
                  name="description"
                  onChange={this.handleChange}
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid className={classes.formRowSix}>
              <FormLabel>Please List Medical Issues</FormLabel>
              {medical && medical.map((issue, index)=>{
                return(
                  <div key={index}>
                    <FormLabel>Issue {index+1}</FormLabel>
                    <Typography>{issue}</Typography>
                  </div>
                )
              })}
              <FormControlLabel
                control={
                  <TextField
                  className={classes.textInputMedical}
                  inputRef={this.medicalInput}
                  aria-label="Medical Issue Input"
                  variant="outlined"
                  name="medical"
                  />
                }
              />
              <Button onClick={this.handleMedical} variant="contained">Add New</Button>
              </Grid>
            <Grid className={classes.formRowSeven}>
              <Button variant="outlined"
              className={classes.cancelButton}>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} variant="contained">
                Submit
              </Button>

            </Grid>
          </FormControl>
        </Grid>
        </div>
      </>
    );
  }
}
export default withStyles(petNewStyles)(PetNew)

