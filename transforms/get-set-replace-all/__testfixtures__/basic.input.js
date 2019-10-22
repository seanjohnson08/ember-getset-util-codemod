import { something } from 'something';
const foo = this.get('foo');
this.set('foo', true);
this.setProperties({ foo: 'bar' });
const { who, bar } = this.getProperties('who', 'bar');
const baz = this.getWithDefault('foo', false);
const objFoo = this.obj.get('foo');
this.obj.set('foo', objFoo);
