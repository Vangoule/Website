import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


class About extends Component {
    render() {
        const classes = this.props;

        return (
            <section id="about">
                <h3>About Me</h3>
                <p>Hi, I'm Thomas Harris. I've been interested in all things related to computers since a young age. Programming being something I did as a hobby for a long time, due to this I knew that I wanted to make it my career.
                   I had always loved working on computer games, but decided to keep it more of a hobby while pursuing a more generic programming career, this led to my decision to choose Comptuer Science as a degree.
                   I've now been working as a Software Engineer for more than 2 years. My greatest dream is to one day finish a hobby project without shelving it for the next one. 
                </p>
                <h3>Qualifications and Experience</h3>
                <List className={classes.root}>
                <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Software Engineer | 2019 -  | BAE Systems"
                            secondary={
                                <React.Fragment>
                                    <p> Working mostly with languages such as C, Matlab and ADA. With many scripting languages around it - Perl, Bash, Shell. </p>
                                    <p> Full life cycle development including Design, Developing, Testing and Maintaining critical software.</p>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="COMPUTER SCIENCE BSC (HONS) | 2015 – 2018 | UNIVERSITY OF SURREY"
                            secondary={
                                <React.Fragment>
                                    <p>	This degree level course offered modules covering a wide range of topics including object-oriented programming, artificial intelligence, mobile computing and computational mathematics. </p>
                                    <p>	Languages and tools covered include Java, C++, Android, SQL, Python, MATLAB, and Arduino microcontrollers. </p>
                                    <p>	Thesis discussed techniques to display information in Augmented Reality using an Android phone. </p>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary=" BTEC LEVEL 3 EXTENDED DIPLOMA IN COMPUTING | 2013 - 2015 | ISLE OF WIGHT COLLEGE"
                            secondary={
                                <React.Fragment>
                                    <p>	Awarded at the triple grade of Distinction*. </p>
                                    <p>	Covered basic programming principles, use of graphical applications like photoshop and 3DS Max and many more I.T. and business-related topics.  </p>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="GCSE’S AND OTHER LEVEL 2 AWARDS | 2009-2012 | COWES HIGH SCHOOL"
                            secondary={
                                <React.Fragment>
                                    <p>	6 GCSE’s, including English, Math, Japanese, Science, Religious Studies and I.T. at Grade C and above. </p>
                                    <p>	Level 2 Diploma of I.T. at Grade C </p>
                                    <p>	Young Enterprise Award </p>
                                    <p>	iMedia award for digital graphics and animation. </p>                       </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
            </section>
        )
    }
}

About.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(About);