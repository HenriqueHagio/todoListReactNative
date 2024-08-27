import { View, Button, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export interface User{
  name: string;
  email: string;
  password: string
}


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');


  const addUser = async ({navigation}: any) => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    try{
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(FIRESTORE_DB, 'users'), {
        name: name, 
        email: email, 
        password: password
      })
      navigation.navigate('Minhas Tarefas')
      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');


    }catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert('Erro', errorMessage); 
    
    }

  }
  return (
    <View style={styles.container}>
        <View>
            <TextInput style={styles.input} placeholder='Nome' onChangeText={(text: string) => setName(text)} value={name} />
            <TextInput style={styles.input} placeholder='Email' onChangeText={(text: string) => setEmail(text)} value={email} />
            <TextInput style={styles.input} secureTextEntry={true} textContentType='password' placeholder='Senha' onChangeText={(text: string) => setPassword(text)} value={password} />
            <TextInput style={styles.input} secureTextEntry={true} textContentType='password' placeholder='Confirmar Senha' onChangeText={(text: string) => setconfirmPassword(text)} value={confirmPassword} />
        </View>
        <Button onPress={addUser} title='Criar Conta' />  
    </View>
  )
}
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
});
export default Register

