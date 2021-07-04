/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: yanghuayun
 * @Date: 2021-06-28 20:50:58
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-07-04 23:42:31
 * @Description: file content
 */
import React, { useEffect, useState } from 'react';

import { Toolbar, Box, Button, Container, Chip } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import { ArrowBackRounded } from "@material-ui/icons";


import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ToastContainer, toast } from 'react-toastify';
import { connectorsByName } from './config';

import Index from './pages/Index';
import Detail from './pages/Detail';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    cursor: 'pointer',
    width: 32,
    height: 32,
    border: '1px solid #fff',
    borderRadius: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const Wallet = () => {
  const [login, setLogin] = useState(false);
  const { activate, error, active, account } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (error) {
      toast(error.message, { type: 'error', autoClose: 3000 })
      return
    }
    setLogin(active);
  }, [error, active])

  const connectWallet = async () => {
    activate(connectorsByName.injected)
  }

  return (
    <div style={{ marginLeft: 'auto' }}>
      {login ? <Chip color="primary" label={`🤑 ${account?.slice(0, 7)}...${account?.slice(-4)}`} variant="outlined" /> :
        <Button onClick={connectWallet} variant='outlined' color="primary">Connect with MetaMask</Button>}
    </div>

  )
}

const Header = () => {
  const classes = useStyles();

  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setShowBack(location.pathname !== '/')
    })
  }, [])
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        {/* {
          // eslint-disable-next-line no-restricted-globals
          showBack ? <Box sx={{ display: { md: 'none', xs: 'flex' } }} onClick={() => history.back()} className={classes.back} >
            <ArrowBackRounded color='action' />
          </Box> : null
        } */}
        <Wallet></Wallet>
      </div>
    </div>
  )
}

const App = () => {

  return (

    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Header></Header>
        <Container>
          <Switch>
            <Route exact path='/'>
              <Index />
            </Route>
            <Route exact path='/:cid/:token'>
              <Detail />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>

    </Web3ReactProvider>
  )
}

export default App;
