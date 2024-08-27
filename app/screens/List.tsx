import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { useUserContext } from '../context/UserContext'; // Importação do contexto
import { Todo } from '../context/Types';


const List = ({ navigation }: any) => {
  const { user } = useUserContext(); // Acessa o usuário do contexto
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    if (user) {
      const todoRef = collection(FIRESTORE_DB, 'todos');
      const q = query(todoRef, where('userEmail', '==', user.email)); // Filtra tarefas pelo usuário

      const subscriber = onSnapshot(q, {
        next: (snapshot) => {
          console.log('update');
          const todos: Todo[] = [];
          snapshot.docs.forEach((doc) => {
            todos.push({
              id: doc.id,
              ...doc.data(),
            } as Todo);
          });
          setTodos(todos);
        },
      });

      return () => subscriber();
    }
  }, [user]);

  const addTodo = async () => {
    if (user) {
      console.log('ADD');
      const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), {
        title: todo,
        done: false,
        userEmail: user.email, // Adiciona o e-mail do usuário à tarefa
      });
      setTodo('');
    } else {console.log('user nao encontrado', user)}
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };
    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && <Ionicons name="checkmark-circle" size={32} color="green" />}
          {!item.done && <Entypo name="circle" size={32} color="black" />}

          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons name="trash-bin-outline" size={24} color="red" onPress={deleteItem} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        <Button onPress={addTodo} title="Adicionar" disabled={todo === ''} />
      </View>
      {todos.length > 0 && (
        <View>
          <FlatList
            data={todos}
            renderItem={(item) => renderTodo(item)}
            keyExtractor={(todo: Todo) => todo.id}
          />
        </View>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 4,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 4,
  }
})