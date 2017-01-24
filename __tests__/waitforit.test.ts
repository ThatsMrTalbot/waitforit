import WaitForIt from '../src'

describe("Given a waitforit instance", () => {
    let waitforit : WaitForIt;

    beforeEach(() => {
        waitforit = new WaitForIt();
    })

    describe("When waiting for an event", () => {
        let promise : Promise<string>

        beforeEach(() => {
            promise = waitforit.wait("test")
        })

        it("Then pushed payloads should resolve", async () => {
            waitforit.push("test", "payload")
            let result = await promise;

            expect(result).toBe("payload");
        })

        it("Then pushed errors should resolve", async () => {
            waitforit.error("test", "payload")

            try{
                let result = await promise;
                fail("Promise should be rejected")
            } catch(e) {
                expect(e).toBe("payload");
            }
        })
    })

    describe("When waiting for an event that expires", () => {
        let promise : Promise<string>

        beforeEach(() => {
            promise = waitforit.wait("test", 1)
        })

        it("Then a timeout rejection should be returned", async () => {
            try{
                let result = await promise;
                fail("Promise should be rejected")
            } catch(e) {
                expect(e.message).toBe("Wait timed out");
            }
        })
    })
})