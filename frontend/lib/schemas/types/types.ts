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
  countryCode?: string;
}

export interface Position {
  positionId: string;
  title: string;
  areaId: string;
  managerId?: string;
}

export interface BenefitType {
  benefitTypeId: string;
  title: string;
  description?: string;
}

export interface Benefit {
  benefitId: string;
  title: string;
  description?: string;
  countryCode: string;
  benefitTypeId: string;
  benefitType?: BenefitType;
  country?: Country;
}