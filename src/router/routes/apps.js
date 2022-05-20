export default [
  {
    path: '/apps/calendar',
    name: 'apps-calendar',
    component: () => import('@/views/apps/calendar/Calendar.vue'),
  },

  // *===============================================---*
  // *--------- EMAIL & IT'S FILTERS N LABELS -------------------------------*
  // *===============================================---*
  {
    path: '/apps/email',
    name: 'apps-email',
    component: () => import('@/views/apps/email/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
    },
  },
  {
    path: '/apps/email/:folder',
    name: 'apps-email-folder',
    component: () => import('@/views/apps/email/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      navActiveLink: 'apps-email',
    },
    beforeEnter(to, _, next) {
      if (['sent', 'draft', 'starred', 'spam', 'trash'].includes(to.params.folder)) next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/apps/email/label/:label',
    name: 'apps-email-label',
    component: () => import('@/views/apps/email/Email.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      navActiveLink: 'apps-email',
    },
    beforeEnter(to, _, next) {
      if (['personal', 'company', 'important', 'private'].includes(to.params.label)) next()
      else next({ name: 'error-404' })
    },
  },

  // *===============================================---*
  // *--------- TODO & IT'S FILTERS N TAGS ---------------------------------------*
  // *===============================================---*

  // *===============================================---*
  // *--------- CHAT  ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/chat',
    name: 'apps-chat',
    component: () => import('@/views/apps/chat/Chat.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'chat-application',
    },
  },

  // *===============================================---*
  // *--------- ECOMMERCE  ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/e-commerce/shop',
    name: 'apps-e-commerce-shop',
    component: () => import('@/views/apps/e-commerce/e-commerce-shop/ECommerceShop.vue'),
    meta: {
      contentRenderer: 'sidebar-left-detached',
      contentClass: 'ecommerce-application',
      pageTitle: 'Shop',
      breadcrumb: [
        {
          text: 'ECommerce',
        },
        {
          text: 'Shop',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/e-commerce/wishlist',
    name: 'apps-e-commerce-wishlist',
    component: () => import('@/views/apps/e-commerce/e-commerce-wishlist/ECommerceWishlist.vue'),
    meta: {
      pageTitle: 'Wishlist',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'ECommerce',
        },
        {
          text: 'Wishlist',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/e-commerce/checkout',
    name: 'apps-e-commerce-checkout',
    component: () => import('@/views/apps/e-commerce/e-commerce-checkout/ECommerceCheckout.vue'),
    meta: {
      pageTitle: 'Checkout',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'ECommerce',
        },
        {
          text: 'Checkout',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/e-commerce/:slug',
    name: 'apps-e-commerce-product-details',
    component: () => import('@/views/apps/e-commerce/e-commerce-product-details/ECommerceProductDetails.vue'),
    meta: {
      pageTitle: 'Product Details',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'ECommerce',
        },
        {
          text: 'Shop',
          active: true,
        },
        {
          text: 'Product Details',
          active: true,
        },
      ],
    },
  },

  // *===============================================---*
  // *--------- USER ---- ---------------------------------------*
  // *===============================================---*
 
  {
    path: '/apps/athletes/list',
    name: 'apps-athletes-list',
    component: () => import('@/views/apps/user/users-list/AthletesList.vue'),
  },

  
  {
    path: '/apps/users/requests',
    name: 'apps-users-requests',
    component: () => import('@/views/apps/user/users-list/PendingUsersList.vue'),
  },
  {
    path: '/apps/users/view/:id',
    name: 'apps-users-view',
    component: () => import('@/views/apps/user/users-view/UsersView.vue'),
  },
  {
    path: '/apps/users/AcceptOrRefuse/:id',
    name: 'apps-users-AcceptOrRefuse',
    component: () => import('@/views/apps/user/users-view/AcceptOrRefuse.vue'),
  },
  {
    path: '/apps/users/edit/:id',
    name: 'apps-users-edit',
    component: () => import('@/views/apps/user/users-edit/UsersEdit.vue'),
  },


  //club
  {
    path: '/apps/clubs/list',
    name: 'apps-clubs-list',
    component: () => import('@/views/apps/club/ClubList.vue'),
  },
  {
    path: '/apps/clubs/view/:id',
    name: 'apps-clubs-view',
    component: () => import('@/views/apps/club/ClubsView.vue'),
  },
  {
    path: '/apps/clubs/edit/:id',
    name: 'apps-clubs-edit',
    component: () => import('@/views/apps/club/ClubsEdit.vue'),
  },


  {
    path: '/apps/federations/list',
    name: 'apps-federations-list',
    component: () => import('@/views/apps/federation/FederationList.vue'),
  },
  {
    path: '/apps/federations/view/:id',
    name: 'apps-federations-view',
    component: () => import('@/views/apps/federation/FederationsView.vue'),
  },

 
  {
    path: '/apps/federations/edit/:id',
    name: 'apps-federations-edit',
    component: () => import('@/views/apps/federation/FederationsEdit.vue'),
  },

  {
    path: '/apps/competitions/list',
    name: 'apps-competitions-list',
    component: () => import('@/views/apps/competition/CompetitionList.vue'),
  },
  
  {
    path: '/apps/competitions/bracket/:id',
    name: 'apps-competitions-bracket',
    component: () => import('@/views/apps/competition/Bracket.vue'),
  },
  {
    path: '/apps/competitions/division/:id',
    name: 'apps-competitions-division',
    component: () => import('@/views/apps/competition/Divison.vue'),
  },
  {
    path: '/apps/competitions/edit/:id',
    name: 'apps-competitions-edit',
    component: () => import('@/views/apps/competition/CategoriesEdit.vue'),
  },
  {
    path: '/apps/categories/edit/:id',
    name: 'apps-categories-edit',
    component: () => import('@/views/apps/competition/CategoriesEdit.vue'),
  },
  {
    path: '/apps/categories/list',
    name: 'apps-categories-list',
    component: () => import('@/views/apps/competition/CategorieList.vue'),
  },
  {
    path: '/apps/category/detail/:id',
    name: 'apps-category-deatail',
    component: () => import('@/views/apps/competition/CategoriesView.vue'),
  },
]                                                     
