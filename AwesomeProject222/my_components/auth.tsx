import React from "react";
import { useState } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

const LOGIN_URL = 'http://212.10.61.210:2000/Auth/Login'

class Auth extends React.Component<any, any> {
    constructor(props: any = {}) {
        super(props);
        this.state = { 
            login_response: AuthenticateResponse,
        };

        this.login = this.login.bind(this);
        this.retrieve_token_from_storage = this.retrieve_token_from_storage.bind(this);
        this.logout = this.logout.bind(this);
    }
        
    async login(email: string, password: string): Promise<string> {
        try {
            // Call login function
            const response: AuthenticateResponse | string = await this._call_auth_api(LOGIN_URL, email, password);
            this.state = { login_response: response };
            
            
            // If login unsuccessful, display error message
            if (response instanceof AuthenticateResponse == false) {
                console.error(response);
                return 'error';
            }
            // If login successful, navigate to home screen
            await EncryptedStorage.setItem('token', this.state.login_response.token);
            await EncryptedStorage.setItem('username', this.state.login_response.userName);
            await EncryptedStorage.setItem('email', this.state.login_response.email);
            await EncryptedStorage.setItem('userId', this.state.login_response.id);

            return 'Welcome ' + await this.state.login_response.userName;
        }
        catch (error) {
            console.error(error);
            return 'error';
        }
    }

    async _call_auth_api(url: string, username: string, password: string): Promise<AuthenticateResponse | string> {
        const auth_request = new AuthenticateRequest(username, password);
        
        try {
            const controller = new AbortController();
            const signal = controller.signal;

            setTimeout(() => {
                controller.abort();
            }, 5000);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*',
                },
                signal,
                body: JSON.stringify(auth_request),
            });

            // Read response as AuthResponse
            const json = await response.json();
            const auth_response = new AuthenticateResponse(json.id, json.token, json.email, json.userName);

            return auth_response;
        }
        catch (error) {
            console.error(error);
            return 'error';
        }
    };

    async test_auth_authenticate(): Promise<string> {
        const token = await EncryptedStorage.getItem('token');
        const url = 'http://212.10.61.210:2000/connection/AuthPing'

        console.info('calling auth api to test authentication');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': 'Bearer ' + token,
            },
        });

        if (!response.ok) {
            console.error(response);
            return Promise.reject(response);
        }

        // Read response
        console.info(response);
        const json = await response.text();
        console.info(json);

        return json;
    }

    async retrieve_token_from_storage(): Promise<string | null> {
        try {
            const token = await EncryptedStorage.getItem('token');
            console.info('token retrieved from storage: ' + token);
            return token;
        }
        catch (error) {
            console.error(error);
            return 'error';
        }
    }

    async TokenAuth(): Promise<boolean> {
        const token = await this.retrieve_token_from_storage();
        const url = 'http://212.10.61.210:2000/Auth/TokenAuth'

        // If no token found, return false
        if (token == null || token == 'error' || token == '')
            return false;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': '*/*',
                },
                body: JSON.stringify(new TokenAuthenticateRequest(token)),
            });

            // If response is not ok, return false
            if (!response.ok) {
                console.error(response);
                return false;
            }

            // Read response as AuthResponse
            const json = await response.json();
            const auth_response = new AuthenticateResponse(json.id, json.token, json.email, json.userName);

            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    async logout(): Promise<boolean> {
        try {
            await EncryptedStorage.removeItem('token');
            await EncryptedStorage.removeItem('username');
            await EncryptedStorage.removeItem('email');
            await EncryptedStorage.removeItem('userId');
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
}

class AuthenticateRequest {
    email: string;
    password: string;
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

class AuthenticateResponse {
    id: string;
    token: string;
    email: string;
    userName: string;
    constructor(id: string, token: string, email: string, userName: string) {
        this.id = id;
        this.token = token;
        this.email = email;
        this.userName = userName;
    }
}

class TokenAuthenticateRequest {
    AuthenticationToken: string;
    constructor(token: string) {
        this.AuthenticationToken = token;
    }
}


export default Auth;