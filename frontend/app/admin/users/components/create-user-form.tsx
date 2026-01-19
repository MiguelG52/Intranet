'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserFormSchema, CreateUserFormType, updateUserFormSchema, UpdateUserFormType } from '@/lib/schemas/Components/Forms/create-user-form.schema';
import { createUser } from '@/lib/actions/users/create-user.action';
import { updateUser } from '@/lib/actions/users/update-user.action';
import { getPositionsByArea } from '@/lib/actions/common/common.actions';
import { Button } from '@/components/ui/button';
import { Loader2, User, Mail, Globe, Briefcase, Phone, Shield } from 'lucide-react';
import FieldInput from '@/components/common/field-input/field-input';
import SelectInput from '@/components/common/select-input/select-input';
import DateInput from '@/components/common/date-input/date-input';
import { useEffect, useState, useTransition, useRef } from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { UserProfile } from '@/lib/schemas/responses/users.response';

interface CreateUserFormProps {
  roles: { id: string; name: string }[];
  countries: { code: string; name: string }[];
  positions: { id: string; title: string }[];
  areas: { areaId: string; areaName: string }[];
  onSuccess?: () => void;
  user?: UserProfile;
}

export function CreateUserForm({ roles, countries, positions: initialPositions, areas, onSuccess, user }: CreateUserFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [positions, setPositions] = useState(initialPositions);
  const isEditMode = !!user;
  const initialAreaId = user?.position?.area?.id;

  const form = useForm<CreateUserFormType | UpdateUserFormType>({
    resolver: zodResolver(isEditMode ? updateUserFormSchema : createUserFormSchema),
    defaultValues: {
      name: user?.name || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      roleId: user?.role?.roleId || '',
      countryCode: user?.country?.code || '',
      positionId: user?.position?.id || '',
      areaId: user?.position?.area?.id || '',
      phoneNumber: user?.userDetail?.phoneNumber || '',
      birthdate: user?.userDetail?.birthdate || '',
    },
  });

  const selectedAreaId = form.watch('areaId');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchPositions = async () => {
      if (selectedAreaId) {
        try {
          const data = await getPositionsByArea(selectedAreaId);
          setPositions(data.map((p) => ({ id: p.positionId, title: p.title })));
          
          if (!isFirstRender.current || selectedAreaId !== initialAreaId) {
             if (selectedAreaId !== initialAreaId) {
                 form.setValue('positionId', '');
             }
          }
        } catch (error) {
          console.error('Error fetching positions:', error);
          setPositions([]);
        }
      } else {
        setPositions(initialPositions);
      }
      isFirstRender.current = false;
    };
    fetchPositions();
  }, [selectedAreaId, initialPositions, form, initialAreaId]);

  const onSubmit = (data: CreateUserFormType | UpdateUserFormType) => {
    setError(null);
    startTransition(async () => {
      let result;
      if (isEditMode && user) {
        result = await updateUser(user.userId, data);
      } else {
        result = await createUser(data as CreateUserFormType);
      }

      if (!result.success) {
        setError(result.message);
      } else {
        form.reset();
        onSuccess?.();
      }
    });
  };

  const onError = (errors: any) => {
    console.error("Errores de validación en el formulario:", errors);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldInput
          name="name"
          control={form.control}
          type="text"
          placeholder="Nombre"
          label="Nombre"
          Icon={User}
        />
        <FieldInput
          name="lastname"
          control={form.control}
          type="text"
          placeholder="Apellido"
          label="Apellido"
          Icon={User}
        />
      </div>

      <FieldInput
        name="email"
        control={form.control}
        type="email"
        placeholder="correo@empresa.com"
        label="Email Corporativo"
        Icon={Mail}
      />

      <p className="text-sm text-muted-foreground">
        {isEditMode
          ? 'La contraseña actual se mantiene sin cambios. Usa el flujo de recuperación si necesitas restablecerla.'
          : 'La contraseña temporal se generará automáticamente y se enviará por correo al usuario.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
          name="roleId"
          control={form.control}
          label="Rol"
          placeholder="Selecciona un rol"
          Icon={Shield}
          options={roles.map(r => ({ value: r.id, label: r.name }))}
        />

        <SelectInput
          name="countryCode"
          control={form.control}
          label="País"
          placeholder="Selecciona un país"
          Icon={Globe}
          options={countries.map(c => ({ value: c.code, label: c.name }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
          name="areaId"
          control={form.control}
          label="Área"
          placeholder="Selecciona un área"
          Icon={Briefcase}
          options={areas.map(a => ({ value: a.areaId, label: a.areaName }))}
        />

        <SelectInput
          name="positionId"
          control={form.control}
          label="Puesto"
          placeholder="Selecciona un puesto"
          Icon={Briefcase}
          options={positions.map(p => ({ value: p.id, label: p.title }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldInput
          name="phoneNumber"
          control={form.control}
          type="tel"
          placeholder="+52 55 1234 5678"
          label="Teléfono"
          Icon={Phone}
        />
        <DateInput
          name="birthdate"
          control={form.control}
          label="Fecha de Nacimiento"
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </div>
      )}

      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isEditMode ? 'Actualizar Usuario' : 'Crear Usuario'}
        </Button>
      </DialogFooter>
    </form>
  );
}
