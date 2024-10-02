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
