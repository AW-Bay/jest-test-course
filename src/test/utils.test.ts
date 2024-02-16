import {getStringInfo, StringUtils, toUpperCase} from "../app/utils";

describe('utils test suite', () => {
    describe('StringUtils', () => {
        let sut: StringUtils

        beforeEach(() => {
            sut = new StringUtils()
        })
        afterEach(() => {

        })

        it('returns upper case', () => {
            const actual = sut.toUpperCase('abc')
            expect(actual).toBe('ABC')
        })

        it('throws error on invalid argument', () => {
            function expectError() {
                const actual = sut.toUpperCase('')
            }

            expect(expectError).toThrow()
            expect(() => {
                sut.toUpperCase('')
            }).toThrow()

            expect(expectError).toThrowError('invalid argument')
        });

        it('should try catch test', (done: jest.DoneCallback) => {
            try {
                sut.toUpperCase('')
                done('getStringInfo should throw error for invalid argument')
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error).toHaveProperty('message', 'invalid argument')
                done()
            }
        });
    })

    describe('touppercase examples', () => {
        it.each([
            {input: 'abc', expected: 'ABC'},
            {input: 'def', expected: 'DEF'},
        ])(`$input toUpperCase should be $expected`, ({input, expected}) => {
            const actual = toUpperCase(input)
            expect(actual).toBe(expected)
        })
    })

    test('returns upper case', () => {
        // arrange
        const sut = toUpperCase
        const expected = 'ABC'

        // act
        const actual = sut('abc')

        // assert
        expect(actual).toBe(expected)
    })


    it('return info for valid string', () => {
        const actual = getStringInfo('My-String')

        expect(actual.lowerCase).toBe('my-string')
        expect(actual.extraInfo).toEqual({})
        expect(actual.characters).toHaveLength(9)
        expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g'])
        expect(actual.characters).toEqual(
            expect.arrayContaining(['y', 'M', '-', 'S', 't', 'r', 'i', 'n', 'g'])
        )
        expect(actual.characters).toContain<string>('M')
        expect(actual.extraInfo).toBeDefined()
    })
})