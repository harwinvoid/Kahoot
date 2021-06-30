/*
 * @Author: yanghuayun
 * @Date: 2021-06-30 20:16:50
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-30 20:19:21
 * @Description: file content
 */

import { Contract } from "@ethersproject/contracts";
import { useContract } from ".";
import { ERC20_ABI } from "../config";


const useTokenContract = (tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null => {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export default useTokenContract;