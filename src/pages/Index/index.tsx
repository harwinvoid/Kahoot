/*
 * @Author: yanghuayun
 * @Date: 2021-06-28 21:03:58
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-07-04 23:38:34
 * @Description: file content
 */

import React, { useEffect, useState } from "react";

import { TextField, Grid, Button, Typography, Box, Autocomplete, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { SearchOutlined } from '@material-ui/icons'
import { useContract } from "../../hooks";
import { ABI, contract } from "../../config";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { IContestItem } from "../../interface";
import { useHistory } from "react-router-dom";

import ftmAlert from '../../assets/imgs/ftmalert.png';

import steakStake from '../../assets/imgs/steakStake.jpg';

const useStyles = makeStyles(() => ({
  card: {
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff'
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    marginBottom: 64,
  },
  input: {
    fontSize: 64,
  },

  listContainer: {
    marginTop: 128,
    justifyContent: 'center'
  },

  search: {
    marginTop: 64,
    width: 800,
    borderColor: '#fff',
    borderRadius: 64,

  },

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoCard: {
    background: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  projectDesc: {
    padding: '16px',
    fontSize: '20px',
    display: 'flex',
    height: '100%',
    boxSizing: 'border-box',
    flexDirection: 'column'
  }
}));

export const formatItem = (data: any): IContestItem => {

  const [tokenAddress, name, hostingFeeHex, entranceFeeHex, rewardAmountHex, numberOfContestantsHex, ended] = data;

  return {
    contestName: name,
    entranceToken: tokenAddress,
    hostingFee: hostingFeeHex.toNumber(),
    entranceFee: entranceFeeHex.toNumber(),
    rewardAmount: rewardAmountHex.toNumber(),
    numberOfContestants: numberOfContestantsHex.toNumber(),
    ended: ended,

  }
}

const Index: React.FC = () => {
  const styles = useStyles();

  const history = useHistory();

  const { active } = useWeb3React<Web3Provider>();

  const [totalList, setTotalList] = useState<IContestItem[]>([]);

  const contractInstance = useContract(contract, ABI);

  useEffect(() => {
    init()
  }, [active])

  const init = async () => {
    const data = await contractInstance?.getContestInfo();

    if (data) {
      const list = data.map((item: any) => formatItem(item));
      setTotalList(() => list);
    }

  }

  const handleToDetail = (e: any, value: any) => {
    const index = e.target.dataset['optionIndex'];
    const token = value.split(' | ')[1];
    if (!token) return
    history.push(`/${index}/${token}`);
  }

  return (
    <div>
      <Box
        sx={{
          marginTop: { md: '90px', xs: '16px' }
        }}
        className={styles.card}
      >
        <Typography
          className={styles.title}
          sx={{
            fontSize: { md: '64px', xs: '24px' }
          }}
        >
          StakeSteak x FTMAlert
        </Typography>

        <Autocomplete
          freeSolo
          onChange={(e, value) => {
            handleToDetail(e, value);
          }}
          disableClearable
          sx={{ width: { md: '800px', xs: '100%' } }}
          className={styles.search}
          options={totalList.map((option) => `${option.contestName} | ${option.entranceToken}`)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Search Contest'
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: <InputAdornment position='start'>
                  <SearchOutlined color='action' fontSize='large'></SearchOutlined>
                </InputAdornment>,
                style: {
                  borderRadius: 32,
                }
              }}
            />
          )}
        />

      </Box>

      <Grid style={{ marginTop: 88 }} className={styles.infoCard} container>
        <Grid item xs={12} md={2}>
          <img style={{ height: '100%', width: '100%' }} src={ftmAlert} />
        </Grid>

        <Grid item xs={12} md={10}>
          <Box sx={{
            fontSize: { md: '20px', xs: '16px' }
          }} className={styles.projectDesc}>

            FTM Alerts is comprised of a group of long-time Fantom Investors, supporters and community insiders. Our mission is very simple, to support those who choose to build within the Fantom Eco-system.
            We will focus exclusively on Fantom Opera built projects and interviewing those developers who are creating within the Eco-system.


            <Button
              sx={{
                width: { xs: '100%', md: '200px' },
                marginTop: { xs: '16px', md: 'auto' }
              }}
              style={{ marginLeft: 'auto' }} variant="contained"
              onClick={() => window.open('https://discord.gg/W8XxRfPy')}
            >Join FTM ALERT</Button>
          </Box>
        </Grid>
      </Grid>


      <Grid style={{ marginTop: 32, marginBottom: 64, flexWrap: 'wrap-reverse' }} className={styles.infoCard} container>

        <Grid item xs={12} md={10}>
          <Box
            sx={{
              fontSize: { md: '20px', xs: '16px' }
            }}
            className={styles.projectDesc}
          >
            StakeSteak is an experimental project that gives liquidity providers (LPs) less exposure to the underlying assets’ price risks. Currently, swaps on fantom (ie.SpiritSwap, SpookySwap, etc.) route through FTM, which means that LPs are incentivized to provide liquidity in pools that contain two risky assets (FTM pairs). In this context, risky assets mean that both assets are at risk ofhigh price fluctuation.
            <Button sx={{
              width: { xs: '100%', md: '200px' },
              marginTop: { xs: '16px', md: 'auto' }
            }}
              onClick={() => window.open('https://discord.gg/2V35UN5K')}
              style={{ marginRight: 'auto' }} variant="contained" >Join StakeSteak</Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <img style={{ height: '100%', width: '100%' }} src={steakStake} />
        </Grid>
      </Grid>
    </div>
  )

}

export default Index;