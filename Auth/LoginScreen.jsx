import { View, Text, TextInput, Button } from 'react-native'
import React, {useState, useContext} from 'react'
import { styles } from '../style/styles';
import { AuthContext } from '../context/AuthProvider';
import RegisterScreen from './RegisterScreen';

const LoginScreen = ({navigation}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <TextInput
        onChangeText={setEmail}
				value={email}
				placeholder='Email'
				placeholderTextColor='gray'
				textContentType='emailAddress'
				keyboardType='email-address'
				autoCapitalize='none'
      />
			<TextInput 
				onChangeText={setPassword}
				value={password}
				placeholder='Password'
				placeholderTextColor='gray'
				textContentType='password'
				secureTextEntry={true}
			/>
			<Button title='Login' onPress={() => login(email, password)} />
			<Button title='Registrati' onPress={() => navigation.navigate('register')} />
    </View>
  )
}

export default LoginScreen