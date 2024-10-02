import '../../typings/index.d.ts'

Array.prototype.max = function () {
    const numbers = this.filter(x => typeof x === 'number' && !isNaN(x))
    if (numbers.length === 0) {
        return -Infinity
    }
    return Math.max(...numbers)
}

Array.prototype.min = function () {
    const numbers = this.filter(x => typeof x === 'number' && !isNaN(x))
    if (numbers.length === 0) {
        return Infinity
    }
    return Math.min(...numbers)
}

Array.prototype.distinct = function <T>(): T[] {
    const seen = new Set<string | T>()
    return this.filter((value) => {
        const isObject = typeof value === 'object' && value !== null
        const key = isObject ? JSON.stringify(value) : value
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })
}

Array.prototype.distinctBy = function <T, K>(keySelector: (item: T) => K): T[] {
    const seen = new Set<string>()
    return this.filter((value) => {
        const key = JSON.stringify(keySelector(value))
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })
}

Array.prototype.filterNot = function <T>(predicate: (value: T, index: number, array: T[]) => boolean): T[] {
    return this.filter((value, index, array) => !predicate(value, index, array))
}

Array.prototype.filterNotNull = function <T>(): NonNullable<T>[] {
    return this.filter((value): value is NonNullable<T> => value !== null)
}

Array.prototype.filterNotUndefined = function <T>(): Exclude<T, undefined>[] {
    return this.filter((value): value is Exclude<T, undefined> => value !== undefined)
}

