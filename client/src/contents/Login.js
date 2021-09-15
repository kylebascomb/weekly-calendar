import React from "react";
import { TextField, Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    background: "lightcyan",
    alignItems: "center",
  },
  container: {
    maxWidth: "xs",
    align: "center",
  },
  grid: {
    // marginTop: 2, 
  },
  gridtwo: {
    align: "center",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});

const Login = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="xs" align="center">
      <div className="Login">
        <Typography component="h1" variant="h5">
          Login
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
              helperText={props.user.errors.password ? props.user.errors.password : ""}
              onChange={(e) => props.onChange(e)}
            />
          </div>
        </Grid>

        <Grid className={classes.grid} container spacing={2} justify="center">
          <Grid item>
            <Button
              size="lg"
              disabled={false}
              variant="contained"
              onClick={(e) => props.onSubmit(e)}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" href="/signup" >
              Signup
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
