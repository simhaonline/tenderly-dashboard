import {NetworkAppToApiTypeMap, NetworkTypes, ProjectTypes} from "./Common/constants";


const exampleContractSource = `pragma solidity ^0.4.25;

contract ExampleContract {
    uint storedFunds;
    uint reservedFunds;
    address owner;

    function setFunds(uint funds) internal {
        reservedFunds = funds;
    }

    function getFunds() public view returns (uint) {
        return storedFunds;
    }
    
    function hasEnoughFunds(uint extractAmount) internal view returns (bool) {
        return reservedFunds >= extractAmount;
    }
    
    function isAuthorized(address src) internal view returns(bool) {
        if (src == address(this) || src == owner) {
            return true;
        } else {
            return false;
        }
    }
    
    function transferToReserve(uint amount) internal {
        require(storedFunds > amount);
        
        setFunds(amount);
    }
    
    function sendFunds(uint amount, address to) internal {
        if (!hasEnoughFunds(amount)) {
            transferToReserve(amount);
        }
        
        transfer(amount, to);
    }
    
    function transfer(uint amount, address to) internal {
        to.transfer(amount);
    }
    
    function extractFunds(uint amount, address src, address to) public {
        isAuthorized(src);
        
        sendFunds(amount, to);
    }
}`;

export const exampleProjectPayload = {
    slug: 'example-project',
    name: 'Example Project',
    last_push_at: Date.now(),
    created_at: Date.now(),
    type: ProjectTypes.DEMO,
};

export const exampleContract1Payload = {
    address: '0x06012c8cf97bead5deae237070f9587f8e7a266a',
    contract_name: 'ExampleContract',
    network_id: NetworkAppToApiTypeMap[NetworkTypes.MAIN],
    created_at: Date.now(),
    number_of_exceptions: 1,
    data: {
        source: exampleContractSource,
    },
};

export const exampleContract2Payload = {
    address: '0x4B17B0750920ABA4ECf5aFCD4C7d4985F8180f7B',
    contract_name: 'ExampleContract',
    network_id: NetworkAppToApiTypeMap[NetworkTypes.KOVAN],
    created_at: Date.now(),
    last_event_occurred_at: Date.now(),
    number_of_exceptions: 0,
    data: {
        source: exampleContractSource,
    },
};

export const exampleEvent1Paylod = {
    transaction_id: '0x574491ab4ab459848e91de6abf501e6eae72a3b7cf489b60e4c23436c4cf2679',
    contract_address: '0x06012c8cf97bead5deae237070f9587f8e7a266a',
    block_number: '7430607',
    CreatedAt: Date.now(),
    Method: 'transferToReserve',
    StackTrace: [
        {
            code: "require(storedFunds > amount)",
            contract: "0x06012c8cf97bead5deae237070f9587f8e7a266a",
            length: 36,
            line: 29,
            name: "ExampleContract",
            method: "transferToReserve",
            op: "REVERT",
            start: 42703,
        },
        {
            code: "transferToReserve(amount)",
            method: 'sendFunds',
            contract: "0x06012c8cf97bead5deae237070f9587f8e7a266a",
            length: 36,
            line: 36,
            name: "ExampleContract",
            op: "REVERT",
            start: 42703,
        },
        {
            code: "sendFunds(amount, to)",
            method: "extractFunds",
            contract: "0x06012c8cf97bead5deae237070f9587f8e7a266a",
            length: 36,
            line: 49,
            name: "ExampleContract",
            op: "REVERT",
            start: 42703,
        },
        {
            code: "extractFunds(uint amount, address src, address to)",
            calling_method: true,
            contract: "0x06012c8cf97bead5deae237070f9587f8e7a266a",
            caller_address: '',
            line: 46,
            name: "ExampleContract",
            op: "REVERT",
        }
    ],
};
