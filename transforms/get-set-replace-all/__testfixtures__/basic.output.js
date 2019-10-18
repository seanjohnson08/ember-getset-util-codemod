import { get, set, setProperties, getProperties, getWithDefault } from '@ember/object';
import { something } from 'something';
const foo = get(this, 'foo');
set(this, 'foo', true);
setProperties(this, { foo: 'bar' });
const { who, bar } = getProperties(this, 'who', 'bar');
const baz = getWithDefault(this, 'foo', false);
const objFoo = get(this.obj, 'foo');
set(this.obj, 'foo', objFoo);
