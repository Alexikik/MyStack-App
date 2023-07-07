import React from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Auth from "../my_components/auth";

class LoginPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: "user@example.com",
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
            const result = await auth.login(this.state.username, this.state.password);
            this.setState({responseText: result});
        } catch (error) {
            console.error(error);
            this.setState({responseText: "Error"});
        }
        
        
        // throw new Error("Function not implemented.");
        // Call login function
        // If login successful, navigate to home screen
        // If login unsuccessful, display error message
    }

    render(): React.ReactNode {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <Text>Login Page</Text>
                    {/* Username textbox with label */}
                    <Text>Username</Text>
                    <TextInput>
                        {this.state.username}
                    </TextInput>

                    {/* Password textbox with label */}
                    <Text>Password</Text>
                    <TextInput>
                        {this.state.password}
                    </TextInput>

                    {/* Login button */}
                    <Button
                        title="Login"
                        onPress={() => this._login()}
                    />

                    {/* Error message */}
                    <Text>{this.state.responseText}</Text>
                </View>
            </View>
        );
    }
}

export default LoginPage;