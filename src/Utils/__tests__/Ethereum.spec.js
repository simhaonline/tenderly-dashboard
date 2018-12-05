import {isValidAddress, isValidTransactionHash} from '../Ethereum';

describe('isValidAddress()', () => {
    test('A real address is valid', () => {
        expect(isValidAddress('0x15c12ac3219c156ad52fd8ea0de15bfb95deb7f5')).toBe(true);
    });

    test('If address is two characters shorter than should be false', () => {
        expect(isValidAddress('0x15c12ac3219c156ad52fd8ea0de15bfb95deb7')).toBe(false);
    });

    test('If address is two characters longer than should be false', () => {
        expect(isValidAddress('0x15c12ac3219c156ad52fd8ea0de15bfb95deb7f5a3')).toBe(false);
    });
});

describe('isValidTransactionHash()', () => {
    test('A real transaction hash is valid', () => {
        expect(isValidTransactionHash('0x276c2bf346b2c58f221d2a789c3ea0db21c43a2ab579a9798ed822c55583915c')).toBe(true);
    });

    test('If transaction hash is one characters shorter to be false', () => {
        expect(isValidTransactionHash('0x276c2bf346b2c58f221d2a789c3ea0db21c43a2ab579a9798ed822c55583915')).toBe(false);
    });

    test('If transaction hash is one characters longer to be false', () => {
        expect(isValidTransactionHash('0x276c2bf346b2c58f221d2a789c3ea0db21c43a2ab579a9798ed822c55583915ca')).toBe(false);
    });
});
