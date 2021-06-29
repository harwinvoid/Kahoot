/*
 * @Author: yanghuayun
 * @Date: 2021-06-29 21:02:52
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-29 23:03:44
 * @Description: file content
 */

import React, { useEffect, useState } from "react";

import {
    makeStyles,
    Typography,
    Grid,
    TextField,
    Button,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";

import { ArrowBackRounded } from "@material-ui/icons";

import { useContract } from "../../hooks";
import { abi, contract } from "../../config";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { IContestItem } from "../../interface";
import { formatItem } from "../Index";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        display: "flex",
        height: "calc(100vh - 120px)",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    desc: {
        marginTop: theme.spacing(),
    },
    title: {
        textAlign: "center",
        flexGrow: 1,
    },
    input: {
        width: 300,
        marginTop: theme.spacing(3),
    },
    listContainer: {
        marginTop: theme.spacing(4),
        justifyContent: "center",
        color: "#fff",
    },
    btn: {
        marginTop: theme.spacing(3),
    },
    back: {
        marginBottom: 16,
        cursor: 'pointer',
        width: 48,
        height: 48,
        border: '1px solid #fff',
        borderRadius: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const Detail: React.FC = () => {
    const styles = useStyles();
    const history = useHistory();

    //@ts-ignore
    const { address } = useParams();

    const [userName, setUserName] = useState("");

    const { active } = useWeb3React<Web3Provider>();

    //@ts-ignore
    const [contest, setContest] = useState<IContestItem>({});

    const contractInstance = useContract(contract, abi);

    console.log(active);

    useEffect(() => {
        init();
    }, [active]);

    const init = async () => {
        const data = await contractInstance?.getContestInfo();

        if (data) {
            const list = data.map((item: any) => formatItem(item));
            const item = list.find((item: any) => item.entranceToken === address);
            if (!item) {
                history.push("/");
                return;
            }
            setContest(() => item);
        }
    };

    const handleEnter = async () => {
        await contractInstance?.enter(userName, 0);
    };

    return (
        <Grid className={styles.listContainer} container spacing={4}>
            <Grid item justify="center" alignItems="center" xs={12} md={12}>
                <div onClick={() => history.push('/')} className={styles.back} >
                    <ArrowBackRounded />
                </div>

                <Typography variant="h2">Test Contest</Typography>
            </Grid>

            <Grid direction="column" item xs={12} md={8}>
                <Typography variant="h3">About</Typography>

                <Typography className={styles.desc} variant="body1">
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

                <TextField
                    className={styles.input}
                    label="Input your userName"
                    color="secondary"
                    variant="outlined"
                    onChange={(e: any) => setUserName(e.target.value)}
                />

                <div className={styles.btn}>
                    <Button
                        disabled={!userName && !active}
                        onClick={handleEnter}
                        variant="contained"
                        color="primary"
                    >
                        Enter Contest
                    </Button>
                </div>
            </Grid>

            <Grid direction="column" item xs={12} md={4}>
                <Typography variant="h3">Contest Data</Typography>

                <Typography className={styles.desc} variant="subtitle1">
                    Entrance Fee: {contest.entranceFee}
                </Typography>

                <Typography variant="subtitle1">
                    {contest.numberOfContestants} of Contestants
                </Typography>

                <Typography variant="subtitle1">
                    hosting Fee: {contest.hostingFee}
                </Typography>

                <Typography variant="subtitle1">
                    Reward Amount: {contest.rewardAmount}
                </Typography>

                <Typography variant="subtitle1">
                    Ended: {contest.ended ? "Yes" : "No"}
                </Typography>

                <div className={styles.btn}>
                    <Button variant="outlined" color="primary">
                        Get Entrance Token
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

export default Detail;
