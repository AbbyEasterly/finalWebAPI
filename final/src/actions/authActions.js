import actionTypes from '../constants/actionTypes';
//import runtimeEnv from '@mars/heroku-js-runtime-env'
const apiBaseUrl = process.env.REACT_APP_API_URL || '';

function userLoggedIn(username) {
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    }
}

function logout() {
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function submitLogin(data) {
    console.log('Submitting login with data:', data); // Debugging log
    return dispatch => {

        return fetch(`${apiBaseUrl}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(data),
            
            mode: 'cors'
        }).then((response) => {
            return response.json().then((body) => {
                if (!response.ok) {
                    const err = body && body.message ? body.message : response.statusText;
                    throw new Error(err);
                }
                return body;
            });
        }).then((res) => {
            // Try common token locations
            const token = (res && (res.token || res.accessToken || (res.data && res.data.token))) || '';
            const trimmed = token ? token.toString().trim() : '';
            console.log('Login response:', res);
            console.log('Login token (masked):', trimmed ? `${trimmed.slice(0,6)}...` : 'none');
            if (!trimmed) throw new Error('No token returned from login');
            localStorage.setItem('username', res.name || data.username || '');
            localStorage.setItem('token', trimmed);
            dispatch(userLoggedIn(res.name || data.username));
            return res;
        }).catch((e) => {
            console.error('submitLogin error:', e);
            throw e;
        });
    }
}

export function submitRegister(data) {
    return dispatch => {
        return fetch(`${apiBaseUrl}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(submitLogin(data));
        }).catch((e) => console.log(e));
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout())
    }
}