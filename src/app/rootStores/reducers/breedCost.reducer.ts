import { BreedCostActionTypes, BreedCostActionsUnion } from '../actions';

const costBreed: any = {
    body: {}
}

export function breedCostReducer(state: any = costBreed, action: BreedCostActionsUnion) {
    switch (action.type) {
        case BreedCostActionTypes.GET: {
            return state = {
                body: action.payload
            };
        }
        default: {
            return state;
        }
    }
}