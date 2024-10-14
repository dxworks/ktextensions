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
    associate<K, V>(transform: (char: string) => [K, V]): Map<K, V>;
    associateBy<K, V = string>(keySelector: (char: string) => K, valueTransform?: (char: string) => V): Map<K, V | string>;
    capitalize(): string;
    decapitalize(): string;
    count(predicate: (char: string) => boolean): number;
    dropLast(n: number): string;
    dropLastWhile(predicate: (char: string) => boolean): string;
    dropWhile(predicate: (char: string) => boolean): string;
    format(...args: any[]): string;
    groupBy<K>(keySelector: (char: string) => K): Map<K, string>;
    indexOfFirst(predicate: (char: string) => boolean): number;
    indexOfLast(predicate: (char: string) => boolean): number;
    isBlank(): boolean;
    lines(): string[];
    padStart(length: number, padChar: string): string;
    padEnd(length: number, padChar: string): string;
    prependIndent(indent: string): string;
    random(): string | undefined;
    removeRange(startIndex: number, endIndex: number): string;
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
