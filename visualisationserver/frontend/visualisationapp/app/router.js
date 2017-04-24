import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('topics');
  this.route('topic', { path: '/topic/:topic_id' });
});

export default Router;
