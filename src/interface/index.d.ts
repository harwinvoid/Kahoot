/*
 * @Author: yanghuayun
 * @Date: 2021-06-29 18:47:46
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-29 19:43:33
 * @Description: file content
 */

export interface IContestItem {
    entranceToken: string;
    contestName: string;
    entranceFee: number;
    hostingFee: number;
    rewardAmount: number;
    numberOfContestants: number;
    ended: boolean;
}
