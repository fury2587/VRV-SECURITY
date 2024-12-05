# Admin Dashboard

A modern, responsive admin dashboard built with React, TypeScript, Tailwind CSS, and shadcn/ui.

![Admin Dashboard](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop)

## Features

- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 🔍 Global search functionality
- 🎯 Role-based access control
- 🔐 Permission management
- 👥 User management

## Core Functionality

### Dashboard
- Overview of key metrics
- Quick access to all main features
- Real-time statistics display

### User Management
- View all users in a table format
- Add new users with detailed information
- Edit existing user details
- Delete users
- Search users by name or email
- Filter users by role and status

### Role Management
- Create custom roles
- Assign permissions to roles
- Edit role permissions
- Delete roles
- Search roles by name

### Permission Management
- Create new permissions
- Edit existing permissions
- Delete permissions
- Assign permissions to roles
- Search permissions by name or description

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components
│   │   ├── navbar.tsx   # Top navigation
│   │   └── sidebar.tsx  # Side navigation
│   ├── pages/           # Page components
│   │   ├── dashboard.tsx
│   │   ├── users.tsx
│   │   ├── roles.tsx
│   │   └── permissions.tsx
│   └── ui/             # Reusable UI components
├── lib/
│   ├── constants.ts    # App constants
│   ├── data.ts        # Mock data
│   ├── types.ts       # TypeScript types
│   └── utils.ts       # Utility functions
└── App.tsx            # Main app component
```

## Key Features Explained

### 1. Navigation
- **Sidebar**: Collapsible navigation menu with smooth animations
- **Navbar**: Global search and theme toggle
- **Responsive**: Adapts to all screen sizes

### 2. User Management
```typescript
// Adding a new user
const handleAddUser = (userData: Partial<User>) => {
  const newUser = {
    id: generateId(),
    name: userData.name,
    email: userData.email,
    role: userData.role,
    status: 'active'
  };
  setUsers([...users, newUser]);
};
```

### 3. Role Management
```typescript
// Assigning permissions to a role
const handleUpdateRole = (roleId: string, permissions: string[]) => {
  setRoles(roles.map(role => 
    role.id === roleId 
      ? { ...role, permissions } 
      : role
  ));
};
```

### 4. Permission Management
```typescript
// Creating a new permission
const handleAddPermission = (permissionData: Partial<Permission>) => {
  const newPermission = {
    id: generateId(),
    name: permissionData.name,
    description: permissionData.description
  };
  setPermissions([...permissions, newPermission]);
};
```

## Search Functionality

The application implements a global search that works across all sections:

1. **Global Search**: Available in the navbar for quick navigation
2. **Section-Specific Search**: Each section (Users, Roles, Permissions) has its own search functionality
3. **Real-time Filtering**: Results update as you type

```typescript
// Example of search implementation
const filteredItems = items.filter(item =>
  Object.values(item)
    .join(' ')
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
);
```

## Theme Support

The dashboard supports both light and dark themes:

- Automatic system theme detection
- Manual theme toggle
- Persistent theme preference
- Smooth theme transitions

## Working Process

1. **User Flow**:
   - Log in to access the dashboard
   - Navigate using the sidebar or navbar
   - Use global search for quick access
   - Manage users, roles, and permissions

2. **Data Management**:
   - All data is stored in state
   - Changes are reflected immediately
   - Search filters update in real-time
   - Form validations ensure data integrity

3. **Responsive Design**:
   - Mobile-first approach
   - Collapsible sidebar for small screens
   - Adaptive layouts for all devices
   - Touch-friendly interactions

## Best Practices Used

1. **Component Structure**:
   - Small, focused components
   - Clear separation of concerns
   - Reusable UI components
   - Consistent naming conventions

2. **State Management**:
   - Local state for component-specific data
   - Lifted state for shared data
   - Controlled forms for user input
   - Optimized re-renders

3. **Performance**:
   - Lazy loading of routes
   - Debounced search
   - Memoized components
   - Efficient list rendering

4. **Accessibility**:
   - ARIA labels
   - Keyboard navigation
   - Focus management
   - Color contrast compliance

## Future Improvements

1. **Authentication**:
   - Implement JWT authentication
   - Add OAuth providers
   - Session management

2. **Data Persistence**:
   - Add backend API integration
   - Implement data caching
   - Add offline support

3. **Enhanced Features**:
   - Bulk actions
   - Export/Import data
   - Advanced filters
   - Activity logs

4. **Performance**:
   - Implement virtual scrolling
   - Add progressive loading
   - Optimize bundle size