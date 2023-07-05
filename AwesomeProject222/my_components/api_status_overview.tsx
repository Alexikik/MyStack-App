import React from 'react';
import { Text } from 'react-native';
import {useEffect, useState} from 'react';

function tester() {
  const [monitorApiStatus, setMonitorApiStatus] = useState('test');
  const [authApiStatus, setAuthApiStatus] = useState('test');

  const getMonitorApiStatus = async () => {
    try {
        const response = await fetch('http://212.10.61.210:2003/connection/ping');
        const json = await response.text();
        setMonitorApiStatus(json);
    } catch (error) {
        console.error(error);
    }
  };

  const getAuthApiStatus = async () => {
    try {
        const response = await fetch('http://212.10.61.210:2000/connection/ping');
        const json = await response.text();
        setAuthApiStatus(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMonitorApiStatus();
    getAuthApiStatus();
  });

  return (
    <>
      <Text>{monitorApiStatus}</Text>
      <Text>{authApiStatus}</Text>
    </>
  )
}

export default tester;
