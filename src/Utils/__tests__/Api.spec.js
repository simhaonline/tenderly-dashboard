import {StreamingApi} from "../Api";

describe('StreamingApi', () => {
    describe('setAuthentication()', () => {
        test('should be setup when called', () => {
            expect(StreamingApi.authenticationSet).toBe(false);
        });

    });
});
