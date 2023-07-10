import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import styles from "../Stylesheet";
import Auth from "../my_components/auth";

class LoginPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "user@example.com",
            password: "string",
            isLoading: false,
            responseText: "",
        }
    }

    async _login() {
        try {
            console.log("Login button pressed");
            this.setState({responseText: "Loading..."});

            const auth = new Auth();
            const result = await auth.login(this.state.email, this.state.password);
            this.setState({responseText: result});

            if (typeof(result) === "boolean" && result) {
                this.props.navigation.navigate('Home');
            }
            else {
                this.setState({responseText: result});
            }
        } catch (error) {
            console.error(error);
            this.setState({responseText: "Error"});
        }
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    value={this.state.email}
                    autoCapitalize="none"
                    style={styles.input}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    value={this.state.password}
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._login()}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.text}>{this.state.responseText}</Text>
            </View>
        );
    }
}

export default LoginPage;