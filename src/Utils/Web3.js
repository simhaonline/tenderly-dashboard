import Web3 from 'web3';

function Web3Wrapper(callback) {
    return () => {
        if (window.web3Setup) {
            callback();
        } else {
            console.log('No Access');
        }
    }
}

export async function setupWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();

            console.log('allowed');
            window.web3Setup = true;
        } catch (error) {
            console.log('denied');
            // User denied account access...
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

export const getMetaMaskAccounts = Web3Wrapper(async () => {
    const test = await window.web3.eth.getAccounts();
});
