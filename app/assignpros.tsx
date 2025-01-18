import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Define the type for each item in the data array
type ProcessItem = {
  id: string;
  name: string;
  level: string;
  task: string;
};

// Sample data array with items of type ProcessItem
const data: ProcessItem[] = [
  { id: '1', name: 'Sapna Kumar', level: 'L1', task: 'Send the Design to a Printer' },
  { id: '2', name: 'Sapna Kumar', level: 'L1', task: 'Send the Design to a Printer' },
  { id: '3', name: 'Sapna Kumar', level: 'L1', task: 'Send the Design to a Printer' },
  { id: '4', name: 'Sapna Kumar', level: 'L1', task: 'Send the Design to a Printer' },
  { id: '5', name: 'Sapna Kumar', level: 'L1', task: 'Send the Design to a Printer' },
];

export default function ProcessAssignmentScreen() {
  // Define the type for renderItem using ListRenderItem<ProcessItem>
  const renderItem: ListRenderItem<ProcessItem> = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://wallpapers.com/images/hd/mia-khalifa-wearing-a-suit-7eqmr734xd960yam.jpg' }} // Replace with actual image URL
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.level}>{item.level}</Text>
        <Text style={styles.task}>{item.task}</Text>
      </View>
      <TouchableOpacity style={styles.editIconContainer}>
        <Icon name="pencil" size={18} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Process Assignment</Text>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Icon name="person-outline" size={24} color="#FF6347" />
        <Icon name="cart-outline" size={24} color="#FF6347" />
        <Icon name="home-outline" size={24} color="#FF6347" />
        <Icon name="list-outline" size={24} color="#FF6347" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E5795', // Dark blue background
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  level: {
    fontSize: 14,
    color: '#fff',
  },
  task: {
    fontSize: 12,
    color: '#fff',
  },
  editIconContainer: {
    padding: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
