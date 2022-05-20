export default [
  {
    header: 'Gestion',
  },
 
  {
    title: 'Utilisateurs',
    route: 'apps-users-list',
    icon: 'UserIcon',
  },

  {
    title: 'Athlétes',
    route: 'apps-athletes-list',
    icon: 'StarIcon',
  },

  {
    title: 'Inscriptions',
    route: 'apps-users-requests',
    icon: 'UserCheckIcon',
  },
  {
    title: 'Clubs',
    route: 'apps-clubs-list',
    icon: 'OctagonIcon',
  },

  {
    title: 'Compétitions',
    icon: 'GlobeIcon',
    children: [
      {
        title: 'Compétitions',
        route: 'apps-competitions-list',
      },
      {
        title: 'Catégories',
        route: 'apps-categories-list',
      },
      
    ]},
  {
    title: 'Fédérations',
    icon: 'GlobeIcon',
    route: 'apps-federations-list'
  },
  {
    title: 'Calendrier',
    route: 'apps-calendar',
    icon: 'CalendarIcon',
  },



]
