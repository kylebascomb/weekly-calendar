import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginRight: theme.spacing(6),
    },
}));

const NavigationBar = ({ auth, onClick }) => {

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar >
                    <Button align="left" edge="start" color="inherit" href="/" >
                        <Typography variant="h5" className={classes.title} >Week Forward</Typography>
                    </Button>
                    <Box style={{ flex: 1 }} />

                    {auth ? (
                        <Button variant="outlined" color="inherit" className={classes.menuButton} href="/calendar" >
                            My Calendar
                        </Button>
                    ) : (
                        <Button variant="outlined" color="inherit" className={classes.menuButton} href="/login" >
                            My Calendar
                        </Button>
                    )}

                    {auth ? (
                        <Button variant="outlined" color="inherit" className={classes.menuButton} onClick={onClick} href="/login" >
                            Logout
                        </Button>
                    ) : (
                        <Button variant="outlined" color="inherit" className={classes.menuButton}  href="/login" >
                            Login
                        </Button>
                    )}


                </Toolbar>
            </AppBar>
        </div>
    );


}

export default NavigationBar;