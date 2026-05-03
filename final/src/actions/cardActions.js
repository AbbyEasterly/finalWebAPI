import actionTypes from '../constants/actionTypes';
 

const env = process.env;


function cardsFetched(cards) {
    return {
        type: actionTypes.FETCH_CARDS,
        cards: cards
    }
}


export const addCard = (cardData) => {
    return dispatch => {
        const token = localStorage.getItem('token') || '';
        console.log('Posting card to:', `${env.REACT_APP_API_URL}/cards`, 'token present:', !!token);
        return fetch(`${env.REACT_APP_API_URL}/cards?packId=${cardData.packId}`, {
            method: 'POST',
            headers: {  
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'x-access-token': token || ''
            },
            body: JSON.stringify(cardData),
            mode: 'cors'    
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).catch((e) => console.log(e));
    }           
}


export const fetchCards = (packId) => {
    return dispatch => {
        const token = localStorage.getItem('token') || '';
        console.log('Fetching cards for packId:', packId, 'token present:', !!token);
        return fetch(`${env.REACT_APP_API_URL}/cards?packId=${packId}`, {
            method: 'GET',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': token ? `Bearer ${token}` : '',
                'x-access-token': token || ''
            },  
            mode: 'cors'    
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }   
            return response.json()
        }).then((res) => {
            return dispatch(cardsFetched(res));
        }).catch((e) => console.log(e));
    }           
}

export const deleteCard = (cardId) => {
    return dispatch => {
        const token = localStorage.getItem('token') || '';
        console.log('Deleting card with ID:', cardId, 'token present:', !!token);
        return fetch(`${env.REACT_APP_API_URL}/cards`, {
            method: 'DELETE',   
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'x-access-token': token || ''
            },  
            body: JSON.stringify({ cardId }),
            mode: 'cors'    
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).catch((e) => console.log(e));
    }
}

export const newCard = (cardData) => {
    return dispatch => {
        const token = localStorage.getItem('token') || '';
        console.log('Creating new card with data:', cardData, 'token present:', !!token);
        return fetch(`${env.REACT_APP_API_URL}/cards`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'x-access-token': token || ''
            },
            body: JSON.stringify(cardData),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).catch((e) => console.log(e));
    }   
}
