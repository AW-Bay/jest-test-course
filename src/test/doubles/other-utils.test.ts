import {calculateComplexity, OtherStringUtils, StringInfo, toUpperCaseWithCb} from "../../app/doubles/other-utils";

describe('otherUtils', () => {
    describe('OtherStringUtils with spies', () => {
        let sut: OtherStringUtils

        beforeEach(() => {
            sut = new OtherStringUtils()
        });

        test('spy to track calls', () => {
            const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase')
            const consoleLogSpy = jest.spyOn(console, 'log')
            // console.log=jest.fn()

            // sut.toUpperCase('abc')
            sut.logString('abc')
            // expect(toUpperCaseSpy).toBeCalledWith('abc')
            // expect(sut.toUpperCase).toBeCalledWith('abc')
            // expect(consoleLogSpy).toBeCalledWith('abc')
            expect(console.log).toBeCalledWith('abc')
        })

        test('use spy to replace method implementation', () => {
            const spy= jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
                console.log('calling mocked implement')
            })

            sut.callExternalService()

            spy.mockRestore()

            sut.callExternalService()
        })

        test('mocked',() => {
            sut.toUpperCase=jest.fn().mockImplementation(() => {
                console.log('mocked implement')
            })
            sut.toUpperCase('abc')
            sut.toUpperCase('abc')

            expect(sut.toUpperCase).toHaveBeenCalledWith('abc')
        })
    })

    describe('tracking callbacks with Jest mocks', () => {
        const callbackMock = jest.fn()

        afterEach(() => {
            // jest.clearAllMocks()
            callbackMock.mockClear()
        })

        it('toUpperCase calls callback for invalid argument', () => {
            const actual = toUpperCaseWithCb('', callbackMock)

            expect(actual).toBeUndefined()
            expect(callbackMock).toBeCalledWith('invalid argument')
            expect(callbackMock).toBeCalledTimes(1)
        })

        it('toUpperCase calls callback for valid argument', () => {
            const actual = toUpperCaseWithCb('abc', callbackMock)

            expect(actual).toBe('ABC')
            expect(callbackMock).toHaveBeenCalledWith('called function with abc')
            expect(callbackMock).toBeCalledTimes(1)
        })
    })

    describe('tracking callbacks', () => {
        let cbArgs = []
        let timesCalled = 0

        function callbackMock(arg: string) {
            cbArgs.push(arg)
            timesCalled++
        }

        afterEach(() => {
            cbArgs.splice(0, cbArgs.length)
            timesCalled = 0
        })

        it('toUpperCase calls callback for invalid argument', () => {
            const actual = toUpperCaseWithCb('', callbackMock)

            expect(actual).toBeUndefined()
            expect(cbArgs).toContain('invalid argument')
            expect(timesCalled).toBe(1)
        })

        it('toUpperCase calls callback for valid argument', () => {
            const actual = toUpperCaseWithCb('abc', callbackMock)

            expect(actual).toBe('ABC')
            expect(cbArgs).toContain('called function with abc')
            expect(timesCalled).toBe(1)
        })
    })

    it('calculates complexity', async () => {
        const someInfo: Partial<StringInfo> = {
            length: 5,
            extraInfo: {
                field1: 'someinfo',
                field2: 'someotherinfo',

            }
        }

        const actual = calculateComplexity(someInfo as StringInfo)

        expect(actual).toBe(10)
    })

    it('toUpperCase calls callback for invalid argument', () => {
        const actual = toUpperCaseWithCb('', () => {
        })

        expect(actual).toBeUndefined()
    })

    it('toUpperCase calls callback for valid argument', () => {
        const actual = toUpperCaseWithCb('abc', () => {
        })

        expect(actual).toBe('ABC')
    })
})

