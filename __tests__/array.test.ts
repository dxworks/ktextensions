import '../src/array/array'

describe('Array extensions', () => {
    describe('max', () => {
        it('should return the maximum value in an array of numbers', () => {
            expect([1, 2, 3, 4, 5].max()).toBe(5)
            expect([-1, -5, 0, 10, 100].max()).toBe(100)
            expect([3.14, 2.71, 1.41, 9.81].max()).toBe(9.81)
        })

        it('should work with a single element array', () => {
            expect([42].max()).toBe(42)
        })

        it('should return -Infinity for an empty array', () => {
            expect([].max()).toBe(-Infinity)
        })

        it('should work with arrays containing non-numeric values', () => {
            expect([1, 2, '3', 4, '5'].max()).toBe(4)
        })

        it('should ignore non-numeric values', () => {
            expect([1, 'a', 3, 'b', 2].max()).toBe(3)
        })
    })

    describe('min', () => {
        it('should return the minimum value in an array of numbers', () => {
            expect([1, 2, 3, 4, 5].min()).toBe(1)
            expect([-1, -5, 0, 10, 100].min()).toBe(-5)
            expect([3.14, 2.71, 1.41, 9.81].min()).toBe(1.41)
        })

        it('should work with a single element array', () => {
            expect([42].min()).toBe(42)
        })

        it('should return Infinity for an empty array', () => {
            expect([].min()).toBe(Infinity)
        })

        it('should work with arrays containing non-numeric values', () => {
            expect(['1', 2, '3', 4, '5'].min()).toBe(2)
        })

        it('should ignore non-numeric values', () => {
            expect([5, 'a', 3, 'b', 2].min()).toBe(2)
        })
    })

    describe('distinct', () => {
        it('should remove duplicate elements', () => {
            expect([1, 2, 2, 3, 4, 4, 5].distinct()).toEqual([1, 2, 3, 4, 5])
        })

        it('should work with strings', () => {
            expect(['a', 'b', 'b', 'c', 'a'].distinct()).toEqual(['a', 'b', 'c'])
        })

        it('should preserve order', () => {
            expect([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5].distinct()).toEqual([3, 1, 4, 5, 9, 2, 6])
        })

        it('should return an empty array for an empty input', () => {
            expect([].distinct()).toEqual([])
        })

        it('should work with mixed types', () => {
            expect([1, '1', 2, '2', 3, '3'].distinct()).toEqual([1, '1', 2, '2', 3, '3'])
        })

        it('should handle objects by reference', () => {
            const obj1 = {id: 1}
            const obj2 = {id: 2}
            expect([obj1, obj2, obj1].distinct()).toEqual([obj1, obj2])
        })
    })

    describe('distinctBy()', () => {
        it('should remove duplicates based on a key selector function', () => {
            const input = [
                {id: 1, name: 'Alice'},
                {id: 2, name: 'Bob'},
                {id: 1, name: 'Charlie'},
            ]
            const expected = [
                {id: 1, name: 'Alice'},
                {id: 2, name: 'Bob'},
            ]
            expect(input.distinctBy(item => item.id)).toEqual(expected)
        })

        it('should handle an array of strings with a custom key selector', () => {
            const input = ['apple', 'banana', 'cherry', 'date', 'berry']
            const expected = ['apple', 'banana', 'date']
            expect(input.distinctBy(item => item.length)).toEqual(expected)
        })

        it('should handle an array of objects with a custom key selector', () => {
            const input = [{x: 1, y: 2}, {x: 2, y: 1}, {x: 1, y: 3}, {x: 2, y: 4}]
            const expected = [{x: 1, y: 2}, {x: 2, y: 1}]
            expect(input.distinctBy(item => item.x)).toEqual(expected)
        })

        it('should return an empty array when given an empty array', () => {
            expect([].distinctBy(item => item)).toEqual([])
        })

        it('should handle an array with all unique items according to the key selector', () => {
            const input = [{id: 1}, {id: 2}, {id: 3}]
            expect(input.distinctBy(item => item.id)).toEqual(input)
        })

        describe('filterNot()', () => {
            it('should filter out elements that match the predicate', () => {
                const input = [1, 2, 3, 4, 5]
                expect(input.filterNot(x => x % 2 === 0)).toEqual([1, 3, 5])
            })

            it('should return all elements if no elements match the predicate', () => {
                const input = [1, 3, 5]
                expect(input.filterNot(x => x % 2 === 0)).toEqual([1, 3, 5])
            })

            it('should return an empty array if all elements match the predicate', () => {
                const input = [2, 4, 6]
                expect(input.filterNot(x => x % 2 === 0)).toEqual([])
            })
        })

        describe('filterNotNull()', () => {
            it('should remove null values from the array', () => {
                const input = [1, null, 2, null, 3]
                expect(input.filterNotNull()).toEqual([1, 2, 3])
            })

            it('should keep undefined values in the array', () => {
                const input = [1, null, undefined, 2, null, 3]
                expect(input.filterNotNull()).toEqual([1, undefined, 2, 3])
            })

            it('should return an empty array if all elements are null', () => {
                const input = [null, null, null]
                expect(input.filterNotNull()).toEqual([])
            })
        })

        describe('filterNotUndefined()', () => {
            it('should remove undefined values from the array', () => {
                const input = [1, undefined, 2, undefined, 3]
                expect(input.filterNotUndefined()).toEqual([1, 2, 3])
            })

            it('should keep null values in the array', () => {
                const input = [1, null, undefined, 2, undefined, 3]
                expect(input.filterNotUndefined()).toEqual([1, null, 2, 3])
            })

            it('should return an empty array if all elements are undefined', () => {
                const input = [undefined, undefined, undefined]
                expect(input.filterNotUndefined()).toEqual([])
            })
        })
    })
})
