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
