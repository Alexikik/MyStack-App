
import ApiStatusOverview from '../my_components/api_status_overview';
import React from 'react';
import { ActivityIndicator, Button, Text, TouchableOpacity, View } from 'react-native';
import styles from '../Stylesheet';


import Auth from '../my_components/auth';


interface HomeScreenProps {
    navigation: any;
}

interface HomeScreenState {
    isLoading: boolean;
    data: string;
}

class HomeScreen extends React.Component<any, HomeScreenState> {
    childRef: React.RefObject<ApiStatusOverview>;

    constructor(props: HomeScreenProps) {
        super(props);
        this.state = {
            isLoading: true,
            data: 'test',
        };
        this.childRef = React.createRef();
    }

    async TokenAuth() {
        const auth = new Auth();
        const result = await auth.TokenAuth();
        if (!result) {
            this.props.navigation.navigate('Login');
        }
        this.setState({isLoading: false});
    }

    async onLogout() {
        const auth = new Auth();
        const result = await auth.logout();
        this.props.navigation.navigate('Login');
    }

    componentDidMount() {
        this.TokenAuth();
    }
    

    render(): React.ReactNode {
        const { navigation } = this.props;

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Home Screen</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.childRef.current?.refresh()}
                >
                    <Text style={styles.buttonText}>Refresh</Text>
                </TouchableOpacity>
                
                <ApiStatusOverview ref={this.childRef}/>

                <TouchableOpacity
                    style={{...styles.button, position: 'absolute', bottom: 0, width: '105%', margin: 10, alignItems: 'center'}}
                    onPress={() => this.onLogout()}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeScreen;