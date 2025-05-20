export interface PeriodTypes {
  id: number;
  periodId: number | null;
  group: string;
  startDate: string;
  endDate: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface YearsType {
  id: number;
  year: string;
  createdAt: string;
  updatedAt: string;
}

export type PeriodForm = {
  group: string;
  startDate: string | null;
  endDate: string | null;
};

export interface QuotaItem {
  id: number;
  groupId: number;
  title: string;
  quota: number;
  remainingQuota: number;
  createdAt: string;
  updatedAt: string;
}

export type QuotaForm = {
  quota: number;
  remainingQuota: number;
};

export interface Quota {
  id: number;
  groupId: number;
  title: string;
  quota: number;
  remainingQuota: number;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: number;
  periodId: number;
  group: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  quota: Quota[];
}

export interface PeriodQouta {
  id: number;
  year: string;
  createdAt: string;
  updatedAt: string;
  group: Group[];
}
