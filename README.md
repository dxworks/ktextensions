# `DxWorks Kotlin Extensions for Typescript`

> This project brings the beautiful utility methods of Kotlin's String and Array classes to Typescript.
> It provides types and implementations as Typescript extension methods.

## Usage
Run the following command to install
```
npm i @dx-works/ktextensions
```

To access the implementations import the main module or only the submodules you need:
```javascript
import '@dx-works/ktextensions' // import the main module that contains the implementation for all extension functions
or
import '@dx-works/ktextensions/dist/string' // import only implementation for String extensions functions
import '@dx-works/ktextensions/dist/array' // import only implementation for Array extensions functions
```

## Extension Functions
Here is a list of the extension functions defined in the current package:

### String
For the complete list of examples please see the [test file](__tests__/string.test.ts).
#### replaceBefore(delimiter : string, replacement?: string) : string
Replaces the part of the string before the `delimiter` with the `replacement` string.

Examples:

```javascript
describe('replaceBefore', () => {
    it('should replace before /', () => {
        expect('someString/someOtherString'.replaceBefore('/', 'nothing')).toEqual('nothing/someOtherString')
    })

    it('should return same string', () => {
        expect('someString/someOtherString'.replaceBefore('#', 'nothing')).toEqual('someString/someOtherString')
    });

    it('should remove before /', () => {
        expect('someString/someOtherString'.replaceBefore('/')).toEqual('/someOtherString')
    })
})
```

#### removePrefix(prefix: string): string
TBA
#### removeSuffix(suffix: string): string
TBA
#### removeSurrounding(prefix: string, suffix: string): string
TBA

### Array
TBA
#### max(): number
Only works on arrays of numbers

Examples:
TBA
#### min(): number
Only works on arrays of numbers

Examples:
TBA
