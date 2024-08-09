export type User = {
  id: string
  username: string
  email: string
  role: string
}

export type AuthResponse = {
  user: User
  token: string
}
