
import React, {useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { styles } from '../styles/styles';
  
const LoginScreen = ({ mudarTela, usuarioCadastrado, senhaCadastrada, setUsuarioLogado }) => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [logado, setLogado] = useState(false);

    const fazerLogin = () => {
      if (usuarioCadastrado || !senhaCadastrada) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado. Cadastre-se primeiro.');
        return;
      }

      if (usuario.trim() === '' || senha.trim() === '') {
        Alert.alert('Erro', 'Preencha todos os campos.');
        return;
      }
      if (usuario === usuarioCadastrado && senha === senhaCadastrada) {
        setLogado(true);
        setUsuarioLogado(usuario);
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
      }
    };
    
    useEffect(() => {
      if(logado) {
        mudarTela('home');
      }
    }, [logado]);

    return (
      <>
          <Text style={styles.titulo}>Login</Text>    
    
          <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={usuario}
          onChangeText={setUsuario}
          />
          <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          />
          <Button title="Entrar" onPress={fazerLogin} />
          <View style={styles.espaco} />
          <Button title="Cadastrar-se" onPress={() => mudarTela('cadastro')} />
      </>
    );
};

export default LoginScreen;