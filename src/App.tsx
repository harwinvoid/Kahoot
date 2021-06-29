/*
 * @Author: yanghuayun
 * @Date: 2021-06-28 20:50:58
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-29 21:18:13
 * @Description: file content
 */
import React, { useState } from 'react';

import { Typography, Toolbar, Button, makeStyles, Container } from '@material-ui/core';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { connectorsByName } from './config';

import Index from './pages/Index';
import './App.css';
import { useBalance } from './hooks';
import Detail from './pages/Detail';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: theme.spacing(),
    background: 'inear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#fff',
    fontWeight: 'bold'
  },
}));

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const Wallet = () => {
  const [login, setLogin] = useState(false);
  const balance = useBalance();
  const { activate } = useWeb3React<Web3Provider>();

  const connectWallet = async () => {
    await activate(connectorsByName.injected)
    setLogin(true)
  }

  return (
    login ? <Button variant='text' color="primary">{balance} FTM</Button> :
      <Button onClick={connectWallet} variant='outlined' color="primary">Connect Wallet</Button>
  )
}

const App = () => {
  const classes = useStyles();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className={classes.root}>
        <div className={classes.header}>
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              StakeSteak x FTMAlerts
            </Typography>
            <Wallet></Wallet>
          </Toolbar>
        </div>
        <Container>
          <BrowserRouter>
            <Switch>
              <Route exact path='/'>
                <Index />
              </Route>
              <Route exact path='/:address'>
                <Detail />
              </Route>
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    </Web3ReactProvider>
  )
}

export default App;
