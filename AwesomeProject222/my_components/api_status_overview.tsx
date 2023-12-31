import React from 'react';
import { Text } from 'react-native';

import styles from '../Stylesheet';

const MONITOR_API_URL = 'http://212.10.61.210:2003/connection/ping';
const AUTH_API_URL = 'http://212.10.61.210:2000/connection/ping';

interface State {
    monitorApiStatus: string;
    authApiStatus: string;
    monitorApiStatusLoading: boolean;
    authApiStatusLoading: boolean;
}

class api_status_overview extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            monitorApiStatus: '',
            authApiStatus: '',
            monitorApiStatusLoading: true,
            authApiStatusLoading: true,
        }

        this.getMonitorApiStatus = this.getMonitorApiStatus.bind(this);
        this.getAuthApiStatus = this.getAuthApiStatus.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    
    async _getApiStatus (url: string) {
        try {
            const response = await fetch(url);
            const json = await response.text();
            return json;
        } catch (error) {
            console.error(error);
            return 'error';
        }
    };
    
    async getMonitorApiStatus() {
        this.setState({monitorApiStatusLoading: true});

        let response = await this._getApiStatus(MONITOR_API_URL);

        this.setState({monitorApiStatus: response});
        this.setState({monitorApiStatusLoading: false});
    };

    async getAuthApiStatus() {
        this.setState({authApiStatusLoading: true});

        let response = await this._getApiStatus(AUTH_API_URL);

        this.setState({authApiStatusLoading: false});
        this.setState({authApiStatus: response});
    };

    refresh() {
        this.getMonitorApiStatus();
        this.getAuthApiStatus();
    }

    componentDidMount() {
        this.getMonitorApiStatus();
        this.getAuthApiStatus();
    }

    render() {
        return (
            <>
                {this.state.monitorApiStatusLoading ? (
                    <Text style={styles.text}>Loading...</Text>
                    ) : (
                        <Text style={styles.text}>{this.state.monitorApiStatus}</Text>
                        )}
                {this.state.authApiStatusLoading ? (
                    <Text style={styles.text}>Loading...</Text>
                ) : (
                    <Text style={styles.text}>{this.state.authApiStatus}</Text>
                )}
            </>
        );
    }
}

export default api_status_overview;