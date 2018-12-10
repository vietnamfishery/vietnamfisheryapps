import { HarvestCostActionTypes, HarvestCostActionsUnion } from '../actions';

const costHarvest: any = {
    body: {}
}

export function harvestCostReducer(state: any = costHarvest, action: HarvestCostActionsUnion) {
    switch (action.type) {
        case HarvestCostActionTypes.GET: {
            return state = {
                body: action.payload
            };
        }
        default: {
            return state;
        }
    }
}