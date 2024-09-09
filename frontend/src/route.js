import { createRouter, createWebHistory } from 'vue-router';
import AppRegister from './components/AppRegister.vue';
import AppLogin from './components/AppLogin.vue';
import AppBooks from './components/AppBooks.vue';
import AppDashboard from './components/AppDashboard.vue';
import AppUserUpdate from './components/AppUserUpdate.vue';
import AppAddBooks from './components/AppAddBooks.vue';
import AppDetails from './components/AppDetails.vue';
import AppDetailsUpdate from './components/AppDetailsUpdate.vue';
import AppIssueBook from './components/AppIssueBook.vue';
import AppHistory from './components/AppHistory.vue';

const routes = [
  {path: '/register',name: 'AppRegister',component: AppRegister},
  {path: '/login',name: 'AppLogin',component: AppLogin},

  {path: '/dashboard',name: 'AppDashboard',component: AppDashboard, meta: { requiresAuth: true, roles: 'superuser' }},
  {path: '/dashboard/:id',name: 'AppUserUpdate',component: AppUserUpdate, meta: { requiresAuth: true, roles: 'superuser' }},

  {path: '/books/add',name: 'AppAddBooks',component: AppAddBooks, meta: { requiresAuth: true, roles: 'superuser' }},

  {path: '/details',name: 'AppDetails',component: AppDetails, meta: { requiresAuth: true, roles: 'superuser' }},
  {path: '/details/:id',name: 'AppDetailsUpdate',component: AppDetailsUpdate, meta: { requiresAuth: true, roles: 'superuser' }},

  {path: '/books',name: 'AppBooks',component: AppBooks, meta: { requiresAuth: true }},

  {path: '/issue/:id/:book_name',name: 'AppIssueBook',component: AppIssueBook, meta: { requiresAuth: true }},
  {path: '/history',name: 'AppHistory',component: AppHistory, meta: { requiresAuth: true }},


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');
  const userRoles = localStorage.getItem('roles');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/register');
  } else if (to.meta.requiresAuth && to.meta.roles && userRoles !== to.meta.roles) {
    next('/login');
  } else {
    next();
  }
});
export default router;
