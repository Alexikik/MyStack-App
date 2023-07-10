import React from "react";
import { Text, View } from "react-native";

import styles from "../Stylesheet";
import InternetMonitoringRepository from "../Repositories/InternetMonitoringRepository";
import InternetProblem from "../dtos/InternetProblem";

class InternetMonitoring extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            internetMonitoringRepository: new InternetMonitoringRepository(),
            internetProblemList: [] as InternetProblem[],
        }
    }

    async componentDidMount() {
        const internetProblemList = await this.state.internetMonitoringRepository._getInternetMonitoringData();
        this.setState({internetProblemList: internetProblemList});
    }


    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Internet Monitoring</Text>
                <Text style={styles.text}>Count: {this.state.internetProblemList.length}</Text>
            </View>
        );
    }
}

export default InternetMonitoring;