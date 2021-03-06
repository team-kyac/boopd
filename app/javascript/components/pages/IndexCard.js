import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const cat = require('../components/images/cat.jpg')

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
    const classes = useStyles();

    const {pets} = props;

    return (
        <>
        {pets && pets.map(pet =>{
            return(
            <Card className={classes.root} key={pet.id}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={cat}
                    title="cat"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {pet.name}, {pet.age}, {pet.species}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {pet.behavior}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() => props.history.push(`/petshow/${pet.id}`)}>
                My Story
                </Button>
            </CardActions>
            </Card>
        )})
    }</>)
}
