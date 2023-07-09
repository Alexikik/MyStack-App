import React from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
        const response = await auth.test_auth_authenticate();

        this.setState({authPingResponse: response});
    }

    componentDidMount() {
        this.login();
        this.getToken();
        this.authPing();
    }

    render(): React.ReactNode {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <View>
                    <Text style={{fontSize: 24 }}>Test Page</Text>

                    <Text>Login token response</Text>
                    <Text>{this.state.loginToken}</Text>
                    <Text></Text>

                    <Text>Retreive token from secure storage</Text>
                    <Text>{this.state.storageToken}</Text>
                    <Text></Text>

                    <Text>Auth ping response</Text>
                    <Text>{this.state.authPingResponse}</Text>
                </View>
            </View>
        );
    }
}

export default TestPage;