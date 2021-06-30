/*
 * @Author: yanghuayun
 * @Date: 2021-06-28 21:03:58
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-30 21:31:14
 * @Description: file content
 */

import React, { useEffect, useState } from "react";

import { TextField, Typography, InputAdornment, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { SearchOutlined } from '@material-ui/icons'
import { useContract } from "../../hooks";
import { ABI, contract } from "../../config";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useDebouncedCallback } from 'use-debounce';
import ContestCard from "./ContestCard";
import { IContestItem } from "../../interface";

const useStyles = makeStyles((theme) => ({
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
        flexGrow: 1,
        marginTop: 48,
        marginBottom: 64,
    },
    input: {
        fontSize: 64,
    },

    listContainer: {
        marginTop: 128,
        justifyContent: 'center'
    },

    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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

    const { active } = useWeb3React<Web3Provider>();

    const [totalList, setTotalList] = useState<IContestItem[]>([]);

    const [filterList, setFilterList] = useState<IContestItem[]>([]);

    const contractInstance = useContract(contract, ABI);

    useEffect(() => {
        init()
    }, [active])

    const init = async () => {
        const data = await contractInstance?.getContestInfo();

        if (data) {
            const list = data.map((item: any) => formatItem(item));
            console.log(list)
            setFilterList(() => list);
            setTotalList(() => list);
        }

    }

    const handleSearch = useDebouncedCallback((e: any) => {
        const search = e.target.value;
        if (search === '') {
            setFilterList(() => totalList);
            return;
        }
        const list = totalList.filter(item => item.contestName.indexOf(search) !== -1)
        setFilterList(() => list);
    }, 800, { leading: false })

    return (
        <div>
            <div className={styles.card}>
                <Typography className={styles.title} variant="h3">
                    StakeSteak x FTMAlerts
                </Typography>
                <div>
                    <TextField
                        InputProps={{
                            onChange: handleSearch,
                            className: styles.input,
                            startAdornment: (
                                <InputAdornment position="end">
                                    <SearchOutlined color='secondary' fontSize="large" />
                                </InputAdornment>
                            ),
                        }}
                        size='medium'
                        color='secondary'
                        placeholder='Search Contest Name'
                        id="standard-basic"
                        onChange={handleSearch}
                    />
                </div>

                <Grid className={styles.listContainer} container spacing={4}>
                    {
                        filterList.map((item, index) => (
                            <Grid item className={styles.center} xs={12} md={3}>
                                <ContestCard index={index} item={item}></ContestCard>
                            </Grid>))
                    }
                </Grid>

            </div>

            {/* <Paper  className={styles.card}>
                <Typography variant='h5'>
                    FAQ
                </Typography>
            </Paper> */}
        </div>
    )

}

export default Index;