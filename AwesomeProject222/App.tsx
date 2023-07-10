import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import styles from './Stylesheet';

import HomeScreen from './pages/homeScreen';
import DetailsScreen from './pages/details';
import LoginPage from './pages/loginPage';
import TestPage from './pages/testPage';
import Auth from './my_components/auth';

const Drawer = createDrawerNavigator();

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }


// async function TokenAuth({navigation}: {navigation: any}) {
//     const auth = new Auth();
//     const result = await auth.TokenAuth();

//     if (result) {
//       // Navigate to home page
//       console.log("TokenAuth: true");
//     } else {
//       // Navigate to login page
//       console.log("TokenAuth: false");
//       navigation.navigate({ name: 'Login' });
//     }
// }
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = Colors.darker;
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  // React.useEffect(() => {
  //   TokenAuth(navigation);
  // }, []);

  const auth = new Auth();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: styles.drawerBackground.color,
          },
          headerTintColor: styles.headerTintColor.color,
          headerStyle: {
            backgroundColor: styles.headerBackground.color,
          },
          drawerLabelStyle: {
            color: styles.drawerLabel.color,
          },
          headerTitleStyle: {
            color: styles.headerTitleColor.color,
          },
        }}
        >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="Login" component={LoginPage} />
        <Drawer.Screen name="Test" component={TestPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const stylesOld = StyleSheet.create({
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
