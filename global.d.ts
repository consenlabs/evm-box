interface Window {
  ethereum: ExternalProvides
  imToken?: any
}
declare namespace NodeJS {
  interface ProcessEnv {
    SENTRY_URL: string
    SENTRY_ORG: string
    SENTRY_PROJECT: string
    SENTRY_AUTH_TOKEN: string
    NEXT_PUBLIC_SENTRY_DSN: string
  }
}

type AtLeastOne<T, U extends keyof T> = Partial<T> & Required<Pick<T, U>>
