import {StreamingApi} from "../Api";

describe('StreamingApi', () => {
    describe('setAuthentication()', () => {
        test('should be setup when called', () => {
            // console.log(StreamingApi);

            expect(StreamingApi.authenticationSet).toBe(false);
        });

    });
});
