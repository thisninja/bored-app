import Vue from 'vue';
import Router from 'vue-router';
import Activity from './views/Activity.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/activity',
      name: 'Activity',
      component: Activity,
    },
    {
      path: '/my-list',
      name: 'MyList',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/MyList.vue'),
    },
  ],
});
