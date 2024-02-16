import {v4} from "uuid";

export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
}

type LoggerServiceCallback = (arg: string) => void

export function calculateComplexity(stringInfo: StringInfo) {
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length
}

export function toUpperCaseWithCb(arg: string, callback: LoggerServiceCallback) {
    if (!arg) {
        callback('invalid argument')
        return
    }

    callback(`called function with ${arg}`)

    return arg.toUpperCase()
}

export class OtherStringUtils {

    public toUpperCase(arg: string) {
        console.log('real toUpperCase')
        return arg.toUpperCase()
    }

    public logString(arg: string) {
        console.log(arg)
    }

    public callExternalService() {
        console.log('calling external service')
    }
}

export function toUpperCase(arg: string) {
    return arg.toUpperCase()
}

export function toLowerCaseWithId(arg: string) {
    return arg.toLowerCase() + v4()
}

