import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PenIcon, PlusIcon, Trash2Icon, Search } from 'lucide-react';
import { permissions as initialPermissions } from '@/lib/data';
import type { Permission } from '@/lib/types';

export function Permissions() {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSavePermission = (permission: Partial<Permission>) => {
    if (editingPermission) {
      setPermissions(
        permissions.map((p) =>
          p.id === editingPermission.id ? { ...p, ...permission } : p
        )
      );
    } else {
      const newPermission: Permission = {
        id: Math.random().toString(36).substr(2, 9),
        name: permission.name || '',
        description: permission.description || '',
      };
      setPermissions([...permissions, newPermission]);
    }
    setIsDialogOpen(false);
    setEditingPermission(null);
  };

  const handleDeletePermission = (id: string) => {
    setPermissions(permissions.filter((permission) => permission.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Permissions</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="group">
              <PlusIcon className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPermission ? 'Edit Permission' : 'Add Permission'}
              </DialogTitle>
            </DialogHeader>
            <PermissionForm
              permission={editingPermission}
              onSubmit={handleSavePermission}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingPermission(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search permissions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 max-w-sm"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPermissions.map((permission) => (
              <TableRow key={permission.id} className="group">
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingPermission(permission);
                      setIsDialogOpen(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <PenIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePermission(permission.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function PermissionForm({
  permission,
  onSubmit,
  onCancel,
}: {
  permission: Permission | null;
  onSubmit: (permission: Partial<Permission>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: permission?.name || '',
    description: permission?.description || '',
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., users.create"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="e.g., Can create new users"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}