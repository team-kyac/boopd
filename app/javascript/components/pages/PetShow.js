import React, { useState } from 'react'
import {
  Typography,
  Checkbox,
  Grid,
  FormGroup,
  FormLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const apiRequest = () => {
  return(
    fetch('/dogs')
      .then(response => response.json())
      .catch(err => console.log(err))
  )
}


const PetShow = ({match, pets, history, readPet, currentUser}) => {
  const [dogInfo, setDogInfo] = useState({})
  let pet = {}
  let livedWithAnimals, livedWithChildren
  if(pets) {
    pet = pets.find(obj => obj.id === +match.params.id)
    if(pet) {
      livedWithAnimals = pet.lived_with_animals
      livedWithChildren = pet.lived_with_children
    }
  }

  const deletePet = (id) => {
    fetch(`/pets/${id}`, {
      headers: {
          "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then(response => {
      readPet()
      history.push('/index')
    })
    .catch(errors => console.log("delete errors:", errors))
  }

  const getDogInfo = () => {
    apiRequest()
    .then(payload => {
      let info
      info = payload.find((dog) => {
       return dog.name == pet.breed
      })
      setDogInfo({...info})
    })
  }

  return(
    <Grid className="gridContainer">
      {pet && (
        <>
          <Grid>
            <Typography>Name: {pet.name}</Typography>
            <Typography>Age: {pet.age}</Typography>
            <Typography>Sex: {pet.sex}</Typography>
            <Typography>Species: {pet.species}</Typography>
          </Grid>
          <Grid>
            <Typography>Behavior/Personality: {pet.behavior}</Typography>
            <Typography>City: {pet.city}</Typography>
            <Typography>State: {pet.state}</Typography>
            <Typography>Breed: {pet.breed}</Typography>
          </Grid>
          <Grid>
            <FormGroup>
              <FormLabel>Housetrained</FormLabel>
              <Checkbox disabled checked={pet.housetrained}/>
              <FormLabel>Vaccinations Current</FormLabel>
              <Checkbox disabled checked={pet.vaccinations}/>
              <FormLabel>Lived With Animals</FormLabel>
              <Checkbox disabled checked={livedWithAnimals}/>
              <FormLabel>Spayed/Neutered</FormLabel>
              <Checkbox disabled checked={pet.fixed}/>
              <FormLabel>Declawed (cats only)</FormLabel>
              <Checkbox disabled checked={pet.declawed}/>
              <FormLabel>Lived With Children</FormLabel>
              <Checkbox disabled checked={livedWithChildren}/>
            </FormGroup>
            <Typography className="descriptionShow">Description: </Typography>
            <Typography className="descriptionShow">{pet.description}</Typography>
            <Grid>
              <Accordion className="accordion">
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                  <Typography className="descriptionShow">Medical History </Typography>
                </AccordionSummary>
                  {pet.medical && pet.medical.map((issue, index) => {
                    return(
                      <AccordionDetails key={index}>
                        <Typography>
                          {issue}
                        </Typography>
                      </AccordionDetails>
                    )
                  }) }
              </Accordion>
            </Grid>
            <Button onClick={getDogInfo}>Get Dog Info</Button>
            {dogInfo.name && (
              <>
              <Typography>Bred for: {dogInfo.bred_for}</Typography>
              <Typography>Breed Group: {dogInfo.breed_group}</Typography>
              <Typography>Height: {dogInfo.height.imperial} inches</Typography>
              <Typography>Lifespan: {dogInfo.life_span}</Typography>
              <Typography>Temperament: {dogInfo.temperament}</Typography>
              <Typography>Weight: {dogInfo.weight.imperial} lbs</Typography>
              </>
            )}
          </Grid>
          <Grid>
            <Button className="showButton" onClick={() => history.push('/index')}>Back</Button>
            {pet.available == true && <Button>Adopt Me!</Button>}
          </Grid>
          <Grid>
            {pet.user_id === currentUser.id && (
            <>
              <Button className="showButton" onClick={() => history.push(`/petedit/${match.params.id}`)}>
                Edit this pet
              </Button>
              <Button className="showButton" onClick={() => deletePet(pet.id)}>
                Delete Pet
              </Button>
            </>
            )}
          </Grid>
        </>
      ) }
    </Grid>
  )
}

export default PetShow
