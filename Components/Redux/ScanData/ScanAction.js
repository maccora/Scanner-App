import * as TYPES from './ScanType.js';

export const createScan = scanInformation =>(

    {
        type: TYPES.CREATE_SCAN,
        payload: scanInformation

    }

)

export const getScanHistory = scanUser =>(

    {

        type: TYPES.GET_SCAN_HISTORY,
        payload: scanUser

    }

)

export const updateScanDatabase = scanData => (

    {

        type: TYPES.UPDATE_SCAN_DATABASE,
        payload: scanData

    }

)

export const deleteScan = scanToDelete => (

    {

        type: TYPES.DELETE_SCAN,
        payload: scanToDelete

    }

)

export const incrementVisited = scanToIncrement =>(

    {

        payload: scanToIncrement,
        type: TYPES.INCREMENT_VISITED,

    }

)
