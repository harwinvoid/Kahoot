/*
 * @Author: yanghuayun
 * @Date: 2021-06-29 01:05:48
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-30 02:45:41
 * @Description: file content
 */

import { Contract } from "@ethersproject/contracts"
import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { useMemo } from "react"
import { getContract } from "../utils"


const useContract = (address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null => {
    const { account, library } = useWeb3React<Web3Provider>();

    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export default useContract;
