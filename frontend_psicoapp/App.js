import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const API_BASE_URL = 'http://192.168.1.88:5000/api/diario';
const TEST_PACIENTE_ID = '68360dbfcd369c216b59cfc6';

export default function App() {
  const [humorGeral, setHumorGeral] = useState(''); 
  const [descricao, setDescricao] = useState('');   
  const [registros, setRegistros] = useState([]);  
  const humorEmojis = {
    'Muito Feliz': '😄',
    'Feliz': '😊',
    'Neutro': '😐',
    'Triste': '😞',
    'Ansioso': '😟',
    'Irritado': '😡',
  };

  useEffect(() => {
    carregarRegistros();
  }, []);

  const carregarRegistros = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${TEST_PACIENTE_ID}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      console.error('Erro ao carregar registros do diário: ', error);
      Alert.alert('Erro', 'Não foi possível carregar os registros do diário.');
    }
  };

  const salvarRegistro = async () => {
    if (!humorGeral || !descricao.trim()) {
      Alert.alert('Atenção', 'Por favor, selecione um humor e digite sua descrição.');
      return;
    }

    const novoRegistro = {
      pacienteId: TEST_PACIENTE_ID,
      humorGeral: humorGeral,
      descricao: descricao,
      emocoesEspecificas: [],
      gatilhos: [],
      atividades: [],
    };

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoRegistro),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      Alert.alert('Sucesso', 'Registro do diário salvo!');
      setHumorGeral('');
      setDescricao('');
      carregarRegistros();
    } catch (error) {
      console.error('Erro ao salvar registro do diário: ', error);
      Alert.alert('Erro', `Não foi possível salvar o registro: ${error.message}`);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.registroCard}>
      <Text style={styles.registroDate}>
        {new Date(item.dataRegistro).toLocaleDateString('pt-BR')} às{' '}
        {new Date(item.dataRegistro).toLocaleTimeString('pt-BR')}
      </Text>
      <Text style={styles.registroHumor}>
        Humor: {humorEmojis[item.humorGeral] || item.humorGeral}
      </Text>
      <Text style={styles.registroDescricao}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diário Emocional</Text>

      <Text style={styles.subtitle}>Como você se sente?</Text>
      <View style={styles.moodSelector}>
        {Object.keys(humorEmojis).map((humor) => (
          <TouchableOpacity
            key={humor}
            style={[
              styles.moodButton,
              humorGeral === humor && styles.selectedMoodButton,
            ]}
            onPress={() => setHumorGeral(humor)}
          >
            <Text style={styles.moodEmoji}>{humorEmojis[humor]}</Text>
            <Text style={styles.moodText}>{humor}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder='Descreva seus sentimentos e o que aconteceu...'
        value={descricao}
        onChangeText={setDescricao}
        multiline
        style={styles.input}
      />
      <Button title='Salvar no Diário' onPress={salvarRegistro} />

      <Text style={styles.historyTitle}>Seu Histórico de Registros:</Text>
      <FlatList
        data={registros}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  moodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  moodButton: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    width: 90,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  selectedMoodButton: {
    backgroundColor: '#ADD8E6',
    borderColor: '#4682B4',
    borderWidth: 2,
  },
  moodEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  moodText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  registroCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#6a0dad', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  registroDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  registroHumor: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  registroDescricao: {
    fontSize: 16,
    color: '#555',
  },
});