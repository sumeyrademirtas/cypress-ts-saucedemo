export interface Credentials {
  username: string
  password: string
}

export interface Users {
  standard: Credentials
  invalid: Credentials
}