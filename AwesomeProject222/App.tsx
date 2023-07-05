import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useEffect, useState} from 'react';
import { ActivityIndicator } from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

function HomeScreen({ navigation }: { navigation: any }) {
// http://212.10.61.210:2003/Connection/Ping

  // var result = await FetchText();
  // var result = 'test';
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState('test');

  const getStrToShow = async () => {
    try {
      const response = await fetch('http://212.10.61.210:2003/connection/ping');
      const json = await response.text();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // const strToShow = () => {
  //   return fetch('http://212.10.61.210:2003/connection/ping')
  //   .then(response => response.text())
  //   .then(text => {
  //     console.log(text);
  //     result = text;
  //     return result;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     return error;
  //   });
  // }

  useEffect(() => {
    getStrToShow();
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>Home Screen</Text>
          <Text>{data}</Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
        </View>
      )}
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

// async function FetchText() {
//   return await fetch('http://212:10:61:210:2003/Connection/Ping')
//     .then(response => response.text())
//     .then(text => {
//       console.log(text);
//       return text;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   {/* <Drawer.Navigator>
    //     <Drawer.Screen name="Feed" component={HomeScreen} />
    //     <Drawer.Screen name="Article" component={DetailsScreen} />
    //   </Drawer.Navigator> */}
    //   <Stack.Navigator initialRouteName='Home'>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Details" component={DetailsScreen}/>
    //   </Stack.Navigator>
    // </NavigationContainer>

      /* <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits. Done :D
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView> */
  );
}



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
