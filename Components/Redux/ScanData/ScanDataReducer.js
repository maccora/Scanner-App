import * as TYPES from './ScanType.js';
import AlanaData from '../../../AlanaData.json'

function exists(data)
{
        let status = {"status": false, "index": null}
        SCAN_STATE.scanHistory.forEach((element, index)=>{

            if(data == element.data)
            {
                status =  {"status": true, "index": index}
            }
        })

        return status
}

function createScan(state,action){
        
        const tempState = state;  
       
        const scanExists = exists(action.payload)

        if(scanExists.status)
        {
            tempState.scanHistory[scanExists.index].visited++
        }
        else{
            tempState.key++
            tempState.scanHistory.push({"data":action.payload, "visited":1, "key":tempState.key.toString()})
        }
        
        const newState = tempState

        return newState
}

function getScanHistory(state,action){

    const tempState = state
    tempState.scanHistory = AlanaData.user_data[action.payload.userIndex].scanhistory
    const newState = tempState
    return newState;

}

function updateScanDatabase(state,action){
 
        Object.assign(AlanaData.user_data[action.payload.userIndex].scanhistory, state.scanHistory)

        return state
}

function deleteScan(state,action){

    const tempState = state
   
    let spliceIndex
    tempState.scanHistory.forEach((element,index)=>{
       
        if(element.key === action.payload.key)
        {
            
            spliceIndex = index
        }

    })

    tempState.scanHistory.splice(spliceIndex,1)

    const newState = tempState;

    return newState
   
}

function incrementVisited(state, action)
{
        const tempState = state
        for(let i = 0; i < tempState.scanHistory.length;i++)
        {
            if(tempState.scanHistory[i].data === action.payload)
            {
                tempState.scanHistory[i].visited++
                break;
            }
        }
        const newState = tempState;
        return newState;

}

const SCAN_STATE = {
    scanHistory: [],
    key:0,
  }

export default function scanDataReducer(state = SCAN_STATE ,action)
{
    switch(action.type){

        case TYPES.CREATE_SCAN:
            return createScan(state,action);
        case TYPES.GET_SCAN_HISTORY:
            return getScanHistory(state,action);
        case TYPES.UPDATE_SCAN_DATABASE:
            return updateScanDatabase(state,action);
        case TYPES.DELETE_SCAN:
            return deleteScan(state,action);
        case TYPES.INCREMENT_VISITED:
            return incrementVisited(state,action);
        default:
            return state;

    }
}
