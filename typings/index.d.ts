declare global {
  interface String {
    replaceBefore(delimiter : string, replacement?: string) : string
    removePrefix(prefix: string): string
    removeSuffix(suffix: string): string
    removeSurrounding(prefix: string, suffix: string): string
    any(predicate: (char: string) => boolean): boolean
    all(predicate: (char: string) => boolean): boolean
    chunked(size: number): string[]
    commonPrefixWith(other: string, ignoreCase?: boolean): string;
    commonSuffixWith(other: string, ignoreCase?: boolean): string;
  }
  interface Array<T> {
    max(): number
    min(): number
    distinct(): T[]
    distinctBy<K>(keySelector: (item: T) => K): T[]
    filterNot(predicate: (value: T, index: number, array: T[]) => boolean): T[];
    filterNotNull(): NonNullable<T>[];
    filterNotUndefined(): Exclude<T, undefined>[];
  }
}

export {}
