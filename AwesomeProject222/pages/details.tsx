import React from 'react';
import { Text, View } from 'react-native';

import styles from '../Stylesheet';

function DetailsScreen() {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.text}>Details Screen</Text>
            </View>
        </View>
    );
}

export default DetailsScreen;