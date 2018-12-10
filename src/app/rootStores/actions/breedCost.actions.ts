import { Action } from '@ngrx/store';

export enum BreedCostActionTypes {
  GET = 'GETBREED'
}

export class GetBreedCost implements Action {
  readonly type = BreedCostActionTypes.GET;
  constructor(public payload: any) {}
}

export type BreedCostActionsUnion = GetBreedCost; /* | Logout;*/