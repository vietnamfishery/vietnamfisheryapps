import { Action } from '@ngrx/store';

export enum HarvestCostActionTypes {
  GET = 'GETHARVEST'
}

export class GetHarvestCost implements Action {
  readonly type = HarvestCostActionTypes.GET;
  constructor(public payload: any) {}
}

export type HarvestCostActionsUnion = GetHarvestCost; /* | Logout;*/