/*
 * @Author: yanghuayun
 * @Date: 2021-06-29 21:02:52
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-07-07 11:24:21
 * @Description: file content
 */

import React, { useEffect, useState } from "react";

import {
    Typography,
    Grid,
    TextField,
    Button,
} from "@material-ui/core";

import { LoadingButton } from '@material-ui/lab';

import { toast } from 'react-toastify';

import { makeStyles } from '@material-ui//styles'

import { useHistory, useParams } from "react-router-dom";

import { LockOutlined, ArrowRightAltOutlined } from "@material-ui/icons";

import { useContract } from "../../hooks";
import { ABI, contract } from "../../config";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MaxUint256 } from '@ethersproject/constants'
import { IContestItem } from "../../interface";
import { formatItem } from "../Index";
import useTokenContract from "../../hooks/useTokenContract";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: 16,
        display: "flex",
        height: "calc(100vh - 120px)",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    desc: {
        marginTop: 8,
    },
    title: {
        textAlign: "center",
        flexGrow: 1,
    },
    input: {
        width: 300,
        marginTop: 24,
    },
    listContainer: {
        marginTop: 32,
        justifyContent: "center",
        color: "#fff",
    },
    btn: {
        marginTop: 24,
    },
}));

const Detail: React.FC = () => {
    const styles = useStyles();
    const history = useHistory();

    const [approve, setApprove] = useState(false);

    //@ts-ignore
    const { cid, token } = useParams();

    const [userName, setUserName] = useState("");

    const [btnLoading, setBtnLoading] = useState(false);

    const { active, account } = useWeb3React<Web3Provider>();

    //@ts-ignore
    const [contest, setContest] = useState<IContestItem>({});

    const contractInstance = useContract(contract, ABI);

    const tokenContract = useTokenContract(token);

    console.log(active)

    useEffect(() => {
        if (active) {
            init();
        }
    }, [active]);

    const init = async () => {
        const data = await contractInstance?.getContestInfo();
        const allowance = await tokenContract?.allowance(account, contract);
        setApprove(allowance.gt(0));

        if (data) {
            const list = data.map((item: any) => formatItem(item));
            const item = list.find((item: any, index: number) => index === +cid);
            if (!item) {
                history.push("/");
                return;
            }
            setContest(() => item);
        }
    };

    const handleEnter = async () => {
        try {
            if (!approve) {
                const tx = await tokenContract?.approve(contract, MaxUint256);
                setBtnLoading(true);
                toast('Approving', { autoClose: false, type: 'success' })
                await tx.wait();
                toast.dismiss();
                setBtnLoading(false);
                const data = await tokenContract?.allowance(account, contract);
                setApprove(data.gt(0));
                return;
            }
            console.log(cid, token)
            await contractInstance?.enter(userName, cid);
        } catch (error) {
            toast(error.message, { autoClose: 3000, type: 'error' })
        }

    };

    return (
        <Grid className={styles.listContainer} container>
            <Grid style={{ marginBottom: '64px', display: 'flex', justifyContent: 'center' }} item xs={12} md={12}>
                <Typography variant="h3">🏆{contest.contestName}</Typography>
            </Grid>

            <Grid container xs={12} md={12}>
                <Grid direction="column" container spacing={2} xs={12} md={8}>
                    <Grid item><Typography variant="h4">About Contest</Typography></Grid>

                    <Grid item><Typography variant="body1">
                        t is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout. The point of
                        using Lorem Ipsum is that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content here', making it
                        look like readable English. Many desktop publishing packages and web
                        page editors now use Lorem Ipsum as their default model text, and a
                        search for 'lorem ipsum' will uncover many web sites still in their
                        infancy. Various versions have evolved over the years, sometimes by
                        accident, sometimes on purpose (injected humour and the like
                    </Typography>
                    </Grid>

                    <Grid item>
                        <TextField
                            inputProps={{
                                className: styles.input,
                            }}
                            label="Input your userName"
                            color="secondary"
                            variant="outlined"
                            sx={{
                                width: { md: 'auto', xs: '100%' }
                            }}
                            onChange={(e: any) => setUserName(e.target.value)}
                        />
                    </Grid>

                    <Grid item>
                        <LoadingButton
                            loading={btnLoading}
                            disabled={!userName || !active}
                            onClick={handleEnter}
                            variant="contained"
                            color="primary"
                            sx={{
                                width: { md: 'auto', xs: '100%' },
                                marginBottom: { md: 'auto', xs: '16px' },
                            }}
                            loadingPosition='end'
                            endIcon={approve ? <ArrowRightAltOutlined /> : <LockOutlined />}
                        >
                            {approve ? 'Enter Contest' : 'Approve'}
                        </LoadingButton>
                    </Grid>

                </Grid>
                <Grid container direction="column" spacing={2} xs={12} md={4}>
                    <Grid item>
                        <Typography variant="h4">Contest Data</Typography>
                    </Grid>


                    <Grid item>
                        <Typography variant="subtitle1">
                            Entrance Fee: {contest.entranceFee}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1">
                            {contest.numberOfContestants} of Contestants
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1">
                            hosting Fee: {contest.hostingFee}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1">
                            Reward Amount: {contest.rewardAmount}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1">
                            Ended: {contest.ended ? "Yes" : "No"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            sx={{
                                width: { md: 'auto', xs: '100%' },
                                marginBottom: { md: 'auto', xs: '16px' },
                            }}
                            onClick={() => window.open('https://dex.zoocoin.cash/orders/market?inputCurrency=FTM&outputCurrency=0x09e145A1D53c0045F41aEEf25D8ff982ae74dD56')}
                            variant="outlined" color="primary">
                            Get Entrance Token
                        </Button>
                    </Grid>
                </Grid>
            </Grid>


        </Grid>
    );
};

export default Detail;
