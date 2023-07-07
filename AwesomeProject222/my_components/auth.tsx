import React from "react";
import { useState } from "react";


const LOGIN_URL = 'http://212.10.61.210:2000/Auth/Login'

class Auth extends React.Component<any, any> {
    constructor(props: any = {}) {
        super(props);
        this.state = { 
            login_response: AuthenticateResponse,
        };

        this.login = this.login.bind(this);
    }
        
    async login(username: string, password: string): Promise<string> {
        console.info('login called');
        try {
            // Call login function
            const response: AuthenticateResponse | string = await this._call_auth_api(LOGIN_URL, username, password);
            this.state = { login_response: response };
            
            return 'Welcome ' + await this.state.login_response.userName;

            // If login successful, navigate to home screen
            // If login unsuccessful, display error message
        }
        catch (error) {
            console.error(error);
            return 'error';
        }
    }

    async _call_auth_api(url: string, username: string, password: string): Promise<AuthenticateResponse | string> {
        const auth_request = new AuthenticateRequest(username, password);
        
        try {
            console.info('calling auth api');
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

export default Auth;