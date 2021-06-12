import { useRef, useState } from 'react';
import { Container, AppBar, Toolbar, Typography, makeStyles, Button } from '@material-ui/core';
import Lottery from './components/lottery';
import './assets/lottery.css';
import gift1 from './assets/gifts/1.svg';
import gift2 from './assets/gifts/2.svg';
import gift3 from './assets/gifts/3.svg';
import gift4 from './assets/gifts/4.svg';
import gift5 from './assets/gifts/5.svg';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 64,
  },
  main: {
    padding: 20,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& .drawBox': {
      borderColor: '#ccc',
      width: '60vh',
      height: '60vh',
      maxWidth: '90vw',
      maxHeight: '90vw',
    },
    '& .drawCell': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      backgroundColor: '#fff!important',
      border: '1px solid #eee',
      fontSize: 22,
      position: 'relative',
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
      },
      '&:before': {
        content: 'attr(data-price)',
        position: 'absolute',
        fontSize: 16,
        color: '#ff5252',
        lineHeight: '30px',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
      },
    },
    '& .start-cell': {
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .start-cell--btn': {
      backgroundColor: '#ff5252 !important',
      color: '#fff',
      width: '60%',
      height: '60%',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 28,
    },
  },
  result: {
    width: 200,
    height: 200,
    margin: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ddd',
    padding: 20,
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
    '&:empty': {
      position: 'relative',
      '&::before': {
        content: '"Click Start"',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
}));

function App() {
  const classes = useStyles();
  const luckRef = useRef(null);
  const [ing, setIng] = useState(false);
  const [index, setIndex] = useState();

  const list = {
    0: <img src={gift1} />,
    1: 'Try again',
    2: <img src={gift2} />,
    7: <img src={gift3} />,
    3: <img src={gift4} />,
    6: 'Try again',
    5: <img src={gift5} />,
    4: 'Try again',
  };
  const price = {
    0: '6.18 TBA',
    2: '1.68 TBA',
    7: '8.16 TBA',
    3: '1.86 TBA',
    5: '8.88 TBA',
  };

  function luckStart() {
    if (ing) return;
    setIng(true);
    const num = Math.floor(Math.random() * 8);
    luckRef.current.start(num, res => {
      setIndex(res);
      setIng(false);
    });
  }
  return (
    <Container className="container">
      <AppBar position="absolute" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6">Blocklet Demo</Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <Lottery className="lottery" itemClass="drawCell" ref={luckRef}>
          <div className="drawBox flex-app flex-wrap-wrap">
            {[0, 1, 2, 7].map(item => (
              <div className="drawCell flex-box-4" data-index={item} key={item} data-price={price[item]}>
                {list[item]}
              </div>
            ))}
            <button className="flex-box-4 start-cell" onClick={luckStart}>
              <div className="start-cell--btn">Start</div>
            </button>
            {[3, 6, 5, 4].map(item => (
              <div className="drawCell flex-box-4" data-index={item} key={item} data-price={price[item]}>
                {list[item]}
              </div>
            ))}
          </div>
        </Lottery>
        <Typography className={classes.result}>{index !== undefined ? list[index] : null}</Typography>
        <div>
          {index === undefined ? (
            <Button variant="contained" color="primary" onClick={luckStart}>
              Start
            </Button>
          ) : (
            <>
              <Button variant="contained" color="primary" onClick={luckStart}>
                Try again
              </Button>
              {[(1, 4, 6)].includes(+index) || (
                <Button variant="outlined" color="primary" style={{ marginLeft: 10 }}>
                  Buy
                </Button>
              )}
            </>
          )}
        </div>
      </main>
    </Container>
  );
}

export default App;
