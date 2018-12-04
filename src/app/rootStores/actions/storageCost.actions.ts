import { Action } from '@ngrx/store';

export enum StorageCostActionTypes {
  GET = 'GET'
}

export class GetCost implements Action {
  readonly type = StorageCostActionTypes.GET;
  constructor(public payload: any) {}
}

export type StorageCostActionsUnion = GetCost; /* | Logout;*/