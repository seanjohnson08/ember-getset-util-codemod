# ember-get


## Usage

```
npx ember-get-set ember-get path/of/files/ or/some**/*glob.js

# or

yarn global add ember-get-set
ember-get-set ember-get path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/get-set-replace-all/__testfixtures__/basic.input.js)</small>):
```js
const foo = this.get('foo');
this.set('foo', true);
this.setProperties({ foo: 'bar' });
const { who, bar } = this.getProperties('who', 'bar');
const baz = this.getWithDefault('foo', false);
const objFoo = this.obj.get('foo');
this.obj.set('foo', objFoo);

```

**Output** (<small>[basic.output.js](transforms/get-set-replace-all/__testfixtures__/basic.output.js)</small>):
```js
import { get, set, setProperties, getProperties, getWithDefault } from '@ember/object';
const foo = get(this, 'foo');
set(this, 'foo', true);
setProperties(this, { foo: 'bar' });
const { who, bar } = getProperties(this, 'who', 'bar');
const baz = getWithDefault(this, 'foo', false);
const objFoo = get(this.obj, 'foo');
set(this.obj, 'foo', objFoo);

```
<!--FIXTURES_CONTENT_END-->