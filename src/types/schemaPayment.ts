export interface FormSchema {
  periodId: number | null;
  groupId: number | null;
  submissionScheme: string;
  termsConditionId: number[];
}

export interface FormSchemaErrors {
  periodId?: string;
  groupId?: string;
  submissionScheme?: string;
  termsConditionId?: string;
}
