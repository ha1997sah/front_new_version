export default [
  {
    path: '/access-control',
    name: 'access-control',
    component: () => import('@/views/apps/acl/CompetitionList.vue'),
    meta: {
      resource: 'ACL',
      action: 'read',
    },
  },

  {
    path: '/apps/competition/:id',
    name: 'apps-competition-detail',
    component: () => import('@/views/apps/competition/CompetitionDetail.vue'),
  },
]
