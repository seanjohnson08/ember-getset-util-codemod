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
