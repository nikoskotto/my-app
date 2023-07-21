import { View, Text, Button } from 'react-native'
import React, {useContext} from 'react'
import { styles } from '../style/styles';
import { AuthContext } from '../context/AuthProvider';

const Settings = () => {
	const {logout} = useContext(AuthContext);
		return (
			<View style={styles.container}>
				<Button title="Logout" onPress={logout} />
			</View>
		)
}

export default Settings