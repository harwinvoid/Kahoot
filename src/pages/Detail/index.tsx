/*
 * @Author: yanghuayun
 * @Date: 2021-06-29 21:02:52
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-29 21:09:03
 * @Description: file content
 */

import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core'

import { useContract } from "../../hooks";
import { abi, contract } from "../../config";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { IContestItem } from "../../interface";
import { formatItem } from "../Index";

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

const Detail: React.FC = () => {
    const styles = useStyles();

    const { active } = useWeb3React<Web3Provider>();

    const [contest, setContest] = useState<IContestItem[]>([]);

    const contractInstance = useContract(contract, abi);

    useEffect(() => {
        init()
    }, [active])

    const init = async () => {
        const data = await contractInstance?.getContestInfo();

        if (data) {
            const list = data.map((item: any) => formatItem(item));
            setContest(() => list[0]);
        }
    }

    return (
        <div>
            <div className={styles.card}>
                <div>
                    
                </div>
            </div>

            {/* <Paper  className={styles.card}>
                <Typography variant='h5'>
                    FAQ
                </Typography>
            </Paper> */}
        </div>
    )

}

export default Detail;