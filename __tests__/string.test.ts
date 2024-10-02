import '../src/string/string'

describe('String class', () => {
    describe('replaceBefore', () => {
        it('should replace before /', () => {
            expect('someString/someOtherString'.replaceBefore('/', 'nothing')).toEqual('nothing/someOtherString')
        })

        it('should return same string', () => {
            expect('someString/someOtherString'.replaceBefore('#', 'nothing')).toEqual('someString/someOtherString')
        })

        it('should remove before /', () => {
            expect('someString/someOtherString'.replaceBefore('/')).toEqual('/someOtherString')
        })
    })

    describe('any', () => {
        it('should return true if any character meets the condition', () => {
            expect('hello'.any(char => char === 'l')).toBe(true)
        })

        it('should return false if no character meets the condition', () => {
            expect('hello'.any(char => char === 'x')).toBe(false)
        })
    })

    describe('all', () => {
        it('should return true if all characters meet the condition', () => {
            expect('aaa'.all(char => char === 'a')).toBe(true)
        })

        it('should return false if any character does not meet the condition', () => {
            expect('hello'.all(char => char === 'l')).toBe(false)
        })
    })

    describe('chunked', () => {
        it('should split string into chunks of specified size', () => {
            expect('hello'.chunked(2)).toEqual(['he', 'll', 'o'])
            expect('hello world'.chunked(3)).toEqual(['hel', 'lo ', 'wor', 'ld'])
        })

        it('should return an array with the whole string if size is greater than string length', () => {
            expect('hello'.chunked(10)).toEqual(['hello'])
        })

        it('should return an empty array for an empty string', () => {
            expect(''.chunked(3)).toEqual([])
        })

        it('should handle size equal to string length', () => {
            expect('hello'.chunked(5)).toEqual(['hello'])
        })

        it('should return empty array on size < 1', () => {
            expect('hello'.chunked(0)).toEqual([])
            expect('hello'.chunked(-1)).toEqual([])
        })
    })

    describe('commonPrefixWith', () => {
        it('should return the common prefix', () => {
            expect('hello'.commonPrefixWith('help')).toBe('hel')
            expect('kotlin'.commonPrefixWith('kotlin is great')).toBe('kotlin')
            expect('abc'.commonPrefixWith('def')).toBe('')
        })

        it('should handle empty strings', () => {
            expect(''.commonPrefixWith('abc')).toBe('')
            expect('abc'.commonPrefixWith('')).toBe('')
            expect(''.commonPrefixWith('')).toBe('')
        })

        it('should ignore case when specified', () => {
            expect('Hello'.commonPrefixWith('help', true)).toBe('Hel')
            expect('hello'.commonPrefixWith('Help', true)).toBe('hel')
            expect('KOTLIN'.commonPrefixWith('kotlin is great', true)).toBe('KOTLIN')
            expect('ABC'.commonPrefixWith('ab', true)).toBe('AB')
        })
    })

    describe('commonSuffixWith', () => {
        it('should return the common suffix', () => {
            expect('hello'.commonSuffixWith('jello')).toBe('ello')
            expect('kotlin is great'.commonSuffixWith('kotlin')).toBe('')
            expect('abc'.commonSuffixWith('def')).toBe('')
        })

        it('should handle empty strings', () => {
            expect(''.commonSuffixWith('abc')).toBe('')
            expect('abc'.commonSuffixWith('')).toBe('')
            expect(''.commonSuffixWith('')).toBe('')
        })

        it('should ignore case when specified', () => {
            expect('Hello'.commonSuffixWith('JELLO', true)).toBe('ello')
            expect('HEllo'.commonSuffixWith('JeLLO', true)).toBe('Ello')
            expect('KOTLIN IS GREAT'.commonSuffixWith('Excellent', true)).toBe('T')
            expect('ABC'.commonSuffixWith('abc', true)).toBe('ABC')
        })
    })
})

