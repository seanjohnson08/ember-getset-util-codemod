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
