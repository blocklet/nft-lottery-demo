import { useMemo, useRef, useState } from 'react';
import { Container, AppBar, Toolbar, Typography, makeStyles, Button, Link } from '@material-ui/core';
import { useRequest } from 'ahooks';

import Lottery from './components/lottery';
import './assets/lottery.css';

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

  const state = useRequest(async () => {
    const res = await fetch('/api/nft/factory');
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
      <AppBar position="absolute" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6">Blocklet Demo</Typography>
        </Toolbar>
      </AppBar>
      {state.data && state.data.length > 0 && (
        <main className={classes.main}>
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
        </main>
      )}
    </Container>
  );
}

export default App;
