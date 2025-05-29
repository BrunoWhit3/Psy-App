import React, { useState } from 'react';
import { View, Text, TextInput, Botton, Alert } from 'react-native';
import { styles } from '../styles/styles';

const CadastroScreen = ({ mudarTela, setUsuarioCadastrado, setSenhaCadastrada}) => {
  const [novoUsuario, setNovoUsuario] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const fazerCadastro = () => {
    if (novoUsuario.trim() === '' || novaSenha.trim() === ''){
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
  
    setUsuarioCadastrado(novoUsuario);
    setSenhaCadastrada(novaSenha);
    Alert.alert('Sucesso','Cadastro realizado! Faça o LoginScreen.');
    mudarTela('login');
  };

  return (
    <>
      <Text style={styles.titulo}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Novo Usuário"
        value={novoUsuario}
        onChangeText={setNovoUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />
      <Button title="Cadastrar" onPress={fazerCadastro} />
      <View style={styles.espaco} />
      <Button title="Voltar ao Login" onPress={() => mudarTela('login')} />
     </>   
  );

};
export default CadastroScreen;