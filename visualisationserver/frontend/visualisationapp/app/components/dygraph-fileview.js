import Ember from 'ember';

export default Ember.Component.extend({
    self: this,
    listener(me){
        return function(e) {
            // URL location
            var location = document.location;

            // state
            me.set('fileview', e.state);

            let g = new Dygraph(document.getElementById("graph"), 'http://localhost:8080/data/'+me.get('topic')+'/'+e.state);
        }
    },
    didRender() {
        window.addEventListener("popstate", this.listener(this));
    },
    willDestroyElement() {
        window.removeEventListener("popstate", this.listener);
    }
});
