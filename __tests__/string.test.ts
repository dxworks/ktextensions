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

    describe('removeSurrounding', () => {
        it('should remove the prefix and suffix if both are present', () => {
            expect('<<Hello>>'.removeSurrounding('<<', '>>')).toBe('Hello')
        })

        it('should return the original string if neither prefix nor suffix is present', () => {
            expect('Hello'.removeSurrounding('<<', '>>')).toBe('Hello')
        })

        it('should return the original string if both prefix and suffix are empty', () => {
            expect('Hello'.removeSurrounding('', '')).toBe('Hello')
        })

        it('should handle single character prefix and suffix', () => {
            expect('"Hello"'.removeSurrounding('"', '"')).toBe('Hello')
        })

        it('should be case sensitive', () => {
            expect('AAHelloAA'.removeSurrounding('aa', 'AA')).toBe('AAHelloAA')
        })

        it('should work with empty strings', () => {
            expect(''.removeSurrounding('a', 'b')).toBe('')
        })

        it('should work when the string is the same as the prefix and suffix combined', () => {
            expect('abc'.removeSurrounding('a', 'c')).toBe('b')
        })

        it('should handle different prefix and suffix', () => {
            expect('[Hello]'.removeSurrounding('[', ']')).toBe('Hello')
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

    describe('associate', () => {
        it('should create a Map with transformed key-value pairs', () => {
            const result = 'hello'.associate(char => [char, char.charCodeAt(0)])
            expect(result).toBeInstanceOf(Map)
            expect(result.size).toBe(4) // 'l' appears twice, so only 4 unique entries
            expect(result.get('h')).toBe(104)
            expect(result.get('e')).toBe(101)
            expect(result.get('l')).toBe(108)
            expect(result.get('o')).toBe(111)
        })

        it('should return an empty Map for an empty string', () => {
            const result = ''.associate(char => [char, char.charCodeAt(0)])
            expect(result).toBeInstanceOf(Map)
            expect(result.size).toBe(0)
        })

        it('should allow custom key-value transformations', () => {
            const result = 'abc'.associate(char => [char.toUpperCase(), char.repeat(2)])
            expect(result).toBeInstanceOf(Map)
            expect(result.size).toBe(3)
            expect(result.get('A')).toBe('aa')
            expect(result.get('B')).toBe('bb')
            expect(result.get('C')).toBe('cc')
        })
    })

    describe('associateBy', () => {
        it('should create a Map with characters as values when only keySelector is provided', () => {
            const result = 'hello'.associateBy(char => char.charCodeAt(0))
            expect(result).toBeInstanceOf(Map)
            expect(result.size).toBe(4) // 'l' appears twice, so only 4 unique entries
            expect(result.get(104)).toBe('h')
            expect(result.get(101)).toBe('e')
            expect(result.get(108)).toBe('l')
            expect(result.get(111)).toBe('o')
        })

        it('should create a Map with transformed values when valueTransform is provided', () => {
            const result = 'hello'.associateBy(
                char => char.charCodeAt(0),
                char => char.toUpperCase()
            )
            expect(result).toBeInstanceOf(Map)
            expect(result.size).toBe(4)
            expect(result.get(104)).toBe('H')
            expect(result.get(101)).toBe('E')
            expect(result.get(108)).toBe('L')
            expect(result.get(111)).toBe('O')
        })

        it('should return an empty Map for an empty string', () => {
            const result = ''.associateBy(char => char.charCodeAt(0))
            expect(result).toBeInstanceOf(Map)
            expect(result.size).toBe(0)
        })

        it('should allow custom key and value transformations', () => {
            const result = 'abc'.associateBy(
                char => char.toUpperCase(),
                char => char.charCodeAt(0)
            )
            expect(result).toBeInstanceOf(Map)
            expect(result.size).toBe(3)
            expect(result.get('A')).toBe(97)
            expect(result.get('B')).toBe(98)
            expect(result.get('C')).toBe(99)
        })
    })

    describe('capitalize', () => {
        it('should capitalize the first character of the string', () => {
            expect('hello'.capitalize()).toBe('Hello')
            expect('world'.capitalize()).toBe('World')
        })

        it('should return the same string if it starts with an uppercase letter', () => {
            expect('Hello'.capitalize()).toBe('Hello')
            expect('World'.capitalize()).toBe('World')
        })

        it('should handle empty strings', () => {
            expect(''.capitalize()).toBe('')
        })

        it('should handle single-character strings', () => {
            expect('a'.capitalize()).toBe('A')
            expect('Z'.capitalize()).toBe('Z')
        })

        it('should handle strings with leading spaces', () => {
            expect(' hello'.capitalize()).toBe(' hello')
            expect('  world'.capitalize()).toBe('  world')
        })

        it('should handle strings with only non-alphabetic characters', () => {
            expect('123'.capitalize()).toBe('123')
            expect('!!!'.capitalize()).toBe('!!!')
        })
    })

    describe('count', () => {
        it('should count characters matching the predicate', () => {
            expect('aabacca'.count(char => char === 'a')).toBe(4)
        })

        it('should return 0 if no characters match the predicate', () => {
            expect('abcdef'.count(char => char === 'x')).toBe(0)
        })

        it('should work with empty strings', () => {
            expect(''.count(() => true)).toBe(0)
        })

        it('should work with complex predicates', () => {
            expect('Hello, World!'.count(char => char.toLowerCase() === char)).toBe(11)
        })

        it('should count all characters when predicate always returns true', () => {
            expect('abcdef'.count(() => true)).toBe(6)
        })
    })

    describe('decapitalize', () => {
        it('should decapitalize the first character of the string', () => {
            expect('Hello'.decapitalize()).toBe('hello')
            expect('World'.decapitalize()).toBe('world')
        })

        it('should return the same string if it starts with a lowercase letter', () => {
            expect('hello'.decapitalize()).toBe('hello')
            expect('world'.decapitalize()).toBe('world')
        })

        it('should handle empty strings', () => {
            expect(''.decapitalize()).toBe('')
        })

        it('should handle single-character strings', () => {
            expect('A'.decapitalize()).toBe('a')
            expect('z'.decapitalize()).toBe('z')
        })

        it('should handle strings with leading spaces', () => {
            expect(' Hello'.decapitalize()).toBe(' Hello')
            expect('  World'.decapitalize()).toBe('  World')
        })

        it('should handle strings with only non-alphabetic characters', () => {
            expect('123'.decapitalize()).toBe('123')
            expect('!!!'.decapitalize()).toBe('!!!')
        })
    })

    describe('dropLast', () => {
        it('should drop the last n characters', () => {
            expect('abcde'.dropLast(2)).toBe('abc')
            expect('hello'.dropLast(1)).toBe('hell')
        })

        it('should return an empty string if n is greater than or equal to string length', () => {
            expect('abc'.dropLast(3)).toBe('')
            expect('abc'.dropLast(4)).toBe('')
        })

        it('should return the original string if n is 0', () => {
            expect('hello'.dropLast(0)).toBe('hello')
        })

        it('should return the original string if n is negative', () => {
            expect('hello'.dropLast(-1)).toBe('hello')
        })

        it('should handle empty strings', () => {
            expect(''.dropLast(1)).toBe('')
        })
    })

    describe('dropLastWhile', () => {
        it('should drop characters from the end while the predicate is true', () => {
            expect('abcde'.dropLastWhile(char => char > 'c')).toBe('abc')
            expect('12345'.dropLastWhile(char => parseInt(char) > 3)).toBe('123')
        })

        it('should return the original string if the predicate is never true', () => {
            expect('abcde'.dropLastWhile(char => char > 'z')).toBe('abcde')
        })

        it('should return an empty string if the predicate is always true', () => {
            expect('abcde'.dropLastWhile(char => char <= 'z')).toBe('')
        })

        it('should handle empty strings', () => {
            expect(''.dropLastWhile(() => true)).toBe('')
        })

        it('should work with complex predicates', () => {
            expect('Hello, World!'.dropLastWhile(char => char !== 'o')).toBe('Hello, Wo')
        })
    })

    describe('dropWhile', () => {
        it('should drop characters from the beginning while the predicate is true', () => {
            expect('abcde'.dropWhile(char => char < 'c')).toBe('cde')
            expect('12345'.dropWhile(char => parseInt(char) < 3)).toBe('345')
        })

        it('should return the original string if the predicate is never true', () => {
            expect('abcde'.dropWhile(char => char > 'z')).toBe('abcde')
        })

        it('should return an empty string if the predicate is always true', () => {
            expect('abcde'.dropWhile(char => char <= 'z')).toBe('')
        })

        it('should handle empty strings', () => {
            expect(''.dropWhile(() => true)).toBe('')
        })

        it('should work with complex predicates', () => {
            expect('  Hello, World!'.dropWhile(char => char === ' ')).toBe('Hello, World!')
        })
    })

    describe('groupBy', () => {
        it('should group characters by the key selector function', () => {
            const result = 'abracadabra'.groupBy(char => char)
            expect(result.get('a')).toBe('aaaaa')
            expect(result.get('b')).toBe('bb')
            expect(result.get('r')).toBe('rr')
            expect(result.get('c')).toBe('c')
            expect(result.get('d')).toBe('d')
        })

        it('should handle empty strings', () => {
            const result = ''.groupBy(char => char)
            expect(result.size).toBe(0)
        })

        it('should group by custom key selector', () => {
            const result = 'Hello, World!'.groupBy(char => char.toLowerCase())
            expect(result.get('h')).toBe('H')
            expect(result.get('e')).toBe('e')
            expect(result.get('l')).toBe('lll')
            expect(result.get('o')).toBe('oo')
            expect(result.get('w')).toBe('W')
            expect(result.get('r')).toBe('r')
            expect(result.get('d')).toBe('d')
            expect(result.get(' ')).toBe(' ')
            expect(result.get(',')).toBe(',')
            expect(result.get('!')).toBe('!')
        })

        it('should group by character code', () => {
            const result = 'abcABC123'.groupBy(char => char.charCodeAt(0) % 2)
            expect(result.get(1)).toBe('acAC13')
            expect(result.get(0)).toBe('bB2')
        })
    })

    describe('indexOfFirst', () => {
        it('should return the index of the first character that satisfies the predicate', () => {
            expect('abracadabra'.indexOfFirst(char => char === 'a')).toBe(0)
            expect('abracadabra'.indexOfFirst(char => char === 'b')).toBe(1)
            expect('abracadabra'.indexOfFirst(char => char === 'd')).toBe(6)
        })

        it('should return -1 if no character satisfies the predicate', () => {
            expect('abracadabra'.indexOfFirst(char => char === 'z')).toBe(-1)
        })

        it('should work with empty strings', () => {
            expect(''.indexOfFirst(() => true)).toBe(-1)
        })

        it('should work with complex predicates', () => {
            expect('Hello, World!'.indexOfFirst(char => /[A-Z]/.test(char))).toBe(0)
            expect('hello, World!'.indexOfFirst(char => /[A-Z]/.test(char))).toBe(7)
        })
    })

    describe('indexOfLast', () => {
        it('should return the index of the last character that satisfies the predicate', () => {
            expect('abracadabra'.indexOfLast(char => char === 'a')).toBe(10)
            expect('abracadabra'.indexOfLast(char => char === 'b')).toBe(8)
            expect('abracadabra'.indexOfLast(char => char === 'd')).toBe(6)
        })

        it('should return -1 if no character satisfies the predicate', () => {
            expect('abracadabra'.indexOfLast(char => char === 'z')).toBe(-1)
        })

        it('should work with empty strings', () => {
            expect(''.indexOfLast(() => true)).toBe(-1)
        })

        it('should work with complex predicates', () => {
            expect('Hello, World!'.indexOfLast(char => /[A-Z]/.test(char))).toBe(7)
            expect('HELLO, world!'.indexOfLast(char => /[A-Z]/.test(char))).toBe(4)
        })
    })

    describe('isBlank', () => {
        it('should return true for an empty string', () => {
            expect(''.isBlank()).toBe(true)
        })

        it('should return true for a string with only spaces', () => {
            expect('   '.isBlank()).toBe(true)
        })

        it('should return true for a string with only whitespace characters', () => {
            expect('\t\n\r '.isBlank()).toBe(true)
        })

        it('should return false for a string with non-whitespace characters', () => {
            expect('  a  '.isBlank()).toBe(false)
        })

        it('should return false for a string with only non-whitespace characters', () => {
            expect('hello'.isBlank()).toBe(false)
        })

        it('should return false for a string with mixed whitespace and non-whitespace characters', () => {
            expect('  hello  '.isBlank()).toBe(false)
        })
    })

    describe('lines', () => {
        it('should split a multi-line string into an array of lines', () => {
            const input = 'First line\nSecond line\nThird line'
            expect(input.lines()).toEqual(['First line', 'Second line', 'Third line'])
        })

        it('should handle CRLF line endings', () => {
            const input = 'First line\r\nSecond line\r\nThird line'
            expect(input.lines()).toEqual(['First line', 'Second line', 'Third line'])
        })

        it('should return an array with one element for a single-line string', () => {
            expect('Single line'.lines()).toEqual(['Single line'])
        })

        it('should return an empty array for an empty string', () => {
            expect(''.lines()).toEqual([])
        })

        it('should handle strings with empty lines', () => {
            const input = 'First line\n\nThird line\n\n'
            expect(input.lines()).toEqual(['First line', 'Third line'])
        })

        it('should handle strings with only newline characters', () => {
            expect('\n\n\n'.lines()).toEqual([])
        })

        it('should preserve leading and trailing spaces in lines', () => {
            const input = '  First line  \n  Second line  '
            expect(input.lines()).toEqual(['  First line  ', '  Second line  '])
        })
    })

    describe('padEnd', () => {
        it('should pad the string with spaces to the specified length', () => {
            expect('abc'.padEnd(5)).toBe('abc  ')
        })

        it('should pad the string with the specified character', () => {
            expect('abc'.padEnd(5, '*')).toBe('abc**')
        })

        it('should not pad if the string is already longer than the specified length', () => {
            expect('abcde'.padEnd(3)).toBe('abcde')
        })

        it('should pad with repeating pattern if necessary', () => {
            expect('abc'.padEnd(10, '123')).toBe('abc1231231')
        })

        it('should handle empty strings', () => {
            expect(''.padEnd(5, '*')).toBe('*****')
        })

        it('should handle empty pad string', () => {
            expect('abc'.padEnd(5, '')).toBe('abc')
        })
    })

    describe('padStart', () => {
        it('should pad the string with spaces to the specified length', () => {
            expect('abc'.padStart(5)).toBe('  abc')
        })

        it('should pad the string with the specified character', () => {
            expect('abc'.padStart(5, '*')).toBe('**abc')
        })

        it('should not pad if the string is already longer than the specified length', () => {
            expect('abcde'.padStart(3)).toBe('abcde')
        })

        it('should pad with repeating pattern if necessary', () => {
            expect('abc'.padStart(10, '123')).toBe('1231231abc')
        })

        it('should handle empty strings', () => {
            expect(''.padStart(5, '*')).toBe('*****')
        })

        it('should handle empty pad string', () => {
            expect('abc'.padStart(5, '')).toBe('abc')
        })
    })

    describe('prependIndent', () => {
        it('should prepend the default indent to each non-empty line', () => {
            const input = 'First line\nSecond line\nThird line'
            const expected = '    First line\n    Second line\n    Third line'
            expect(input.prependIndent('    ')).toBe(expected)
        })

        it('should use the specified indent string', () => {
            const input = 'First line\nSecond line\nThird line'
            const expected = '>>First line\n>>Second line\n>>Third line'
            expect(input.prependIndent('>>')).toBe(expected)
        })

        it('should not indent empty lines', () => {
            const input = 'First line\n\nThird line'
            const expected = '    First line\n\n    Third line'
            expect(input.prependIndent('    ')).toBe(expected)
        })

        it('should handle strings with only one line', () => {
            expect('Single line'.prependIndent('    ')).toBe('    Single line')
        })

        it('should handle empty strings', () => {
            expect(''.prependIndent('    ')).toBe('')
        })

        it('should preserve existing indentation', () => {
            const input = '  First line\n    Second line'
            const expected = '      First line\n        Second line'
            expect(input.prependIndent('    ')).toBe(expected)
        })

        it('should handle strings with only whitespace lines', () => {
            const input = '  \n    \n  '
            expect(input.prependIndent('    ')).toBe('  \n    \n  ')
        })
    })

    describe('random', () => {
        it('should return a character from the string', () => {
            const str = 'abcdef'
            const result = str.random()
            expect(str).toContain(result)
        })

        it('should return undefined for an empty string', () => {
            expect(''.random()).toBeUndefined()
        })

        it('should return the only character for a single-character string', () => {
            expect('a'.random()).toBe('a')
        })

        it('should return characters with roughly equal probability', () => {
            const str = 'ab'
            const counts = {a: 0, b: 0}
            const iterations = 10000

            for (let i = 0; i < iterations; i++) {
                const char = str.random()
                if (char === 'a') counts.a++
                if (char === 'b') counts.b++
            }

            const ratio = counts.a / counts.b
            expect(ratio).toBeCloseTo(1, 1)
        })
    })

    describe('removeRange', () => {
        it('should remove characters in the specified range', () => {
            expect('abcdef'.removeRange(2, 4)).toBe('abef')
        })

        it('should return the same string if start and end indices are the same', () => {
            expect('abcdef'.removeRange(2, 2)).toBe('abcdef')
        })

        it('should remove characters from start index to the end if end index is greater than string length', () => {
            expect('abcdef'.removeRange(3, 10)).toBe('abc')
        })

        it('should return an empty string if the entire range is removed', () => {
            expect('abcdef'.removeRange(0, 6)).toBe('')
        })

        it('should handle negative start index by treating it as 0', () => {
            expect('abcdef'.removeRange(-1, 3)).toBe('def')
        })

        it('should handle end index greater than string length by treating it as string length', () => {
            expect('abcdef'.removeRange(2, 10)).toBe('ab')
        })

        it('should return the original string if start index is greater than end index', () => {
            expect('abcdef'.removeRange(4, 2)).toBe('abcdef')
        })

        it('should return the original string if both indices are out of range', () => {
            expect('abcdef'.removeRange(-3, -1)).toBe('abcdef')
            expect('abcdef'.removeRange(10, 12)).toBe('abcdef')
        })
    })
})

