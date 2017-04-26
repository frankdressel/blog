import Ember from 'ember';

export default Ember.Route.extend({
	ajax: Ember.inject.service(),
	model(param){
        let self=this;
        let promise = new Promise(function(resolve, reject) {
            self.get('ajax').request('http://localhost:8080/toc/'+param.topic_id+'/files').then(data=>{

                let last=data.splice(data.lenggth-2, 1)[0];
                history.replaceState(last, last, null);

                data.forEach(d=>history.pushState(d, last, null));

                resolve({latest: last, topic: param.topic_id});
            });
        });

        return promise;
    }
});
