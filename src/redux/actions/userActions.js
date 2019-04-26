export const LOG_USER = 'LOG_USER'

export function logUser(credencials) {
  return {
    type: LOG_USER,
    credencials,
  }
}