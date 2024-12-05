import { User, Role, Permission } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
  },
];

export const roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    permissions: ['users.manage', 'roles.manage', 'permissions.manage'],
  },
  {
    id: '2',
    name: 'User',
    permissions: ['users.view'],
  },
];

export const permissions: Permission[] = [
  {
    id: '1',
    name: 'users.manage',
    description: 'Can manage users',
  },
  {
    id: '2',
    name: 'roles.manage',
    description: 'Can manage roles',
  },
  {
    id: '3',
    name: 'permissions.manage',
    description: 'Can manage permissions',
  },
  {
    id: '4',
    name: 'users.view',
    description: 'Can view users',
  },
];