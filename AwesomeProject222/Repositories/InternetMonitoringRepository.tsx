import React from "react";

import InternetProblem from "../dtos/InternetProblem";
import Auth from "../my_components/auth";

const MONITOR_API_URL = 'http://212.10.61.210:2003/InternetMonitoring/';

class InternetMonitoringRepository extends React.Component<any, any> {
    constructor(props: any = {}) {
        super(props);
        this.state = {
        }
    }

    
    async _getInternetMonitoringData(): Promise<InternetProblem[]> {
        const auth = new Auth();
        
        try {
            const response = await fetch(MONITOR_API_URL + 'GetInternetProblems', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Authorization': 'Bearer ' + await auth.retrieve_token_from_storage(),
                },
            });

            if (!response.ok) 
                return Promise.reject(response);

            // Read response
            const json = await response.json();
            const internetProblemsList = json as InternetProblem[];

            return internetProblemsList;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }



}

export default InternetMonitoringRepository;