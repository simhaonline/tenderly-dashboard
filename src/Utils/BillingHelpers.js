import {PlanUsageLabelMap} from "../Common/constants";


export function getLabelForPlanUsage(usage) {
    if(!PlanUsageLabelMap[usage]){
        return usage;
    }
    return PlanUsageLabelMap[usage];
}