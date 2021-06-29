import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import useSWR from 'swr';
import { fetcher } from "../utils";



const useBalance = () => {
    const { account, library } = useWeb3React<Web3Provider>();
    const { data: balance } = useSWR(['getBalance', account, 'latest'], {
        fetcher: fetcher(library),
    });
    return balance ? parseFloat(formatEther(balance)).toPrecision(4) : '...';
}

export default useBalance