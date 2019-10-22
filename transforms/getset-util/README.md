# getset-util


## Usage

```
npx ember-getset-util-codemod getset-util path/of/files/ or/some**/*glob.js

# or

yarn global add ember-getset-util-codemod
ember-getset-util-codemod getset-util path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
* [existing-imports](#existing-imports)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/getset-util/__testfixtures__/basic.input.js)</small>):
```js
import Service from '@ember/service';

export default Service.extend({
  init() {
    this.set('hello', 'world');
    console.log(this.get('hello'));
  },

  doStuff() {
    this.getProperties(['hello']);
    this.setProperties({
      hello: 'world',
    });
  },
});

```

**Output** (<small>[basic.output.js](transforms/getset-util/__testfixtures__/basic.output.js)</small>):
```js
import { get, getProperties, set, setProperties } from "@ember/object";
import Service from '@ember/service';

export default Service.extend({
  init() {
    set(this, 'hello', 'world');
    console.log(get(this, 'hello'));
  },

  doStuff() {
    getProperties(this, ['hello']);
    setProperties(this, {
      hello: 'world',
    });
  },
});

```
---
<a id="existing-imports">**existing-imports**</a>

**Input** (<small>[existing-imports.input.js](transforms/getset-util/__testfixtures__/existing-imports.input.js)</small>):
```js
import { getWithDefault, get } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  init() {
    get(this, 'hello');
    getWithDefault(this, 'hello', 'world');
    this.set('hello', 'world');
    console.log(this.get('hello'));
  },

  doStuff() {
    this.getProperties(['hello']);
    this.setProperties({
      hello: 'world',
    });
  },
});

```

**Output** (<small>[existing-imports.output.js](transforms/getset-util/__testfixtures__/existing-imports.output.js)</small>):
```js
import { getWithDefault, get, getProperties, set, setProperties } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  init() {
    get(this, 'hello');
    getWithDefault(this, 'hello', 'world');
    set(this, 'hello', 'world');
    console.log(get(this, 'hello'));
  },

  doStuff() {
    getProperties(this, ['hello']);
    setProperties(this, {
      hello: 'world',
    });
  },
});

```
<!--FIXTURES_CONTENT_END-->
