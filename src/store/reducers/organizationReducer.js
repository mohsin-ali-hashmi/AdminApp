import { FETCH_ORGANIATIONS } from "../constants/types";

export default function OrganizationReduce (state=[], action) {
    switch (action.type){
        case FETCH_ORGANIATIONS:
            return action.payload;
        default:
            return state;
    }
}
