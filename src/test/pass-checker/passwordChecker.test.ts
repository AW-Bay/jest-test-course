import {PasswordChecker, PasswordErrors} from "../../app/pass-checker/passwordChecker";

describe('Password checker', () => {
    let sut: PasswordChecker

    beforeEach(() => {
        sut = new PasswordChecker()
    })

    it('password with < 8 characters is invalid', () => {
        const actual = sut.checkBasicPassword('1234567')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.SHORT)
    })

    it('password with >= 8 characters is valid', () => {
        const actual = sut.checkBasicPassword('123456Aa')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT)

    })

    it('password with no upper case is invalid', () => {
        const actual = sut.checkBasicPassword('1234abcd')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE)

    })

    it('password with upper case is valid', () => {
        const actual = sut.checkBasicPassword('1234Abcd')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE)

    })

    it('password with no lower case is invalid', () => {
        const actual = sut.checkBasicPassword('1234ABCD')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE)

    })

    it('password with lower case is valid', () => {
        const actual = sut.checkBasicPassword('1234Abcd')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE)
    })

    it('complex password is valid', () => {
        const actual = sut.checkBasicPassword('1234Abcd')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).toHaveLength(0)
    })

    it('admin password with no digit is invalid', () => {
        const actual = sut.checkAdminPassword('zxcvAbcd')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.NO_DIGIT)
    })

    it('admin password with no digit is valid', () => {
        const actual = sut.checkAdminPassword('7zxcvAbcd')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.NO_DIGIT)
    })


})