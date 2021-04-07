import './App.css';
import {Box, Container, Grid, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    height: `20vh`
  }
}))

function App() {

  const classes = useStyles()

  return (
    <div className="App">
      <Box>
        <Container maxWidth={`lg`}>
          <Grid container
                direction={`column`}
          >
            <Grid item
                  className={classes.grid}
            >
              <Paper variant={`outlined`}>
                <Typography variant={`h5`}>Test1</Typography>
              </Paper>
            </Grid>

            <Grid item
                  className={classes.grid}
            >
              <Paper variant={`outlined`}>
                <Typography variant={`h5`}>Test1</Typography>
              </Paper>
            </Grid>

            <Grid item
                  className={classes.grid}
            >
              <Paper variant={`outlined`}>
                <Typography variant={`h5`}>Test1</Typography>
              </Paper>
            </Grid>

            <Grid item
                  className={classes.grid}
            >
              <Paper variant={`outlined`}>
                <Typography variant={`h5`}>Test1</Typography>
              </Paper>
            </Grid>

            <Grid item
                  className={classes.grid}
            >
              <Paper variant={`outlined`}>
                <Typography variant={`h5`}>Test1</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default App;
