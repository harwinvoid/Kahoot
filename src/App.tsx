/*
 * @Author: yanghuayun
 * @Date: 2021-06-28 20:50:58
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-30 22:19:05
 * @Description: file content
 */
import React, { useEffect, useState } from 'react';

import { Toolbar, Button, Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ToastContainer, toast } from 'react-toastify';
import { connectorsByName } from './config';

import Index from './pages/Index';
import { useBalance } from './hooks';
import Detail from './pages/Detail';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: 8,
    display: 'flex',
    justifyContent: 'flex-end',
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
  const { activate, error, active } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (error) {
      toast(error.message, {type: 'error', autoClose: 3000})
      return
    }
    setLogin(active);
  }, [error, active])

  const connectWallet = async () => {
    activate(connectorsByName.injected)
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
      <ToastContainer></ToastContainer>
      <div className={classes.root}>
        <div className={classes.header}>
          <Toolbar>
            <Wallet></Wallet>
          </Toolbar>
        </div>
        <Container>
          <BrowserRouter>
            <Switch>
              <Route exact path='/'>
                <Index />
              </Route>
              <Route exact path='/:cid/:token'>
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
