String.prototype.replaceBefore = function (delimiter: string, replacement?: string) {
    const index = this.indexOf(delimiter)
    if (index === -1)
        return this.toString()
    else
        return (replacement || '') + this.substring(this.indexOf(delimiter))
}

String.prototype.removePrefix = function (prefix: string) {
    if (this.startsWith(prefix))
        return this.substring(prefix.length)
    else
        return this.toString()
}

String.prototype.removeSuffix = function (suffix: string) {
    if (this.endsWith(suffix))
        return this.substring(0, this.length - suffix.length)
    else
        return this.toString()
}

String.prototype.removeSurrounding = function (prefix: string, suffix: string) {
    if (this.startsWith(prefix) && this.endsWith(suffix))
        return this.removePrefix(prefix).removeSuffix(suffix)
    else
        return this.toString()
}

String.prototype.all = function (predicate: (char: string) => boolean): boolean {
    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i])) {
            return false
        }
    }
    return true
}

String.prototype.any = function (predicate: (char: string) => boolean): boolean {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
            return true
        }
    }
    return false
}

String.prototype.chunked = function (size: number): string[] {
    if (size < 1) return []
    const chunks: string[] = []
    for (let i = 0; i < this.length; i += size) {
        chunks.push(this.slice(i, i + size))
    }
    return chunks
}

String.prototype.commonPrefixWith = function (other: string, ignoreCase = false): string {
    const minLength = Math.min(this.length, other.length)
    for (let i = 0; i < minLength; i++) {
        const thisChar = ignoreCase ? this[i].toLowerCase() : this[i]
        const otherChar = ignoreCase ? other[i].toLowerCase() : other[i]
        if (thisChar !== otherChar) {
            return this.slice(0, i)
        }
    }
    return this.slice(0, minLength)
}

String.prototype.commonSuffixWith = function (other: string, ignoreCase = false): string {
    const minLength = Math.min(this.length, other.length)
    for (let i = 0; i < minLength; i++) {
        const thisChar = ignoreCase ? this[this.length - 1 - i].toLowerCase() : this[this.length - 1 - i]
        const otherChar = ignoreCase ? other[other.length - 1 - i].toLowerCase() : other[other.length - 1 - i]
        if (thisChar !== otherChar) {
            return this.slice(this.length - i)
        }
    }
    return this.slice(this.length - minLength)
}

String.prototype.associate = function <K, V>(transform: (char: string) => [K, V]): Map<K, V> {
    const result = new Map<K, V>()
    for (let i = 0; i < this.length; i++) {
        const [key, value] = transform(this[i])
        result.set(key, value)
    }
    return result
}

String.prototype.associateBy = function <K, V = string>(keySelector: (char: string) => K, valueTransform?: (char: string) => V): Map<K, V | string> {
    const result = new Map<K, V | string>()
    for (let i = 0; i < this.length; i++) {
        const key = keySelector(this[i])
        const value = valueTransform ? valueTransform(this[i]) : this[i]
        result.set(key, value)
    }
    return result
}

String.prototype.capitalize = function (): string {
    if (this.length === 0) return this.toString()
    return this[0].toUpperCase() + this.slice(1)
}

String.prototype.decapitalize = function (): string {
    if (this.length === 0) return this.toString()
    return this[0].toLowerCase() + this.slice(1)
}

String.prototype.count = function (predicate: (char: string) => boolean): number {
    let count = 0
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
            count++
        }
    }
    return count
}

String.prototype.dropLast = function (n: number): string {
    return n < 0 ? this.toString() : this.slice(0, -n || this.length)
}

String.prototype.dropLastWhile = function (predicate: (char: string) => boolean): string {
    let index = this.length - 1
    while (index >= 0 && predicate(this[index])) {
        index--
    }
    return this.slice(0, index + 1)
}

String.prototype.dropWhile = function (predicate: (char: string) => boolean): string {
    let index = 0
    while (index < this.length && predicate(this[index])) {
        index++
    }
    return this.slice(index)
}

String.prototype.groupBy = function <K>(keySelector: (char: string) => K): Map<K, string> {
    const result = new Map<K, string>()
    for (let i = 0; i < this.length; i++) {
        const char = this[i]
        const key = keySelector(char)
        const existingValue = result.get(key)
        if (existingValue !== undefined) {
            result.set(key, existingValue + char)
        } else {
            result.set(key, char)
        }
    }
    return result
}

String.prototype.indexOfFirst = function (predicate: (char: string) => boolean): number {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
            return i
        }
    }
    return -1
}

String.prototype.indexOfLast = function (predicate: (char: string) => boolean): number {
    for (let i = this.length - 1; i >= 0; i--) {
        if (predicate(this[i])) {
            return i
        }
    }
    return -1
}

String.prototype.isBlank = function (): boolean {
    return this.trim().length === 0
}

String.prototype.lines = function (): string[] {
    return this.split(/\r?\n/).filter(line => line !== '')
}

String.prototype.padEnd = function (length: number, padString = ' '): string {
    if (this.length >= length) return String(this)
    const padLength = length - this.length
    if (padString.length === 0) return String(this)
    const padding = padString.repeat(Math.ceil(padLength / padString.length)).slice(0, padLength)
    return String(this) + padding
}

String.prototype.padStart = function (length: number, padString = ' '): string {
    if (this.length >= length) return String(this)
    const padLength = length - this.length
    if (padString.length === 0) return String(this)
    const padding = padString.repeat(Math.ceil(padLength / padString.length)).slice(0, padLength)
    return padding + String(this)
}

String.prototype.prependIndent = function (indent = '    '): string {
    return this.split('\n')
        .map(line => line.trim() ? indent + line : line)
        .join('\n')
}

String.prototype.random = function (): string | undefined {
    if (this.length === 0) return undefined
    const index = Math.floor(Math.random() * this.length)
    return this[index]
}

String.prototype.removeRange = function (startIndex: number, endIndex: number): string {
    const start = Math.max(0, Math.min(this.length, startIndex))
    const end = Math.max(0, Math.min(this.length, endIndex))
    if (start >= end) return String(this)
    return this.slice(0, start) + this.slice(end)
}
