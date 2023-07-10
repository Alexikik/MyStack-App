import React from "react";
import { Text, View } from "react-native";

import styles from "../Stylesheet";

import Auth from "../my_components/auth";

class TestPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loginToken: "",
            storageToken: "",
            authPingResponse: "",
        }
    }
    
    async login() {
        const auth = new Auth();
        const response = await auth.login("user@example.com", "string");

        this.setState({loginToken: response});
    }

    async getToken() {
        const auth = new Auth();
        const token = await auth.retrieve_token_from_storage();

        if (token == null) {
            this.setState({storageToken: 'null'});
        }
        else(
            this.setState({storageToken: token})
        )
    }

    async authPing() {
        const auth = new Auth();
        const response = await auth.test_auth_authenticate().catch((error) => {
            console.error(error);
            this.setState({authPingResponse: 'error'});
            return;
        });

        if (response == null || response == undefined || response == "") {
            this.setState({authPingResponse: 'error'});
            return;
        }

        this.setState({authPingResponse: response});
    }

    componentDidMount() {
        this.login();
        this.getToken();
        this.authPing();
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                    <Text style={styles.text}>Login token response</Text>
                    <Text style={styles.text}>{this.state.loginToken}</Text>
                    <Text style={styles.text}></Text>

                    <Text style={styles.text}>Retreive token from secure storage</Text>
                    <Text style={styles.text}>{this.state.storageToken}</Text>
                    <Text style={styles.text}></Text>

                    <Text style={styles.text}>Auth ping response</Text>
                    <Text style={styles.text}>{this.state.authPingResponse}</Text>
                </View>
            </View>
        );
    }
}

export default TestPage;