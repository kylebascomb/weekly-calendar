import React, { useState } from "react";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


// styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  gridtwo: {
    align: "center",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
}));


const SignUp = (props) => {
  const classes = useStyles();
  // react Hook Form
  const [ confirmPassword, setConfirmPassword ] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Grid className={classes.gridtwo} container>
          <div>
            <TextField
              name = "email"
              variant="outlined"
              color="secondary"
              type="email"
              label="Email"
              value={props.user.email}
              onChange={(e) => props.onChange(e)}
              helperText={props.user.errors.email ? props.user.errors.email : ""}
              onBlur={props.onBlur}
            />
          </div>

        </Grid>
        <Grid className={classes.gridtwo} container>
          <div>
            <TextField
              name = "firstname"
              variant="outlined"
              color="secondary"
              type="text"
              label="First Name"
              value={props.user.firstname}
              onChange={(e) => props.onChange(e)}
              helperText={props.user.errors.firstname ? props.user.errors.firstname : ""}
              onBlur={props.onBlur}
            />
          </div>

        </Grid>
        <Grid className={classes.gridtwo} container>
          <div>
            <TextField
              name = "lastname"
              variant="outlined"
              color="secondary"
              type="text"
              label="Last Name"
              value={props.user.lastname}
              onChange={(e) => props.onChange(e)}
              helperText={props.user.errors.lastname ? props.user.errors.lastname : ""}
              onBlur={props.onBlur}
            />
          </div>

        </Grid>
        <Grid className={classes.gridtwo} container>
          <div>
            <TextField
              name = "password"
              variant="outlined"
              color="secondary"
              type="password"
              label="Password"
              value={props.user.password}
              onChange={(e) => props.onChange(e)}
              helperText={props.user.errors.password ? props.user.errors.password : ""}
              onBlur={props.onBlur}
            />
          </div>
          <Grid className={classes.gridtwo} container>
          <div>
            <TextField
              name = "confirmPassword"
              variant="outlined"
              color="secondary"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText={props.user.errors.password ? props.user.errors.password : ""}
              onBlur={props.onBlur}
            />
          </div>

        </Grid>

        </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {props.user.password !== confirmPassword}
            onClick={(e) => props.onSubmit(e)}
          >
            Sign Up
          </Button>
      </div>
    </Container>
  );
}

export default SignUp;
