/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as OnboardingFlowImport } from './routes/onboarding-flow'
import { Route as EditStepsImport } from './routes/edit-steps'
import { Route as EditFlowImport } from './routes/edit-flow'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const OnboardingFlowRoute = OnboardingFlowImport.update({
  id: '/onboarding-flow',
  path: '/onboarding-flow',
  getParentRoute: () => rootRoute,
} as any)

const EditStepsRoute = EditStepsImport.update({
  id: '/edit-steps',
  path: '/edit-steps',
  getParentRoute: () => rootRoute,
} as any)

const EditFlowRoute = EditFlowImport.update({
  id: '/edit-flow',
  path: '/edit-flow',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/edit-flow': {
      id: '/edit-flow'
      path: '/edit-flow'
      fullPath: '/edit-flow'
      preLoaderRoute: typeof EditFlowImport
      parentRoute: typeof rootRoute
    }
    '/edit-steps': {
      id: '/edit-steps'
      path: '/edit-steps'
      fullPath: '/edit-steps'
      preLoaderRoute: typeof EditStepsImport
      parentRoute: typeof rootRoute
    }
    '/onboarding-flow': {
      id: '/onboarding-flow'
      path: '/onboarding-flow'
      fullPath: '/onboarding-flow'
      preLoaderRoute: typeof OnboardingFlowImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/edit-flow': typeof EditFlowRoute
  '/edit-steps': typeof EditStepsRoute
  '/onboarding-flow': typeof OnboardingFlowRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/edit-flow': typeof EditFlowRoute
  '/edit-steps': typeof EditStepsRoute
  '/onboarding-flow': typeof OnboardingFlowRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/edit-flow': typeof EditFlowRoute
  '/edit-steps': typeof EditStepsRoute
  '/onboarding-flow': typeof OnboardingFlowRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/edit-flow' | '/edit-steps' | '/onboarding-flow'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/edit-flow' | '/edit-steps' | '/onboarding-flow'
  id: '__root__' | '/' | '/edit-flow' | '/edit-steps' | '/onboarding-flow'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  EditFlowRoute: typeof EditFlowRoute
  EditStepsRoute: typeof EditStepsRoute
  OnboardingFlowRoute: typeof OnboardingFlowRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  EditFlowRoute: EditFlowRoute,
  EditStepsRoute: EditStepsRoute,
  OnboardingFlowRoute: OnboardingFlowRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/edit-flow",
        "/edit-steps",
        "/onboarding-flow"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/edit-flow": {
      "filePath": "edit-flow.tsx"
    },
    "/edit-steps": {
      "filePath": "edit-steps.tsx"
    },
    "/onboarding-flow": {
      "filePath": "onboarding-flow.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
