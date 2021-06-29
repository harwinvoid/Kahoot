/*
 * @Author: yanghuayun
 * @Date: 2021-06-28 21:03:58
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-29 21:06:07
 * @Description: file content
 */

import React, { useEffect, useState } from "react";

import { makeStyles, TextField, InputAdornment, Grid } from '@material-ui/core'

import { SearchOutlined } from '@material-ui/icons'
import { useContract } from "../../hooks";
import { abi, contract } from "../../config";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useDebouncedCallback } from 'use-debounce';
import ContestCard from "./ContestCard";
import { IContestItem } from "../../interface";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        display: 'flex',
        height: 'calc(100vh - 120px)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        flexGrow: 1,
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

    const contractInstance = useContract(contract, abi);

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
                        filterList.map(item => <Grid item className={styles.center} xs={12} md={3}>
                            <ContestCard item={item}></ContestCard>
                        </Grid>)
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