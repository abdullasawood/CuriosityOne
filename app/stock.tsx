import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

const stockData = [
    {
        category: 'Paper',
        items: [
          { id: '1', name: 'Bond Paper', quantity: 200, size: 'A4', lastUpdated: '20/9/2024', color: '#FF7F50' },
          { id: '2', name: 'Card Stock', quantity: 250, size: 'A3', lastUpdated: '20/9/2024', color: '#1E3A8A' },
          { id: '3', name: 'Maplitho', quantity: 250, size: 'Dimie', lastUpdated: '20/9/2024', color: '#FF7F50' },
        ],
      },
      {
        category: 'Envelopes',
        items: [
          { id: '3', name: 'Square', quantity: 200, size: 'A2', lastUpdated: '20/9/2024', color: '#1E3A8A' },
          { id: '4', name: 'A-Style', quantity: 250, size: 'A4', lastUpdated: '20/9/2024', color: '#FF7F50' },
          { id: '4', name: '7-5', quantity: 4000, size: '7x5', lastUpdated: '22/9/2024', color: '#1E3A8A' },
        ],
      },
      {
        category: 'Boxes',
        items: [
          { id: '5', name: 'Folding', quantity: 200, size: 'A2', lastUpdated: '20/9/2024', color: '#FF7F50' },
          { id: '6', name: 'Tuck Box', quantity: 250, size: 'A3', lastUpdated: '20/9/2024', color: '#1E3A8A' },
          { id: '5', name: 'Pizza Box', quantity: 500, size: '12x12', lastUpdated: '22/9/2024', color: '#FF7F50' },
        ],
      },
];

export default function StockScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderCard = ({ item }: { item: any }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardText}>Quantity: {item.quantity}</Text>
      <Text style={styles.cardText}>Size: {item.size}</Text>
      <Text style={styles.cardText}>Last updated: {item.lastUpdated}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stocks</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Icon name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {stockData.map((section) => (
          <View key={section.category}>
            <Text style={styles.categoryTitle}>{section.category}</Text>
            <FlatList
              data={section.items}
              renderItem={renderCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardList}
            />
          </View>
        ))}
      </ScrollView>

      {/* Modal for Adding Stock */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Stock</Text>
            <Text style={styles.label}>Item Name</Text>
            <TextInput style={styles.input} placeholder="Enter item name" />

            <Text style={styles.label}>Size</Text>
            <TextInput style={styles.input} placeholder="Enter size" />

            <Text style={styles.label}>Add Quantity</Text>
            <TextInput style={styles.input} placeholder="Enter quantity" keyboardType="numeric" />

            <Text style={styles.label}>Available Quantity</Text>
            <TextInput style={styles.input} placeholder="Enter available quantity" keyboardType="numeric" />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.textArea} placeholder="Enter description" multiline />

            <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.addButtonText}>Add Stock</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#DDE6EA',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 14,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#1E3A8A',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  textArea: {
    width: '100%',
    height: 80,
    borderColor: '#1E3A8A',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#FF7F50',
    width: '100%',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
