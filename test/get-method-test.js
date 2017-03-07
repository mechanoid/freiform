/* global QUnit */

const fixture = `<form action="/search" method="GET">
    <input type="text" name="q" value="some weird content #*$YY%&">
    <input type="text" name="fubar[0]" value="a">
    <input type="text" name="fubar[1]" value="b">
    <input type="text" name="fubar[2]" value="c">

    <button type="submit">Send</button>
  </form>`

QUnit.test('freiform function is properly defined', function (assert) {
  assert.equal(typeof freiform, 'function', 'freiform is defined')
})
