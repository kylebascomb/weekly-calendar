import React, { useState } from "react";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import EventEditor from "./EventEditor";

import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';


const EventButton = withStyles({
    root: {
      textTransform: 'none',
      fontSize: 16,
      backgroundColor: '#0063cc',
    },
  })(Button);

const Event = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    const handleClick = (event) => {
        if (!props.block.event) {
            props.block.event = {
                title: "",
                description: "",
                startTime: props.block.blockStart,
                endTime: props.block.blockEnd,
                errors: {}
            }
        } if (!open) {
            props.setEvent(props.block.event);
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        e.stopPropagation();
    };

    return (
        <Box p={0} onClick={handleClick} height={(20 * ((props.block.duration) / 15)) + (1 * ((props.block.duration) / 15) - 1)}>
            {props.block.event && props.block.event.title &&
                <EventButton 
                    color="primary"
                    variant="contained"
                    style={{ height: "99%", width:"98%" }}
                    onClick={handleClick}>
                    {props.block.event.title}

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >

                        <Box
                            border={2}
                            borderRadius={3}
                            borderColor="" >
                            <EventEditor
                                loading={props.loading}
                                event={props.event}
                                onChange={props.onChange}
                                onBlur={props.onBlur}
                                onSubmit={props.onSubmit}
                                onUpdate={props.onUpdate}
                                onDelete={props.onDelete}
                                setStart={props.setStart}
                                setEnd={props.setEnd}
                                handleClose={handleClose}
                            ></EventEditor>
                        </Box>
                    </Popover>
                </EventButton>
            }
            {props.block.event &&
                <Button
                    onClick={handleClick}>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >

                        <Box
                            border={2}
                            borderRadius={3}
                            borderColor="" >
                            <EventEditor
                                loading={props.loading}
                                event={props.event}
                                onChange={props.onChange}
                                onBlur={props.onBlur}
                                onSubmit={props.onSubmit}
                                onUpdate={props.onUpdate}
                                onDelete={props.onDelete}
                                setStart={props.setStart}
                                setEnd={props.setEnd}
                                handleClose={handleClose}
                            ></EventEditor>
                        </Box>
                    </Popover>
                </Button>
            }


        </Box>


    );


}

export default Event;