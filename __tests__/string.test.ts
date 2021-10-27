import '../src/string'

describe('String class', () => {
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
})
