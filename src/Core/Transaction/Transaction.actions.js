import {ErrorActionResponse} from "../../Common";
import {Api} from "../../Utils/Api";

import {Transaction} from "./Transaction.model";

export const FETCH_TRANSACTIONS_FOR_PROJECT_ACTION = 'FETCH_TRANSACTIONS_FOR_PROJECT';
export const FETCH_TRANSACTION_ACTION = 'FETCH_TRANSACTION_PROJECT';

const dummyTransactions = [
    {
        Addresses: ["0xd1ceeeeee83f8bcf3bedad437202b6154e9f5405"],
        BlockHash: "0xe850114a15d794eb936b402e3b97b1ed79a592110e7d831d529fa29e33417708",
        BlockNumber: 7649538,
        CumulativeGasUsed: 33716,
        From: "0x00000000c0293c8ca34dac9bcc0f953532d34e4d",
        Gas: 65000,
        GasPrice: 7000000000,
        GasUsed: 33716,
        Hash: "0x00014094ad1ab0ed7a99c142b4b3cfe8da5a894280ccafd052f439fd1b6b7d0a",
        Index: 38,
        Input: "0xca722cdc981a6d9fc6d19e2af13f4af349c702908af32dd81f9e5b3db6a50959278adc764fbe9e68333a24c68933af30d0b046d8ea5de0fcca3a20509fa5782cdad8d82e",
        NetworkID: "1",
        Nonce: 898995,
        Status: true,
        To: "0xd1ceeeeee83f8bcf3bedad437202b6154e9f5405",
        Value: "0x",
    },
    {
        Addresses: ["0xd1ceeeeee83f8bcf3bedad437202b6154e9f5405"],
        BlockHash: "0xe850114a15d794eb936b402e3b97b1ed79a592110e7d831d529fa29e33417708",
        BlockNumber: 7649538,
        CumulativeGasUsed: 33716,
        From: "0x00000000c0293c8ca34dac9bcc0f953532d34e4d",
        Gas: 65000,
        GasPrice: 7000000000,
        GasUsed: 33716,
        Hash: "0x00014094ad1ab0ed7a99c142b4b3cfe8da5a894280ccafd052f439fd1b6b7d0a",
        Index: 38,
        Input: "0xca722cdc981a6d9fc6d19e2af13f4af349c702908af32dd81f9e5b3db6a50959278adc764fbe9e68333a24c68933af30d0b046d8ea5de0fcca3a20509fa5782cdad8d82e",
        NetworkID: "1",
        Nonce: 898995,
        Status: false,
        To: "0xd1ceeeeee83f8bcf3bedad437202b6154e9f5405",
        Value: "0x",
    }
];

/**
 * @param {string} projectId
 * @param {Object[]} filters
 * @param {number} page
 * @param {number} limit
 * @return {Function}
 */
export const fetchTransactionsForProject = (projectId, filters, page = 1, limit = 25) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        try {
            // const {data} = await Api.get(`/account/${username}/project/${projectId}/events`, {
            //     params: {
            //         page,
            //     },
            // });

            const transactions = dummyTransactions.map(tx => Transaction.buildFromResponse({
                ...tx,
                Project: projectId,
            }));

            dispatch({
                type: FETCH_TRANSACTIONS_FOR_PROJECT_ACTION,
                projectId,
                transactions,
            });

            return transactions;
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};
