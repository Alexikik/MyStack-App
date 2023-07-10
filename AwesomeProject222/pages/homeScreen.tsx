
import {NavigationContainer} from '@react-navigation/native';
import ApiStatusOverview from '../my_components/api_status_overview';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';


interface HomeScreenState {
    isLoading: boolean;
    data: string;
}


class HomeScreen extends React.Component<{}, HomeScreenState> {
    childRef: React.RefObject<ApiStatusOverview>;
    constructor(props: {}) {
    super(props);
    this.state = {
        isLoading: true,
        data: 'test',
    };
        this.childRef = React.createRef();
    }

    render(): React.ReactNode {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.darker }}>
                <View>
                    <Text>Home Screen</Text>
                    <Text>{this.state.data}</Text>
                    <Button
                        title="Refresh"
                        onPress={() => this.childRef.current?.refresh()}
                    />
                    <ApiStatusOverview ref={this.childRef}/>
                </View>
            </View>
        );
    }
}

export default HomeScreen;