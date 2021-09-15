
import React, { useState, useEffect } from "react";
import DayView from "../../components/DayView";
import TimeView from "../../components/TimeView";
import Validate from "../../utils/Validate";
import { connect } from "react-redux";
import { getEvents, getEventsByAuthor, createEvent, updateEvent, deleteEvent } from "../../actions/eventActions";


import { Box, Grid, Container,Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));



const WeekViewPage = ({
    isAuthenticated,
    getEvents,
    getEventsByAuthor,
    match,
    events,
    errors,
    createEvent,
    updateEvent,
    deleteEvent,
    loading,
    history }) => {

    useEffect(() => {
        isAuthenticated ? getEvents() : getEventsByAuthor(match.params.author);
    }, [isAuthenticated, getEvents, getEventsByAuthor, match]);


    //Creator


    const [event, setEvent] = useState({
        title: "",
        description: "",
        startTime: moment(),
        endTime: moment(),
        errors: {}
    });

    useEffect(() => {
        setEvent(event => {
            return { ...event, errors };
        });
    }, [errors]);




    const handleChange = e => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const setStartTime = (value) => {
        setEvent({
            ...event,
            ["startTime"]: value
        });
    }

    const setEndTime = (value) => {
        setEvent({
            ...event,
            ["endTime"]: value
        });
    }

    const handleBlur = e => {
        const { name, value } = e.target;
        const error = { ...event.errors, ...Validate(name, value).errors };
        setEvent({ ...event, errors: { ...error } });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { title, description, startTime, endTime } = event;
        createEvent({ title, description, startTime, endTime }, history);
    };

    const handleUpdate = e => {
        e.preventDefault();
        const { title, description, startTime, endTime } = event;
        const id = event._id;
        updateEvent(id, { title, description, startTime, endTime }, history);

    };

    const handleDelete = e => {
        e.preventDefault();
        const id = event._id;
        deleteEvent(id, history);
        //setEvent({});
    }


    const classes = useStyles();

    return (
        <Container maxWidth="xl" >
            <Grid container alignItems='flex-start' direction="row" justify="center" >
                <Grid item xs={1} >
                    <Box borderRight={1} borderColor={"gray"}>
                        <TimeView
                            intervalMin={60}
                        ></TimeView>
                    </Box>

                </Grid>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <Grid key={value} item xs={1}  >
                        <Box borderRight={1} borderColor={"gray"}>

                            <DayView key={events} events={events}
                                curDate={moment().add(value, "days")}
                                intervalMin={15}
                                onClick={setEvent}
                                loading={loading}
                                setEvent={setEvent}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onSubmit={handleSubmit}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                setStart={setStartTime}
                                setEnd={setEndTime}
                                event={event}
                            ></DayView>
                        </Box>
                        

                    </Grid>
                ))}

            </Grid>
            
        </Container>

    );
};

const mapStateToProps = state => ({
    loading: state.event.eventLoading,
    errors: state.errors,
    isAuthenticated: state.auth.isAuthenticated,
    events: state.event.events
});


export default connect(
    mapStateToProps,
    { createEvent, getEvents, getEventsByAuthor, updateEvent, deleteEvent }
)(WeekViewPage);