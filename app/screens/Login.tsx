import { View, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../context/UserContext';



const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const { setUser } = useUserContext();


  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser({email: user.email!, name: user.displayName || 'User'})
        navigation.navigate('Minhas Tarefas')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erro na autenticação:", errorCode, errorMessage);
      });
  } 
  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Email' onChangeText={(text: string) => setEmail(text)} value={email} />
        <TextInput style={styles.input} textContentType='password' placeholder='Password' onChangeText={(text: string) => setPassword(text)} value={password} />
        <View style={styles.button}>
         <Button onPress={() => navigation.navigate('Register')} title='Criar Conta' />  
        </View>
        <View style={styles.button}>
          <Button onPress={() => signIn(email, password)} title='Login' />  
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flexDirection: 'column',
      paddingVertical: 20,
    },
    input: {
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: '#fff',
    },
    button: {
      flexDirection: 'column',
      paddingVertical: 5,
    },
});