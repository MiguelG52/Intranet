import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from 'lucide-react';

export interface OrgNodeData {
  positionId: string;
  title: string;
  area: {
    areaName: string;
  };
  users: {
    userId: string;
    name: string;
    lastname: string;
    userDetail?: {
      profilePicture?: string;
    };
  }[];
  children: OrgNodeData[];
}

interface OrgNodeCardProps {
  node: OrgNodeData;
}

export function OrgNodeCard({ node }: OrgNodeCardProps) {
  return (
    <Card className="w-64 z-10 relative hover:shadow-xl transition-shadow border-t-4 border-t-primary mx-auto py-2 cursor-pointer hover:translate-y-[-4px] transition-all ease-in-out duration-300">
      <CardContent className="text-center">
        <div className="mb-2 flex justify-center">
          <Badge variant="outline" className="bg-red-50 text-primary border-red-200">
            <Building2 className="w-3 h-3 mr-1" />
            {node.area.areaName}
          </Badge>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-1">{node.title}</h3>
        
        {node.users.length > 0 ? (
          <div className="mt-3 space-y-2">
            {node.users.map(user => (
              <div key={user.userId} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md text-left">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.userDetail?.profilePicture} />
                  <AvatarFallback>{user.name[0]}{user.lastname[0]}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{user.name} {user.lastname}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 text-xs text-gray-400 italic">
            Vacante
          </div>
        )}
      </CardContent>
    </Card>
  );
}
