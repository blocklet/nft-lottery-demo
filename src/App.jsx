import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';

function App() {
  return (
    <Container className="container">
      <AppBar position="absolute" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6">Blocklet Demo</Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default App;
