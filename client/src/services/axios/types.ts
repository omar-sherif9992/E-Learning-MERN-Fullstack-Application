import { CategoryRoute } from './dataServices/CategoryDataService';
import { CoursesRoutes } from './dataServices/CoursesDataService';
import { InstructorRoutes } from './dataServices/InstructorDataService';
import { AdminRoutes } from './dataServices/AdminDataService';

import { AuthRoutes } from './dataServices/AuthDataService';
import { StudentRoutes } from './dataServices/StudentDataService';
/**
 * HTTP methods
 */
export type VERBS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
/**
 * User routes are defined in the dataServices/UserDataService.ts file
 * and are used to define the routes for the user data service
 * @param  verb - The HTTP verb to use for the request
 */
export type AuthRoutesType<T extends 'GET' | 'POST'> =
  typeof AuthRoutes[T][keyof Partial<typeof AuthRoutes[T]>];

export type CategoryRouteType = typeof CategoryRoute['GET'][keyof Partial<
  typeof CategoryRoute['GET']
>];

export type AdminRoutesType = typeof AdminRoutes['POST'][keyof Partial<
  typeof AdminRoutes['POST']
>];

export type CoursesRoutesType = typeof CoursesRoutes['GET'][keyof Partial<
  typeof CoursesRoutes['GET']
>];

export type InstructorRouteType = typeof InstructorRoutes['GET'][keyof Partial<
  typeof InstructorRoutes['GET']
>];

export type StudentRouteType = typeof StudentRoutes['GET'][keyof Partial<
  typeof StudentRoutes['GET']
>];

/**
 * All GET routes that are available for the  data service
 */
export type GETRoutesType =
  | CategoryRouteType
  | CoursesRoutesType
  | InstructorRouteType
  | AuthRoutesType<'GET'>
  | StudentRouteType;
/**
 * All POST routes that are available for the  data service
 */
export type POSTRoutesType = AdminRoutesType | AuthRoutesType<'POST'>;
/**
 * All PUT routes that are available for the  data service
 */
export type PUTRoutesType = null;
export type PATCHRoutesType = null;
export type DELETERoutesType = null;
