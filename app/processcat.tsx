import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // If you're using Expo. Otherwise, install @react-native-vector-icons/Ionicons

const BlueBoxScreen = ({ navigation }: { navigation: any }) => { 

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Envelopes</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Envelope Options */}
      <View style={styles.buttonContainer}>
        {[
          'Square Envelopes',
          'Invitation Envelopes',
          'Custom-Printed Envelopes',
          'Square Flap Envelopes',
          'Padded or Bubble Envelopes',
          'A-Style Envelopes',
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.envelopeButton}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // Adjusts for centering the title
  },
  addButton: {
    // width: 40,
    // height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#000',
    fontSize: 29,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
  },
  envelopeButton: {
    backgroundColor: '#1E5795',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BlueBoxScreen;
