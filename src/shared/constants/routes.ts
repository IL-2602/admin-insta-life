export const ROUTES = {
  AUTH: '/auth/sign-in',
  DEFAULT: '/',
  PAYMENTS: '/payments',
  POSTS: '/posts',
  STATISTICS: '/statistics',
  USER: (uId: number) => `/users/${uId.toString()}`,
  USERS: '/users',
}
