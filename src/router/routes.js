
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'position', component: () => import('pages/Position.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') },
      { path: '*', component: () => import('pages/Error404.vue') }
    ]
  }

  // Always leave this as last one,
  // but you can also remove it
]

export default routes
