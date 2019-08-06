import {CompanyTypes, NetworkTypes} from "../Common/constants";

const knownCompanyContractsMap = {
    [`${NetworkTypes.MAIN}:0x818e6fecd516ecc3849daf6845e3ec868087b755`]: CompanyTypes.KYBER_NETWORK,
    [`${NetworkTypes.MAIN}:0x9ae49c0d7f8f9ef4b864e004fe86ac8294e20950`]: CompanyTypes.KYBER_NETWORK,
    [`${NetworkTypes.MAIN}:0x21433dec9cb634a23c6a4bbcce08c83f5ac2ec18`]: CompanyTypes.KYBER_NETWORK,
    [`${NetworkTypes.MAIN}:0xdd974d5c2e2928dea5f71b9825b8b646686bd200`]: CompanyTypes.KYBER_NETWORK,
    [`${NetworkTypes.MAIN}:0x5d154c145db2ca90b8ab5e8fe3e716afa4ab7ff0`]: CompanyTypes.KYBER_NETWORK,
};

/**
 * @param {Contract} contract
 * @return {boolean}
 */
export function isRecognizedCompanyContract(contract) {
    return !!knownCompanyContractsMap[contract.getUniqueId()];
}

/**
 * @param {Contract} contract
 * @return {CompanyTypes}
 */
export function getContractCompany(contract) {
    return knownCompanyContractsMap[contract.getUniqueId()];
}
