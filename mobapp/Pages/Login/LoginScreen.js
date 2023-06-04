import React, { useState } from 'react';
import { Button, TextInput, View, Text, Alert, Image, TouchableOpacity, ImageBackground } from 'react-native';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!username) {
      formIsValid = false;
      errors['username'] = '*Please enter your username.';
    }

    if (!password) {
      formIsValid = false;
      errors['password'] = '*Please enter your password.';
    }

    if (
      password &&
      !password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
    ) {
      formIsValid = false;
      errors['password'] =
        '*Password must contain 8 characters, 1 numeric character, 1 alphabet character.';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit =async () => {

    if (validateForm()) {
     
      try {
        const response = await fetch('http://192.168.229.112:8000/auth/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:'1@1.com',
            username:username,
            password:password,
          }),
        }); // Replace with your API endpoint
      
        const json = await response.json();
        //setData(json);
        if(json.status){
          console.log(json)
        navigation.navigate('HomePage',{userinfo:json})
        }else{
          alert('Wrong username or password')
        }
      
      } catch (error) {
        console.log('Error fetching data:', error);
      }


    }
  };

  return (
    <ImageBackground resizeMode='cover' style={{flex:1,justifyContent:'center'}} source={require('../../assets/log.jpg')}>

<Text style={{color:'white',margin:10,fontSize:22,alignSelf:'center'}}>WELCOME! </Text>
  
<View style={{width:'95%',borderRadius:10,alignSelf:'center',height:'35%',marginTop:'30%'}}>
     
<View style={{width:'90%',height:50,backgroundColor:'white',alignSelf:'center',borderRadius:5,marginTop:'5%'}}>
<TextInput
      style={{color:'black'}}
      placeholderTextColor={'black'}
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
      />
</View>
<Text style={{ color: 'red' }}>{errors.username}</Text>
<View style={{width:'90%',height:50,backgroundColor:'white',alignSelf:'center',borderRadius:5}}>
<TextInput
      style={{color:'black'}}
        placeholder='Password'
        placeholderTextColor={'black'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
</View>
    
      <Text style={{ color: 'red' }}>{errors.password}</Text>


      <TouchableOpacity onPress={handleSubmit} style={{width:'45%',height:40,backgroundColor:'#831db4',justifyContent:'center',borderRadius:20,alignSelf:'center',marginTop:'10%'}}>
        <Text style={{color:'white',alignSelf:'center'}}>Log in</Text>
      </TouchableOpacity>
</View>
     
      </ImageBackground>
  );
};

export default LoginScreen;
