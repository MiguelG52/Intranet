export interface Country {
  code: string;
  name: string;
}

export interface Role {
  roleId: string;
  roleName: string;
}

export interface Area {
  areaId: string;
  areaName: string;
}

export interface Position {
  positionId: string;
  title: string;
  areaId: string;
}