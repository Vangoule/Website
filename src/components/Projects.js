import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import Snake from './images/snake.png';
import Audio from './images/audio.png';
import Tiles from './images/tiles.png';
import Incremental from './images/incremental.png';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { NavLink } from 'react-router-dom';

const Project = withStyles({
    root: {
        backgroundColor: "#222222",
        height: "100%",
        width: "100%",
        padding: "1px"
    },
})(CardActionArea);

const ProjectContent = withStyles({
    root: {
        minHeight: "120px",
        backgroundColor: "#444444",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        
    },
})(CardContent);

export default class Projects extends Component {
    render() {
        const classes = this.props;
        return (
            <section id="projects">
                <h2>Projects</h2>
                <div className={classes.root}>
                    <Grid container spacing={1} direction="row"
                         justify="flex-start"
                         alignItems="stretch">

                        <Grid item xs={4}>
                            <Card className={classes.root}>
                                <NavLink to="/snake" >
                                    <Project >
                                        <CardMedia
                                            className={classes.media}
                                            src={Snake}
                                            component="img"
                                            title="Snake"
                                            draggable={false} />
                                        <ProjectContent>
                                            <Typography color="white" gutterBottom variant="h5" component="h2">
                                                Snake
                                            </Typography>
                                            <Typography variant="body2" color="white" component="p">
                                                The classic snake game.
                                            </Typography>
                                        </ProjectContent>
                                    </Project>
                                </NavLink>
                            </Card>
                        </Grid>

                        <Grid item xs={4}>
                            <Card className={classes.root}>
                                <NavLink to="/tile_editor" >
                                    <Project>
                                        <CardMedia
                                            className={classes.media}
                                            src={Tiles}
                                            component="img"
                                            title="Tile Editor"
                                            draggable={false}
                                        />
                                        <ProjectContent>
                                            <Typography color="white" gutterBottom variant="h5" component="h2">
                                                Tile Editor
                                            </Typography>
                                            <Typography variant="body2" color="white" component="p">
                                                A 2D tile editor for making maps for games.
                                            </Typography>
                                        </ProjectContent>
                                    </Project>

                                </NavLink>
                            </Card>
                        </Grid>

                        <Grid item xs={4}>
                            <Card className={classes.root}>
                                <NavLink to="/cultivation" >
                                    <Project >
                                        <CardMedia
                                            className={classes.media}
                                            src={Snake}
                                            component="img"
                                            title="Cultivation"
                                            draggable={false} />
                                        <ProjectContent>
                                            <Typography color="white" gutterBottom variant="h5" component="h2">
                                                Eternal Cultivation
                                            </Typography>
                                            <Typography variant="body2" color="white" component="p">
                                                A Xianxia style semi-idle game centering around a mysterious cultivation technique which requires many lives to complete.
                                            </Typography>
                                        </ProjectContent>
                                    </Project>
                                </NavLink>
                            </Card>
                        </Grid>

                    </Grid>
                    {/* <Grid item xs>
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

                        </Grid> */}
                    {/* </Grid> */}
                </div>
            </section>
        )
    }
}
