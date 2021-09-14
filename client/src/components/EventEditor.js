import React from "react";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {
    TimePicker
} from '@material-ui/pickers';

import Toolbar from '@material-ui/core/Toolbar';

import {
    Box,
    TextField,
    TextareaAutosize,
    Checkbox,
    Button,
    FormGroup,
    FormControlLabel,
    FormLabel,
    Divider,
    Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    title: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    creator: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    formGroup: {
        alignItems: 'center',
    },
    buttonBar: {
        justifyContent: "center",
    },
    submit: {
        padding: 2
    }
});

const EventEditor = (props) => {
    const classes = useStyles();

    const updateAction = (e) => {
        props.onUpdate(e);
        props.handleClose(e);
    }

    const deleteAction = (e) => {
        props.onDelete(e);
        props.handleClose(e);
    }

    const addAction = (e) => {
        props.onSubmit(e);
        props.handleClose(e);
    }

    return (
        <Container maxWidth="xs">
            <Box
                overflow="auto"
            >
                <Box className={classes.title} p={2}>
                    <TextField
                        placeholder="New Event"
                        name="title"
                        value={props.event.title}
                        onChange={(e) => props.onChange(e)}></TextField>
                </Box>
                <Box p={2}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>

                        <TimePicker
                            autoOk
                            label="Start Time"
                            name="startTime"
                            clearable
                            disablePast
                            minutesStep={15}
                            value={props.event.startTime}
                            onChange={props.setStart}

                        />

                        <TimePicker
                            autoOk
                            label="End Time"
                            name="endTime"
                            clearable
                            disablePast
                            minutesStep={15}
                            value={props.event.endTime}
                            onChange={props.setEnd}
                        />

                    </MuiPickersUtilsProvider>
                </Box>
                <Box className={classes.creator} p={2} >
                    <TextareaAutosize
                        rowsMin={7}
                        rowsMax={7}
                        style={{ width: "100%" }}
                        placeholder="Event Description."
                        value={props.event.description}
                        name="description"
                        onChange={(e) => props.onChange(e)}
                    />
                </Box>
                {/** Repeating Checkboxes
                    <Box align="center">
                        <FormLabel component="legend" >Repeating</FormLabel>
                        <FormGroup row class={classes.formGroup}>
                            <FormControlLabel control={<Checkbox />} label='Mon' labelPlacement='Top' />
                            <FormControlLabel control={<Checkbox />} label='Tue' labelPlacement='Top' />
                            <FormControlLabel control={<Checkbox />} label='Wed' labelPlacement='Top' />
                            <FormControlLabel control={<Checkbox />} label='Thur' labelPlacement='Top' />
                            <FormControlLabel control={<Checkbox />} label='Fri' labelPlacement='Top' />
                            <FormControlLabel control={<Checkbox />} label='Sat' labelPlacement='Top' />
                            <FormControlLabel control={<Checkbox />} label='Sun' labelPlacement='Top' />

                        </FormGroup>
                    </Box>
                    */}

                <Divider />
                <Toolbar className={classes.buttonBar} >
                    {!props.event._id &&

                        <Button
                            variant="contained"
                            color='primary'
                            onClick={(e) => addAction(e)}> Add Event </Button>

                    }
                    {props.event._id &&
                        <Box>
                            <Button
                                style={{ marginRight: 16 }}
                                variant="contained"
                                color='primary'
                                onClick={(e) => updateAction(e)}> Update Event </Button>

                            <Button
                                variant="contained"
                                color='primary'
                                onClick={(e) => deleteAction(e)}> Delete Event </Button>
                        </Box>
                    }
                </Toolbar>
            </Box>
        </Container>

    );
};

export default EventEditor;
