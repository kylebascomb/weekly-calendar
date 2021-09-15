import React, { useState} from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider } from "@material-ui/core";
import moment from 'moment';


const TimeView = (props) => {

    const createTimes = () => {
        let list = [];
        let cur = moment().startOf('day');
        let endDay = moment(cur).endOf('day');

        while (cur.isBefore(endDay)) {
            let tempStart = moment(cur);
            list.push(tempStart);
            cur.add(props.intervalMin, 'minutes')

        }

        return list;
    }

    const [times] = useState(createTimes);

    return (
        <Box >
            <Box p={0} height={32}></Box>


            {times.map((time) => (
                <Box key={time}>
                    <Divider />
                    <Box p={0} height={83}>
                        <Grid container wrap="nowrap" spacing={0}>
                        <Typography align="center" variant="h6"> {time.format('LT')} </Typography>
                        </Grid>

                    </Box>

                </Box>
            ))}
        </Box>

    );
}

export default TimeView;