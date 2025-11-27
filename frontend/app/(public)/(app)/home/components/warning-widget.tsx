import { AlertTriangle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function WarningWidget() {
  return (
    <Card className="bg-orange-500 text-white p-6 relative overflow-hidden border-none">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" className="text-white hover:bg-orange-600 rounded-full h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className='flex items-center gap-2'>
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Atención</h3> 
        </div>       
        <div>
    
          <p className="text-orange-50 mb-4">
            Por motivos de remodelacion la entrada será por la puerta trasera hasta nuevo aviso.
          </p>
          <div className="text-xs text-orange-100 uppercase tracking-wider font-semibold">
            Importante
          </div>
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute top-10 -left-10 w-20 h-20 bg-white/10 rounded-full" />
    </Card>
  );
}
