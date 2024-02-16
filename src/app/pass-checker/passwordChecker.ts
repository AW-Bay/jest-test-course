export enum PasswordErrors {
    SHORT = 'Password is too short',
    NO_UPPER_CASE = 'Upper case letter required',
    NO_LOWER_CASE = 'Lower case letter required',
    NO_DIGIT = 'At least one digit is required',
}

export interface CheckResult {
    valid: boolean,
    reasons: PasswordErrors[]
}

export class PasswordChecker {
    reasons: PasswordErrors[] = []

    public checkBasicPassword(password: string): CheckResult {
        this.checkForLength(password)
        this.checkForLowerCase(password)
        this.checkForUpperCase(password)

        return {
            valid: this.reasons.length === 0,
            reasons: this.reasons
        }
    }

    public checkAdminPassword(password: string): CheckResult {
        this.checkBasicPassword(password);
        this.checkForDigit(password);

        return {
            valid: this.reasons.length === 0,
            reasons: this.reasons
        }
    }

    private checkForDigit(password: string) {
        const hasDigit = /\d/

        if (!hasDigit.test(password)) {
            this.reasons.push(PasswordErrors.NO_DIGIT)
        }
    }

    private checkForLength(password: string) {
        if (password.length < 8) {
            this.reasons.push(PasswordErrors.SHORT)
        }
    }

    private checkForUpperCase(password: string) {
        if (password === password.toLowerCase()) {
            this.reasons.push(PasswordErrors.NO_UPPER_CASE)
        }
    }

    private checkForLowerCase(password: string) {
        if (password === password.toUpperCase()) {
            this.reasons.push(PasswordErrors.NO_LOWER_CASE)
        }
    }
}