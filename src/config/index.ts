/*
 * @Author: yanghuayun
 * @Date: 2021-06-28 21:00:05
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-30 20:17:19
 * @Description: file content
 */
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

import contractInterface from '../sol/abi.json';

import erc20Interface from '../sol/erc20.json';

export const contract = '0xe6419A52F84f4A95cE0f8dE2f9FD9683321BeD2e';

export const ABI = contractInterface;

export const ERC20_ABI = erc20Interface;

export const NETWORK_CHAIN_ID: number = parseInt('250')

export enum ConnectorNames {
    Injected = "injected",
}
const NETWORK_URL = 'https://rpc.ftm.tools/';

export const injected = new InjectedConnector({
    supportedChainIds: [250],
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
    rpc: { [NETWORK_CHAIN_ID]: NETWORK_URL },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000,
})

// mainnet only
export const walletlink = new WalletLinkConnector({
    url: NETWORK_URL,
    appName: 'Uniswap',
    appLogoUrl:
        'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
}
