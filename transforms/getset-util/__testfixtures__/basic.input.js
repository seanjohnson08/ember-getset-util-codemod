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
