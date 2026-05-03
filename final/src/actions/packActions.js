import actionTypes from '../constants/actionTypes';

function packsFetched(packs) {
    return {
        type: actionTypes.FETCH_PACKS,
        packs
    }
}

function packsSet(pack) {
    return {
        type: actionTypes.SET_PACKS,
        selectedPack: pack
    }
}

export function setPacks(pack) {
    return dispatch => {
        dispatch(packsSet(pack));
    }
}

export function fetchPacks() {
    return dispatch => {
        const API_URL = process.env.REACT_APP_API_URL || '';
        const url = `${API_URL}/packs`;
        const token = localStorage.getItem('token') || '';
        console.log('Fetching packs from URL:', url, 'token (masked):', token ? `${token.slice(0,6)}...` : 'none');
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'x-access-token': token || '',

            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(`Fetch packs failed: ${response.status} ${response.statusText}`);
            }
            return response.json()
        }).then((res) => {
            return dispatch(packsFetched(res));
        }).catch((e) => console.error('fetchPacks error:', e));
    }
}

export function deletePack(packId) {
    return dispatch => {
        const API_URL = process.env.REACT_APP_API_URL || '';
        const url = `${API_URL}/packs`;
        const token = localStorage.getItem('token') || '';
        console.log('Deleting pack with ID:', packId, 'from URL:', url, 'token (masked):', token ? `${token.slice(0,6)}...` : 'none');
        return fetch(url, { 
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',   
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'x-access-token': token || ''
            },
                body: JSON.stringify({ packId }),

            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(`Delete pack failed: ${response.status} ${response.statusText}`);
            }   
            return response.json()
        }).then((res) => {
            console.log('Pack deleted successfully:', res);
            dispatch(fetchPacks());
        }
        ).catch((e) => console.error('deletePack error:', e));
    }   
}

export function createPack(packData) {
    return dispatch => {
        const API_URL = process.env.REACT_APP_API_URL || '';
        const url = `${API_URL}/packs`;
        const token = localStorage.getItem('token') || '';
        console.log('Creating new pack with data:', packData, 'to URL:', url, 'token (masked):', token ? `${token.slice(0,6)}...` : 'none');
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'x-access-token': token || ''
            },
            body: JSON.stringify(packData),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(`Create pack failed: ${response.status} ${response.statusText}`);
            }
            return response.json()
        }).then((res) => {
            console.log('Pack created successfully:', res);
            dispatch(fetchPacks());
        }).catch((e) => console.error('newPack error:', e));
    }
}

export function updatePack(packId, packData) {
    return dispatch => {
        const API_URL = process.env.REACT_APP_API_URL || '';
        const url = `${API_URL}/packs`;
        const token = localStorage.getItem('token') || '';
        console.log('Updating pack with ID:', packId, 'with data:', packData, 'to URL:', url, 'token (masked):', token ? `${token.slice(0,6)}...` : 'none');
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'x-access-token': token || ''
            },
            body: JSON.stringify(packData),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(`Update pack failed: ${response.status} ${response.statusText}`);
            }
            return response.json()
        }).then((res) => {
            console.log('Pack updated successfully:', res);
            dispatch(fetchPacks());
        }).catch((e) => console.error('updatePack error:', e));
    }
}