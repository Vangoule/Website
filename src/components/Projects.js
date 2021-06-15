import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Snake from './snake.png';
import Audio from './audio.png';
import Tiles from './tiles.png';
import Incremental from './incremental.png';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
   
}));
<img src={Snake} alt="Snake" height={600} width={600}></img>

class Projects extends Component {
    render() {
        const classes = this.props;
        return (

            <section id="projects">
                <h2>Projects</h2>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Card className={classes.root}>
                                <NavLink to="/snake" >
                                    <CardActionArea >
                                        <CardMedia
                                            className={classes.media}
                                            src={Snake}
                                            component="img"
                                            title="Snake"
                                            draggable={false}/>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Snake
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                The classic snake game.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </NavLink>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card className={classes.root}>
                                <CardActionArea onClick={this.snakeClick}>
                                    <CardMedia
                                        className={classes.media}
                                        src={Tiles}
                                        component="img"
                                        title="Tile Editor"
                                        draggable={false}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Tile Editor
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            A 2D tile editor for making maps for games.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card className={classes.root}>
                                <CardActionArea onClick={this.snakeClick}>
                                    <CardMedia
                                        className={classes.media}
                                        src={Audio}
                                        component="img"
                                        title="Audio Visualiser"
                                        draggable={false}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Audio Visualiser
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            An audio visualiser which takes audio played from the tab and shows it as bars.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Card className={classes.root}>
                                <CardActionArea onClick={this.snakeClick}>
                                    <CardMedia
                                        className={classes.media}
                                        src={Incremental}
                                        component="img"
                                        title="Incremental"
                                        draggable={false}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Incremental RPG
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            An incremental RPG game.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs>

                        </Grid>
                        <Grid item xs>

                        </Grid>
                    </Grid>
                </div>
            </section>
        )
    }
}

Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Projects);