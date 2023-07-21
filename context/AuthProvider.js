import React, {createContext, useState} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    return (
      <AuthContext.Provider value={{
			user,
			setUser,
			error,
			loading,
			login: (email, password) => {
				setLoading(true);
				axios
				.post('https://3c9e-2-228-67-2.ngrok-free.app/api/login', {
					email,
					password,
					device_name: 'mobile'
				})
				.then(response => {
					console.log(response)
					const {id, token, name, username, email} = response.data.user;
					const userResponse = {
						token: token,
						id: id,
						name: name,
						username: username,
						email: email,
					}
					setUser(userResponse);
					setError(null);
					SecureStore.setItemAsync('user', JSON.stringify(userResponse));
					setLoading(false);
				})
				.catch(error => {
					console.log(error)
					setError(error.response.data.message);
					setLoading(false);
				})
			},
			logout: () => {
				setLoading(true);
				axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
				axios
				.post('/logout')
				.then(response => {
					setUser(null);
					SecureStore.deleteItemAsync('user');
					setError(null);
					setLoading(false);
				})
				.catch(error => {
					console.log(error)
					setError(error.response.data.message)
					setLoading(false)
				})
			},
        }}>
        	{children}
        </AuthContext.Provider>
    )
}