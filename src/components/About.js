import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import Work from '@material-ui/icons/Work';
import School from '@material-ui/icons/School';

import Divider from '@material-ui/core/Divider';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';

import CV from './images/CV.png';
const TimelinePaper = styled(Paper)(({ theme }) => ({
    padding: '6px 16px',
}));

const MainParagraph = styled(Typography)(({ theme }) => ({
    padding: '16px 16px',
}));

const Date = styled(Typography)(({ theme }) => ({
    padding: '16px 16px',
}));

export default class About extends Component {
    render() {
        const classes = this.props;

        return (
            <section id="about">
                <h3>About Me</h3>
                <Divider variant="inset" />
                <MainParagraph>
                        Hi, I'm Thomas Harris. I've been interested in all things related to computers since a young age. Programming being something I did as a hobby for a long time, due to this I knew that I wanted to make it my career.
                        I had always loved working on computer games, but decided to keep it more of a hobby while pursuing a more generic programming career, this led to my decision to choose Computer Science as a degree.
                        I've now been working as a Software Engineer for almost 3 years.            
                </MainParagraph>
                
                <NavLink to="/CV"><img src={CV} alt="CV"></img>
                </NavLink>
                
                <h3>Qualifications and Experience</h3>
                <Divider variant="inset" />
    
                <Timeline align="alternate">
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <TimelinePaper elevation={3}>
                                <Typography variant="h6" component="h1">
                                    Software Engineer | BAE Systems
                                </Typography>
                                <Typography>
                                    Working mostly with languages such as C, Matlab and ADA. With many scripting languages around it - Perl, Bash, Shell.
                                </Typography>
                                <Typography>Full life cycle development including Design, Developing, Testing and Maintaining critical software.</Typography>
                            </TimelinePaper>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary" variant="outlined">
                                <Work />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                        <Date>2019 – Present</Date>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineOppositeContent>
                        <Date>2015 – 2018</Date>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <School />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <TimelinePaper elevation={3} className={classes.paper}>
                                <Typography variant="h6" component="h1">
                                    Computer Science BSC (HONS) | University of Surrey
                                </Typography>
                                <Typography>This degree level course offered modules covering a wide range of topics including object-oriented programming, artificial intelligence, mobile computing and computational mathematics. </Typography>
                                <Typography>Languages and tools covered include Java, C++, Android, SQL, Python, MATLAB, and Arduino microcontrollers. </Typography>
                                <Typography>Thesis discussed techniques to display information in Augmented Reality using an Android phone. </Typography>
                            </TimelinePaper>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineOppositeContent>
                            <TimelinePaper elevation={3} className={classes.paper}>
                                <Typography variant="h6" component="h1">
                                    BTEC Level 3 Extended Diploma In Computing | Isle of Wight College
                                </Typography>
                                <Typography>Awarded at the triple grade of Distinction*. </Typography>
                                <Typography>Covered basic programming principles, use of graphical applications like photoshop and 3DS Max and many more I.T. and business-related topics.  </Typography>
                            </TimelinePaper>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary" variant="outlined">
                                <School />
                            </TimelineDot>
                            <TimelineConnector className={classes.secondaryTail} />
                        </TimelineSeparator>
                        <TimelineContent>
                        <Date> 2013 - 2015 </Date>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineOppositeContent>
                        <Date> 2009-2012 </Date>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <School />
                            </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContent>
                            <TimelinePaper elevation={3} className={classes.paper}>
                                <Typography variant="h6" component="h1">
                                    GCSE's and Other Level 2 Awards | Cowes High School
                                </Typography>
                                <Typography>6+ Normal GCSE’s, including English, Math, Japanese, Science, Religious Studies and I.T. at Grade C and above. </Typography>
                                <Typography>Level 2 Diploma of I.T.</Typography>
                                <Typography>Young Enterprise Award </Typography>
                                <Typography>iMedia award for digital graphics and animation. </Typography>
                            </TimelinePaper>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>

                <Divider variant="inset" />
            </section>
        )
    }
}
