import { Home, Users, Shield, Lock } from 'lucide-react';

export const SIDEBAR_LINKS = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    title: 'Roles',
    href: '/roles',
    icon: Shield,
  },
  {
    title: 'Permissions',
    href: '/permissions',
    icon: Lock,
  },
];