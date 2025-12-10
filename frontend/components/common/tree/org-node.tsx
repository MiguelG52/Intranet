'use client';

import { useState } from "react";
import { OrgNodeCard, OrgNodeData } from "./org-node-card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OrgNodeProps {
  node: OrgNodeData;
  level: number;
}

export function OrgNode({ node, level }: OrgNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  // Expand by default if level is 1 or 2
  const [isExpanded, setIsExpanded] = useState(level < 2);

  return (
    <li>
      {/* Node Card */}
      <div className="inline-flex flex-col items-center gap-2">
        <OrgNodeCard node={node} />
        
        {hasChildren && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 rounded-full p-0 hover:bg-gray-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        )}
      </div>

      {/* Children */}
      {hasChildren && (
        <div
          className={`grid w-fit mx-auto transition-all duration-500 ease-in-out ${
            isExpanded
              ? "grid-rows-[1fr] grid-cols-[1fr] opacity-100"
              : "grid-rows-[0fr] grid-cols-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul>
              {node.children.map((child) => (
                <OrgNode key={child.positionId} node={child} level={level + 1} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}
