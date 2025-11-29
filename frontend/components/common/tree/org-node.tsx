import { OrgNodeCard, OrgNodeData } from "./org-node-card";

interface OrgNodeProps {
  node: OrgNodeData;
}

export function OrgNode({ node }: OrgNodeProps) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <li>
      {/* Node Card */}
      <div className="inline-block">
        <OrgNodeCard node={node} />
      </div>

      {/* Children */}
      {hasChildren && (
        <ul>
          {node.children.map((child) => (
            <OrgNode key={child.positionId} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
