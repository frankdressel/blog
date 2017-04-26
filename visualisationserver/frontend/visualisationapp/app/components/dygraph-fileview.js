import Ember from 'ember';

export default Ember.Component.extend({
    self: this,
    listener(me){
        return function(e) {
            // URL location
            var location = document.location;

            // state
            me.set('fileview', e.state);

            let g = draw(me.get('topic'), e.state);
        }
    },
    draw(topic, state){
        return new Dygraph(document.getElementById("graph"), 'http://localhost:8080/data/'+topic+'/'+state);
    },
    didRender() {
        window.addEventListener("popstate", this.listener(this));
        this.draw(this.get('topic'), history.state);
    },
    willDestroyElement() {
        window.removeEventListener("popstate", this.listener);
    }
});
