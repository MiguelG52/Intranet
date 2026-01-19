import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin } from "lucide-react";
import { UserProfile } from "@/lib/schemas/responses/users.response";

interface EmployeeCardProps {
  employee: UserProfile;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const fullName = `${employee.name} ${employee.lastname}`;
  const initials = `${employee.name[0]}${employee.lastname[0]}`.toUpperCase();
  const position = employee.position?.title || "Sin puesto";
  const area = employee.position?.area?.name || "Sin área";
  const location = employee.country?.name || "Ubicación desconocida";
  const email = employee.email;
  const phone = employee.userDetail?.phoneNumber || "Sin teléfono";
  const avatarUrl = employee.userDetail?.profilePicture;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-0">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-cyan-500 relative">
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
              <AvatarImage src={avatarUrl} alt={fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {/* Status indicator removed as requested */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-12 pb-4 text-center px-4">
        <h3 className="font-bold text-lg text-gray-900 truncate" title={fullName}>
          {fullName}
        </h3>
        <p className="text-sm text-gray-500 font-medium mb-1 truncate" title={position}>
          {position}
        </p>
        <Badge variant="secondary" className="mb-4">
          {area}
        </Badge>

        <div className="space-y-2 text-sm text-gray-600 text-left mt-2">
          <div className="flex items-center gap-2 truncate" title={email}>
            <Mail className="h-4 w-4 text-gray-400 shrink-0" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2 truncate" title={phone}>
            <Phone className="h-4 w-4 text-gray-400 shrink-0" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2 truncate" title={location}>
            <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex gap-2 justify-center">
         {/* Buttons removed as requested */}
      </CardFooter>
    </Card>
  );
}
