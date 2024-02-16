jest.mock('../../app/doubles/other-utils', () => ({
    ...jest.requireActual('../../app/doubles/other-utils'),
    calculateComplexity: jest.fn(() => 20)
}))

jest.mock('uuid',() => ({
    v4() {
        return '123'
    }
}))

import * as OtherUtils from '../../app/doubles/other-utils'


describe('mocked modules', () => {
    jest.spyOn(OtherUtils, 'calculateComplexity').mockImplementationOnce(() => 10)

    test('calculate complexity', () => {
        const result = OtherUtils.calculateComplexity({} as any)
        console.log(result)
        expect(result).toBe(10)
        expect(OtherUtils.calculateComplexity).toHaveBeenCalled()
    })

    test('keep other functions,', () => {
        const result = OtherUtils.toUpperCase('abc')
        expect(result).toBe('ABC')
        console.log(result)
    })

    test('string with id', () => {
        const result = OtherUtils.toLowerCaseWithId('ABC')
        expect(result).toBe('abc123')
    })
})