modern asynchronous form submit, using `FormData` and `URLSearchParams` to serialize the form fields to a `fetch` request.

## installation

Install the npm package

```
npm install freiform
```

and reference the library in your HTML

```
<script src="path/to/.../dist/freiform.js">
```

or require it in your build chain.

```
import freiform from 'freiform'
```

## usage

Having the library in place you can serialize a form request asynchrnously.

NOTE: since FormData is used as POST-body serialization wrapper, it is encrypted as `form/multipart`!

```
<form action="/search" method="POST">
  <input type="text" name="q" value="some weird content #*$YY%&">
  <input type="text" name="fubar[0]" value="a">
  <input type="text" name="fubar[1]" value="b">
  <input type="text" name="fubar[2]" value="c">
  <button type="submit">Send</button>
</form>
```

```
<script>
  const form = document.querySelector('form')
  const options = {} // options passed to fetch

  formfrei(form, options)
    .then(result => result.text())
    .then(doc => console.log(doc))
</script>
```
