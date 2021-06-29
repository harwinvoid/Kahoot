/*
 * @Author: yanghuayun
 * @Date: 2021-06-29 00:55:28
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-29 01:15:06
 * @Description: file content
 */
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
import { AddressZero } from '@ethersproject/constants'
import { getAddress } from '@ethersproject/address'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

export const fetcher = (library: any) => (...args: any) => {
    const [method, ...params] = args
    return library[method](...params)
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}