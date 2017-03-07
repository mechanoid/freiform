/* global QUnit, sinon, freiform, URL */

const fixtureData = {
  q: 'some weird content #*$YY%&',
  fubar: ['a', 'b', 'c']
}

const form = (body, method = 'GET') => `<form action="/search?someQueryParams=fubar" method="${method}">
    ${body}
    <button type="submit">Send</button>
  </form>
`

const formWithFields = (method = 'GET') => form(`<input type="text" name="q" value="some weird content #*$YY%&">
    <input type="text" name="fubar[0]" value="a">
    <input type="text" name="fubar[1]" value="b">
    <input type="text" name="fubar[2]" value="c">`, method)

const nodeFromFixture = (fixture) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = fixture
  return wrapper.firstChild
}

const mockResponse = (body) => Promise.resolve(
  new window.Response(body, {
    status: 200,
    headers: { 'Content-type': 'application/json' }
  })
)

QUnit.testStart(function (details) {
  sinon.stub(window, 'fetch')
})

QUnit.testDone(function (details) {
  window.fetch.restore()
})

QUnit.module('GET-forms')

QUnit.test('freiform function is properly defined', function (assert) {
  assert.equal(typeof freiform, 'function', 'freiform is defined')
})

QUnit.test('a call to freiform returns a promise', function (assert) {
  window.fetch.returns(Promise.resolve({ dummy: true }))

  assert.ok(freiform(nodeFromFixture(form())) instanceof Promise, 'promise is returned')
})

QUnit.test('freiform takes a <form> element and fetches its "action"', function (assert) {
  window.fetch
    .returns(mockResponse(JSON.stringify(fixtureData)))

  assert.expect(1)
  var done = assert.async(1)

  freiform(nodeFromFixture(form()))
  .then(content => content.json())
  .then(data => {
    const calledAction = window.fetch.getCall(0).args[0]
    const url = new URL(calledAction)

    assert.equal(url.pathname, '/search')
    done()
  })
})

QUnit.test('it adds the given form fields url-encoded to the action', function (assert) {
  window.fetch
    .returns(mockResponse(JSON.stringify(fixtureData)))

  assert.expect(2)
  var done = assert.async()

  freiform(nodeFromFixture(formWithFields()))
  .then(content => content.json())
  .then(data => {
    const calledAction = window.fetch.getCall(0).args[0]
    const url = new URL(calledAction)

    assert.equal(url.pathname, '/search')
    assert.equal(url.search, '?q=some+weird+content+%23*%24YY%25%26&fubar%5B0%5D=a&fubar%5B1%5D=b&fubar%5B2%5D=c')
    done()
  })
})

QUnit.module('POST-forms')

QUnit.test('it doesn\'t modify query params of the action for POST forms', function (assert) {
  window.fetch
    .returns(mockResponse(JSON.stringify(fixtureData)))

  assert.expect(2)
  var done = assert.async()

  freiform(nodeFromFixture(formWithFields('POST')))
  .then(content => content.json())
  .then(data => {
    const calledAction = window.fetch.getCall(0).args[0]
    const url = new URL(calledAction)

    assert.equal(url.pathname, '/search')
    assert.equal(url.search, '?someQueryParams=fubar')
    done()
  })
})

QUnit.test('freiform passes form fields as body to the fetch options', function (assert) {
  window.fetch
    .returns(mockResponse(JSON.stringify(fixtureData)))

  assert.expect(4)
  var done = assert.async()

  freiform(nodeFromFixture(formWithFields('POST')))
  .then(content => content.json())
  .then(data => {
    const calledOptions = window.fetch.getCall(0).args[1]

    assert.equal(calledOptions.body.get('q'), fixtureData.q)
    assert.deepEqual(calledOptions.body.get('fubar[0]'), fixtureData.fubar[0])
    assert.deepEqual(calledOptions.body.get('fubar[1]'), fixtureData.fubar[1])
    assert.deepEqual(calledOptions.body.get('fubar[2]'), fixtureData.fubar[2])

    done()
  })
})

QUnit.test('freiform passes form action to fetch options', function (assert) {
  window.fetch
    .returns(mockResponse(JSON.stringify(fixtureData)))

  assert.expect(1)
  var done = assert.async()

  freiform(nodeFromFixture(formWithFields('POST')))
  .then(content => content.json())
  .then(data => {
    const calledOptions = window.fetch.getCall(0).args[1]

    assert.equal(calledOptions.method, 'post')
    done()
  })
})

QUnit.test('freiform allows to pass options to fetch', function (assert) {
  window.fetch
    .returns(mockResponse(JSON.stringify(fixtureData)))

  assert.expect(1)
  var done = assert.async()

  freiform(nodeFromFixture(formWithFields('POST')), { someOption: true })
  .then(content => content.json())
  .then(data => {
    const calledOptions = window.fetch.getCall(0).args[1]

    assert.equal(calledOptions.someOption, true)
    done()
  })
})
