// // In App.js in a new project
// navigation in App.js
// import * as React from 'react';
// import {View, Text, Button} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// // import {createNativeStackNavigator} from '@react-navigation/native-stack';
// const Home = () => {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// };
// const Login = ({navigation}) => {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Login Screen</Text>
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//     </View>
//   );
// };

// // const Stack = createNativeStackNavigator();
// const Stack = createBottomTabNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// export default App;

// fetching data from API
// import React, {useEffect, useState} from 'react';
// import {View, Text, Button, FlatList, ScrollView} from 'react-native';

// const App = () => {
//   const [data, setData] = useState([]);
//   const getApiData = async () => {
//     const url = 'http://10.0.2.2:3000/users';
//     let res = await fetch(url);
//     res = await res.json();
//     setData(res);
//   };
//   useEffect(() => {
//     getApiData();
//   }, []);
//   return (
//     <View>
//       <Text style={{fontSize: 30}}>Data Here</Text>
//       <ScrollView>
//         {data.length
//           ? data.map(user => (
//               <View key={user.id} style={{borderWidth: 1, borderColor: 'red'}}>
//                 <Text>Username: {user.username}</Text>
//                 <Text>Password: {user.password}</Text>
//               </View>
//             ))
//           : null}
//       </ScrollView>
//     </View>
//   );
// };

//Posting data to API
// import React from 'react';
// import {Button, Text, View} from 'react-native';

// const App = () => {
//   const saveData = async () => {
//     // console.warn('Data saved successfully');
//     const url = 'http://10.0.2.2:3000/Post';
//     const data = {
//       name: 'Shekhar',
//       age: 25,
//       address: 'India',
//     };
//     try {
//       let res = await fetch(url, {
//         headers: {'Content-type': 'application/json'},
//         method: 'POST',
//         body: JSON.stringify(data),
//       });
//       res = await res.json();
//       console.warn(res);
//     } catch {
//       console.warn('Error in saving data');
//     }
//   };
//   return (
//     <View>
//       <Text>Hello World!</Text>
//       <Button title="submit data" onPress={saveData} />
//     </View>
//   );
// };

// //  A new project about list of data and doing operations like delete update through API by using json-server
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
const App = () => {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [data, setData] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [detail, setDetail] = React.useState({
    id: '',
    name: '',
    age: '',
    address: '',
  });
  const updateData = async () => {
    const url = 'http://10.0.2.2:3000/Post';
    try {
      let res = await fetch(url + '/' + detail.id, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          name: detail.name,
          age: detail.age,
          address: detail.address,
        }),
      });
      res = res.json();
      CurrentData();
    } catch (error) {
      console.warn('Error in updating data');
    }
  };
  const CurrentData = async () => {
    const url = 'http://10.0.2.2:3000/Post';
    let res = await fetch(url);
    res = await res.json();
    setData(res);
  };
  useEffect(() => {
    CurrentData();
  }, []);

  const deleteData = async $id => {
    const url = 'http://10.0.2.2:3000/Post';
    let res = await fetch(url + '/' + $id, {
      method: 'DELETE',
    });
    res = await res.json();
    CurrentData();
  };
  const submitData = async () => {
    const url = 'http://10.0.2.2:3000/Post';
    try {
      let res = await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({name, age, address}),
      });
    } catch (error) {
      console.warn('Error in saving data');
    }
    CurrentData();
  };
  const handleSubmit = () => {
    if (!name) {
      Alert.alert('Please fill Name field');
      return;
    }
    if (!age) {
      Alert.alert('Please fill Age field');
      return;
    }
    if (!address) {
      Alert.alert('Please fill Address field');
      return;
    }
    if (!name || !age || !address) {
      Alert.alert('Please fill all fields');
    }
    submitData();
  };
  const handleDetailsChange = (key, value) => {
    setDetail(prev => ({...prev, [key]: value}));
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.inputField}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <TextInput
          style={styles.inputField}
          value={age}
          onChangeText={setAge}
          placeholder="Enter your Age"
        />
        <TextInput
          style={styles.inputField}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your Address"
        />
        <Button title="Submit" color="#2fae62" onPress={handleSubmit} />
      </View>
      <ScrollView style={styles.dataBox}>
        {data.map(item => (
          <View key={item.id} style={styles.rowData}>
            <Text style={styles.rowDataText}>Name: {item.name}</Text>
            <Text style={styles.rowDataText}>Age: {item.age}</Text>
            <Text style={styles.rowDataText}>Address: {item.address}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Button title="delete" onPress={() => deleteData(item.id)} />
              <Button
                title="Update"
                onPress={() => {
                  setModalVisible(true);
                  setDetail({
                    id: item.id,
                    name: item.name,
                    age: item.age.toString(),
                    address: item.address,
                  });
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={{margin: 0, padding: 0, width: 0, height: 0}}
              value={detail.id}
              onChange={text => handleDetailsChange('id', text)}
            />
            <TextInput
              style={styles.inputField}
              value={detail.name}
              onChangeText={text => handleDetailsChange('name', text)}
              placeholder="Enter your name"
            />
            <TextInput
              style={styles.inputField}
              value={detail.age}
              onChangeText={text => handleDetailsChange('age', text)}
              placeholder="Enter your Age"
            />
            <TextInput
              style={styles.inputField}
              value={detail.address}
              onChangeText={text => handleDetailsChange('address', text)}
              placeholder="Enter your Address"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button title="Update" onPress={() => updateData()} />
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: '10%',
    alignItems: 'center',
  },
  inputBox: {
    alignItems: 'center',
    paddingTop: 40,
    height: 300,
    width: '90%',
    backgroundColor: 'lightgray',
    borderRadius: 40,
  },
  inputField: {
    borderWidth: 1,
    width: '80%',
    height: 50,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: 'white',
    color: 'white',
    padding: 10,
    borderRadius: 40,
    marginTop: 20,
  },
  dataBox: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    backgroundColor: 'lightgray',
    borderRadius: 40,
    padding: 20,
  },
  rowData: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 30,
    padding: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  rowDataText: {
    fontSize: 20,

    // fontWeight: 'bold',
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  modalView: {
    backgroundColor: 'white',
    paddingHorizontal: 90,
    paddingVertical: 30,
  },
});
export default App;
