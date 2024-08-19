import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRoute,
  useRouter,
} from 'vue-router'

import { ROUTE_NAMES } from '@/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTE_NAMES.app,
    component: () => import('@/pages/HomePage/HomePage.vue'),
  },
  {
    path: '/about',
    name: ROUTE_NAMES.about,
    component: () => import('@/pages/HomePage/AboutPage.vue'),
  },
  {
    path: '/blockchain',
    name: ROUTE_NAMES.blockchain,
    component: () => import('@/pages/HomePage/BlockchainPage.vue'),
  },
  {
    path: '/events',
    name: ROUTE_NAMES.events,
    component: () => import('@/pages/HomePage/EventsPage.vue'),
  },
  {
    path: '/contact',
    name: ROUTE_NAMES.contact,
    component: () => import('@/pages/HomePage/ContactPage.vue'),
  },
  {
    path: '/nfts',
    name: ROUTE_NAMES.nfts,
    component: () => import('@/pages/NftsPage/NftsPage.vue'),
  },
  {
    path: '/nfts/:id',
    name: ROUTE_NAMES.nftDetails,
    component: () => import('@/pages/NftsPage/NftDetailsPage.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: ROUTE_NAMES.app },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export { router, useRouter, useRoute }
