import {Api} from "../../Utils/Api";
import Contract from './Contract.model';
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {NetworkAppToApiTypeMap} from "../../Common/constants";
import {exampleContract1Payload, exampleContract2Payload} from "../../examples";
import {ContractMethod, ContractLog, Project} from "../models";

export const FETCH_CONTRACTS_FOR_PROJECT_ACTION = 'FETCH_CONTRACTS_FOR_PROJECT';
export const FETCH_CONTRACT_FOR_PROJECT_ACTION = 'FETCH_CONTRACT_FOR_PROJECT';
export const TOGGLE_CONTRACT_LISTENING_ACTION = 'TOGGLE_CONTRACT_LISTENING';
export const DELETE_CONTRACT_ACTION = 'DELETE_CONTRACT';
export const FETCH_CONTRACT_METHODS_ACTION = 'FETCH_CONTRACT_METHODS';
export const FETCH_CONTRACT_LOGS_ACTION = 'FETCH_CONTRACT_LOGS';

/**
 * @param {Project} project
 */
export const fetchContractsForProject = (project) => {
    return async dispatch => {
        try {
            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/contracts`);

            const projectId = Project.generateProjectId(project.slug, project.owner);

            let contracts = [];

            if (data) {
                data.forEach(contractResponse => {
                    const contract = Contract.buildFromResponse(contractResponse.contract, {
                        id: projectId,
                        listening: contractResponse.include_in_transaction_listing,
                    });

                    contracts.push(contract);

                    if (contractResponse.previous_versions) {
                        contractResponse.previous_versions.forEach(childContractResponse => {
                            const childContract = Contract.buildFromResponse(childContractResponse.contract, {
                                id: projectId,
                                listening: childContractResponse.include_in_transaction_listing,
                            }, contract.address);

                            contracts.push(childContract);
                        });
                    }
                });
            }

            await dispatch({
                type: FETCH_CONTRACTS_FOR_PROJECT_ACTION,
                contracts,
                projectId,
            });

            return new SuccessActionResponse(contracts);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 *
 * @param {Project} project
 * @param {string} contractAddress
 * @param {NetworkTypes} network
 */
export const fetchContractForProject = (project, contractAddress, network) => {
    return async dispatch => {
        try {
            const apiNetworkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/contract/${apiNetworkId}/${contractAddress}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const contract = Contract.buildFromResponse(data.contract, {
                id: project.id,
                listening: data.include_in_transaction_listing,
            });

            await dispatch({
                type: FETCH_CONTRACT_FOR_PROJECT_ACTION,
                contract,
                projectId: project.id,
            });

            return new SuccessActionResponse(contract);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {Project} project
 * @param {string} txHash
 * @param {NetworkTypes} network
 */
export const fetchContractsForTransaction = (project, txHash, network) => {
    return async () => {
        try {
            const apiNetworkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/network/${apiNetworkId}/transaction/${txHash}/contracts`);

            const contracts = data.map(contract => Contract.buildFromResponse(contract, contract.in_project ? {
                id: project.id,
                listening: true,
            } : null));

            return new SuccessActionResponse(contracts);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }

    };
};

/**
 * @param {Project.id} projectId
 * @return {function(): SuccessActionResponse}
 */
export const fetchExampleContractsForTransaction = (projectId) => {
    return async () => {
        const contracts = [
            Contract.buildFromResponse(exampleContract1Payload, {
                id: projectId,
                listening: true,
            }),
            Contract.buildFromResponse(exampleContract2Payload, {
                id: projectId,
                listening: true,
            })
        ];

        return new SuccessActionResponse(contracts);
    }
};

/**
 *
 * @param {Project} project
 * @param {Contract} contract
 */
export const toggleContractListening = (project, contract) => {
    return async dispatch => {
        try {
            const apiNetworkId = NetworkAppToApiTypeMap[contract.network];

            const {data} = await Api.post(`/account/${project.owner}/project/${project.slug}/contract/${apiNetworkId}/${contract.address}/toggle`);

            if (!data || !data.success) {
                return new ErrorActionResponse();
            }

            dispatch({
                type: TOGGLE_CONTRACT_LISTENING_ACTION,
                projectId: project.id,
                contract: contract,
                network: contract.id,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 *
 * @param {Project} project
 * @param {string} contractAddress
 * @param {NetworkTypes} network
 */
export const deleteContract = (project, contractAddress, network) => {
    return async dispatch => {
        try {
            const apiNetworkId = NetworkAppToApiTypeMap[network];

            await Api.delete(`/account/${project.owner}/project/${project.slug}/contract/${apiNetworkId}/${contractAddress}`);

            dispatch({
                type: DELETE_CONTRACT_ACTION,
                projectId: project.id,
                contractId: Contract.generateUniqueContractId(contractAddress, network),
                network,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {Project} project
 * @param {string} contractAddress
 * @param {NetworkTypes} network
 */
export const fetchMethodsForContract = (project, contractAddress, network) => {
    return async dispatch => {
        try {
            const apiNetworkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/contract/${apiNetworkId}/${contractAddress}/methods`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const methods = data.map(method => ContractMethod.buildFromResponse(method));

            dispatch({
                type: FETCH_CONTRACT_METHODS_ACTION,
                contractId: Contract.generateUniqueContractId(contractAddress, network),
                methods,
            });

            return new SuccessActionResponse(methods);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {Project} project
 * @param {string} contractAddress
 * @param {NetworkTypes} network
 */
export const fetchLogsForContract = (project, contractAddress, network) => {
    return async dispatch => {
        try {
            const apiNetworkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/contract/${apiNetworkId}/${contractAddress}/logs`);

            if (!data || !data.events) {
                return new ErrorActionResponse();
            }

            const logs = data.events.map(log => ContractLog.buildFromResponse(log));

            dispatch({
                type: FETCH_CONTRACT_LOGS_ACTION,
                contractId: Contract.generateUniqueContractId(contractAddress, network),
                logs,
            });

            return new SuccessActionResponse(logs);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {Project} project
 * @param {Contract} contract
 */
export const getContractBackFillingStatus = (project, contract) => {
    return async dispatch => {
        try {
            const {data: responseData} = await Api.get(`/api/v1/account/${project.owner}/project/${project.slug}/network/${contract.network}/contract/${contract.address}/backfilling-status`);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};
