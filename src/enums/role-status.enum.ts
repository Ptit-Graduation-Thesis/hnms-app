export enum RoleStatus {
  ADMIN = 1,
  ACCOUNTANT = 2,
  SALE_EMPLOYEE = 3,
}

export const getRoleName = (role: RoleStatus | string) => {
  switch (role) {
    case RoleStatus.ADMIN:
      return 'Admin'

    case RoleStatus.ACCOUNTANT:
      return 'Accountant'

    case RoleStatus.SALE_EMPLOYEE:
      return 'Sale employee'

    default:
      return ''
  }
}
