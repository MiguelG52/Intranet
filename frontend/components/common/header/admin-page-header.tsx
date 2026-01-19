'use client';

import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AdminPageHeaderProps {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  addButtonText: string;
  onAddClick: () => void;
}

export function AdminPageHeader({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  addButtonText,
  onAddClick,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-11 rounded-xl bg-white border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <Button
        onClick={onAddClick}
        className="w-full md:w-auto h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100 transition-all hover:scale-105 active:scale-95 py-3"
      >
        <Plus className="mr-2 h-4 w-4" />
        {addButtonText}
      </Button>
    </div>
  );
}
