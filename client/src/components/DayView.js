import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Divider } from "@material-ui/core";
import moment from 'moment';
import Event from './Event.js'


const DayView = (props) => {

    const getDurationInMinutes = (date1, date2) =>{
        const diffInMs = Math.abs(new Date(date2) - new Date(date1));
        return diffInMs / (1000 * 60 );
    }

    const createTimes = () => {
        let list = [];
        let cur = moment(props.curDate).startOf('day');
        let endDay = moment(cur).endOf('day');
        let events = [...props.events]

        while (cur.isBefore(endDay)) {
            let tempStart = moment(cur);
            let tempEnd = moment(cur).add(props.intervalMin, 'minutes');
            let found = false;
            
            events.forEach((event) => {
                if (tempStart.isSame(event.startTime)) {
                    list.push({
                        event: event,
                        duration: getDurationInMinutes(event.startTime, event.endTime),
                        blockStart: tempStart,
                        blockEnd: moment(event.endTime)
                    })
                    
                    cur = moment(event.endTime);
                    found = true;
                }
            })
            if (!found) {
                //push an empty block
                list.push({
                    blockStart: tempStart,
                    blockEnd: tempEnd,
                    duration: 15
                });
                cur.add(props.intervalMin, 'minutes')
            }

            
        }

        return list;
    }

    const [times, setTimes] = useState(createTimes);

    useEffect(() => {
        setTimes(createTimes);
    }, props.events);

    return (
            <Box >
                <Typography align="center" variant="h6"> {moment(props.curDate).format('dddd')} </Typography>
                    {times.map((block) => (
                        <Box 

                            >
                        <Divider />
                        <Event
                            block={block}
                            onClick={props.onClick} 
                            loading={props.loading}
                            onChange={props.onChange}
                            onBlur={props.onBlur}
                            onSubmit={props.onSubmit}
                            onUpdate={props.onUpdate}
                            onDelete={props.onDelete}
                            setStart={props.setStart}
                            setEnd={props.setEnd}
                            setEvent={props.setEvent}
                            event={props.event}
                            onMouseDown={props.onMouseDown}
                            onMouseUp={props.onMouseUp}
                            />
                            
                        </Box>
                    ))}
            </Box>

    );
}

export default DayView;