import { StorageCostActionTypes, StorageCostActionsUnion } from '../actions';

const cost: any = {
    body: {}
}

export function costStorageReducer(state: any = cost, action: StorageCostActionsUnion) {
    switch (action.type) {
        case StorageCostActionTypes.GET: {
            return state = {
                body: action.payload
            };
        }
        default: {
            return state;
        }
    }
}