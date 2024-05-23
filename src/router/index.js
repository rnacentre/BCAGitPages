import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index.vue";
import review from './review'  //重点是这行代码

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "index",
    redirect: "/index",
    component: () => import("@/views/index"),
  },
  {
    path: "/layout",
    name: "layout",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/index"),
        meta: {
          title: "Home",
          keepAlive: true,
        },
      },
      {
        path: "/index2",
        name: "index2",
        hidden: true,
        pName: "index",
        component: () => import("@/views/index/index2.vue"),
        meta: {
          title: "Home",
          keepAlive: true,
        },
      },
      // {
      //   path: "/portrait",
      //   name: "Portrait",
      //   component: () => import("@/views/dataBrowser"),
      //   meta: {
      //     title: "Portrait",
      //     keepAlive: true,
      //   },
      //   children: [
      //     {
      //       path: "/portrait/Adult",
      //       name: "Adult",
      //       component: () =>
      //         import("@/views/index/components/AnatomyBrain.vue"),
      //       meta: {
      //         title: "Adult Brain",
      //         keepAlive: true,
      //         pName: "Portrait",
      //         hidden: true,
      //       },
      //     },
      //   ],
      // },
      {
        path: "/dataBrowser",
        name: "dataBrowser",
        component: () => import("@/views/dataBrowser"),
        meta: {
          title: "Data Viewer",
          keepAlive: true,
        },
        // children: [
        //   {
        //     path: "/dataBrowser/Adult",
        //     name: "Adult",
        //     iframeComponent: () => import("@/views/dataBrowser/AdultBrowser"),
        //     meta: {
        //       title: "Adult Brain",
        //       keepAlive: true,
        //       pName: "dataBrowser",
        //       hidden: true,
        //       isIframe: true,
        //       componentName: "Adult",
        //     },
        //   },
        //   {
        //     path: "/dataBrowser/Fetal",
        //     name: "Fetal",
        //     iframeComponent: () => import("@/views/dataBrowser/FetalBrowser"),
        //     meta: {
        //       title: "Fetal Brain",
        //       keepAlive: true,
        //       pName: "dataBrowser",
        //       hidden: true,
        //       isIframe: true,
        //       componentName: "Fetal",
        //     },
        //   },
        //   {
        //     path: "/dataBrowser/Tumour",
        //     name: "Tumour",
        //     iframeComponent: () => import("@/views/dataBrowser/TumourBrowser"),
        //     meta: {
        //       title: "Tumour",
        //       keepAlive: true,
        //       pName: "dataBrowser",
        //       hidden: true,
        //       isIframe: true,
        //       componentName: "Tumour",
        //     },
        //   },
        //   {
        //     path: "/dataBrowser/Organoid",
        //     name: "Organoid",
        //     iframeComponent: () =>
        //       import("@/views/dataBrowser/OrganoidBrowser"),
        //     meta: {
        //       title: "Organoid",
        //       keepAlive: true,
        //       pName: "dataBrowser",
        //       hidden: true,
        //       isIframe: true,
        //       componentName: "Organoid",
        //     },
        //   },
        //   {
        //     path: "/dataBrowser/Mouse",
        //     name: "Mouse",
        //     iframeComponent: () => import("@/views/dataBrowser/MouseBrowser"),
        //     meta: {
        //       title: "Mouse Brain",
        //       keepAlive: true,
        //       pName: "dataBrowser",
        //       hidden: true,
        //       isIframe: true,
        //       componentName: "Mouse",
        //     },
        //   },
        // ],
      },
      {
        path: "/portrait/Adult",
            name: "Adult",
            component: () =>
              import("@/views/index/components/AnatomyBrain.vue"),
            meta: {
              title: "Portrait",
              keepAlive: true,
            },
      },
      {
        path: "/gene",
        name: "gene",
        component: () => import("@/views/gene"),
        meta: {
          title: "Gene",
          keepAlive: true,
        },
        children: [
          {
            path: "/gene/marker",
            name: "marker",
            component: () => import("@/views/gene/GeneMarker"),
            meta: {
              title: "Markers",
              keepAlive: true,
              pName: "gene",
            },
          },
          {
            path: "/gene/tissue",
            name: "tissue",
            component: () => import("@/views/gene/GeneTissue"),
            meta: {
              title: "Region DEG",
              keepAlive: true,
              pName: "gene",
            },
          },
          {
            path: "/gene/celltype",
            name: "celltype",
            component: () => import("@/views/gene/GeneCelltype"),
            meta: {
              title: "CellType DEG",
              keepAlive: true,
              pName: "gene",
            },
          },
        ],
      },
      {
        path: "/cellSorting",
        name: "cellSorting",
        component: () => import("@/views/cell-sorting"),
        meta: {
          title: "Exploration",
          keepAlive: true,
        },
      },
      {
        path: "/dataSet",
        name: "dataSet",
        component: () => import("@/views/reference"),
        meta: {
          title: "Dataset",
          keepAlive: true,
        },
      },
      {
        path: "/help",
        name: "Help",
        component: () => import("@/views/help"),
        meta: {
          title: "Help",
          keepAlive: true,
        },
      },
      {
        path: "/contact",
        name: "Contact",
        component: () => import("@/views/contact"),
        meta: {
          title: "Contact",
          keepAlive: true,
        },
      },
    ],
  },
  ...review
];

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior: () => ({
    y: 0,
  }),
});
export default router;
