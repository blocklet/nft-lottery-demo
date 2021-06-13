import { useMemo, useRef, useState } from 'react';
import { Container, AppBar, Toolbar, Typography, makeStyles, Button, Link } from '@material-ui/core';
import { useRequest } from 'ahooks';

import Lottery from './components/lottery';
import './assets/lottery.css';
import { basename } from './libs/utils';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 64,
  },
  main: {
    padding: 20,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& q': {
      background: 'rgba(135,131,120,0.15)',
      color: '#EB5757',
      borderRadius: '3px',
      padding: '1px 5px',
    },
    '& .LotteryBox2': {
      position: 'relative',
      paddingTop: '100%',
      width: '600px',
      display: 'inline-block',
    },
    '& .drawBox': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
      borderColor: '#ccc',
      maxWidth: '90vw',
      maxHeight: '90vw',
    },
    '& .drawCell, & .start-cell': {
      borderRight: '2px solid #eee',
      borderBottom: '2px solid #eee',
    },
    '& .drawCell': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      backgroundColor: '#fff!important',

      fontSize: 22,
      position: 'relative',
      '&.active': {
        borderColor: 'red',
        // borderWidth: 2,
      },
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
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: 400,
    marginLeft: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
    width: 200,
    height: 200,
    margin: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
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
  rules: {
    listStyle: 'numerical',
    fontSize: 16,
    lineHeight: 2,
    margin: '20px 0px 20px 1em',
    padding: 0,
  },
  game: {
    display: 'flex',
    padding: 50,
    backgroundColor: '#eee',
    borderRadius: 12,
    overflow: 'auto',
  },
}));

function App() {
  const classes = useStyles();
  const luckRef = useRef(null);
  const [ing, setIng] = useState(false);
  const [index, setIndex] = useState();

  const state = useRequest(async () => {
    const res = await fetch(`${basename}api/nft/factory`);
    const data = await res.json();
    return data;
  });

  const listMap = useMemo(() => {
    if (state.data) {
      return state.data.length > 4
        ? {
            0: 0,
            2: 2,
            7: 3,
            3: 4,
            5: 5,
          }
        : {
            1: 0,
            3: 1,
            5: 2,
            7: 3,
          };
    }
    return {};
  }, [state.data]);

  const list = useMemo(() => {
    if (state.data && state.data.length > 0) {
      return Array(8)
        .fill()
        .map((item, index) => {
          const targetIndex = listMap[index];
          const temp = targetIndex !== undefined ? state.data[targetIndex] : null;
          return temp;
        });
    }
    return [];
  }, [state.data]);

  function luckStart() {
    if (ing) return;
    setIng(true);
    const num = Math.floor(Math.random() * 8);
    luckRef.current.start(num, res => {
      setIndex(res);
      setIng(false);
    });
  }
  function getDisplay(item) {
    return item ? <img src={`${item.display.content}?factory=${item.address}`} /> : 'Try again';
  }
  return (
    <Container className="container">
      {/* <AppBar position="absolute" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6">Blocklet Demo</Typography>
        </Toolbar>
      </AppBar> */}
      <main className={classes.main}>
        {state.data && state.data.length > 0 && (
          <div className={classes.game}>
            <div className={classes.left}>
              <Lottery className="lottery" itemClass="drawCell" ref={luckRef}>
                <div className="drawBox flex-app flex-wrap-wrap">
                  {[0, 1, 2, 7].map(item => (
                    <div className="drawCell flex-box-4" data-index={item} key={item} data-price={list[item]?.price}>
                      {getDisplay(list[item])}
                    </div>
                  ))}
                  <button className="flex-box-4 start-cell" onClick={luckStart}>
                    <div className="start-cell--btn">Start</div>
                  </button>
                  {[3, 6, 5, 4].map(item => (
                    <div className="drawCell flex-box-4" data-index={item} key={item} data-price={list[item]?.price}>
                      {getDisplay(list[item])}
                    </div>
                  ))}
                </div>
              </Lottery>
            </div>
            <div className={classes.right}>
              <div>
                <Typography component="h3" variant="h4">
                  NFT Lottery Game
                </Typography>
                <ul className={classes.rules}>
                  <li>
                    Click{' '}
                    <q>
                      <code>START</code>
                    </q>{' '}
                    button to start game
                  </li>
                  <li>
                    You can click{' '}
                    <q>
                      <code>TRY AGAIN</code>
                    </q>{' '}
                    to restart game
                  </li>
                  <li>
                    If the result is a tangram chart, you can click{' '}
                    <q>
                      <code>BUY</code>
                    </q>{' '}
                    to purchase this nft via NFT-store
                  </li>
                </ul>
              </div>
              <Typography className={classes.result}>{index !== undefined ? getDisplay(list[index]) : null}</Typography>
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
                    {Object.keys(listMap).includes(index.toString()) && (
                      <Link
                        href={`/store/purchase/${list[index].address}?cb=${location.href}`}
                        style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" color="primary" style={{ marginLeft: 10 }}>
                          Buy
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </Container>
  );
}

export default App;
