import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
const CoachDetail = defineAsyncComponent(() =>
  import('./pages/coaches/CoachDetail.vue')
);

import CoachesList from './pages/coaches/CoachesList.vue';

// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
const CoachRegistration = defineAsyncComponent(() =>
  import('./pages/coaches/CoachRegistration.vue')
);

// import ContactCoach from './pages/requests/ContactCoach.vue';
const ContactCoach = defineAsyncComponent(() =>
  import('./pages/requests/ContactCoach.vue')
);

// import RequestsReceived from './pages/requests/RequestsReceived.vue';
const RequestsReceived = defineAsyncComponent(() =>
  import('./pages/requests/RequestsReceived.vue')
);

// import UserAuth from './pages/auth/UserAuth.vue';
const UserAuth = defineAsyncComponent(() =>
  import('./pages/auth/UserAuth.vue')
);

import NotFound from './pages/NotFound.vue';
import store from './store';

const route = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { needAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { needAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { notNeedAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

route.beforeEach(function (to, _, next) {
  if (to.meta.needAuth && !store.getters.isLogin) {
    next('/auth');
  } else if (to.meta.notNeedAuth && store.getters.isLogin) {
    next('/coaches');
  } else {
    next();
  }
});

export default route;
