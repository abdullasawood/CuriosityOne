import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // for two cards per row with spacing

// Define the type for each item in the data array
type CategoryItem = {
  id: string;
  title: string;
  processCount: number;
  lastUpdated: string;
  isAddCategory?: boolean;
};

// Sample data array
const data: CategoryItem[] = [
  { id: '0', title: 'Add Category', processCount: 0, lastUpdated: '', isAddCategory: true },
  { id: '1', title: 'Envelope', processCount: 5, lastUpdated: '8/7/24' },
  { id: '2', title: 'Boxes', processCount: 8, lastUpdated: '8/7/24' },
  { id: '3', title: 'Invites', processCount: 5, lastUpdated: '8/7/24' },
  { id: '4', title: 'Cards', processCount: 6, lastUpdated: '8/7/24' },
  { id: '5', title: 'Labels', processCount: 5, lastUpdated: '8/7/24' },
];

export default function ProcessManagementScreen() {
  const renderItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={[
        styles.card,
        item.isAddCategory ? styles.addCategoryCard : styles.categoryCard,
      ]}
    >
      {item.isAddCategory ? (
        <Text style={styles.addCategoryText}>{item.title}</Text>
      ) : (
        <>
          <View style={styles.cardHeader}>
            <TouchableOpacity>
              <Icon name="pencil" size={18} color="#FF6347" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="trash" size={18} color="#FF6347" />
            </TouchableOpacity>            
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.processCount}>{item.processCount} process{item.processCount > 1 ? 'es' : ''}</Text>
          <Text style={styles.lastUpdated}>Last updated: {item.lastUpdated}</Text>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Process Management</Text>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Icon name="person-outline" size={24} color="#FF6347" />
        <Icon name="cart-outline" size={24} color="#FF6347" />
        <Icon name="home-outline" size={24} color="#FF6347" />
        <Icon name="notifications-outline" size={24} color="#FF6347" />
        <Icon name="document-outline" size={24} color="#FF6347" />
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
    width: CARD_WIDTH,
    padding: 16,
    borderRadius: 8,
    margin: 8,
    minHeight: 160,
  },
  addCategoryCard: {
    backgroundColor: '#ED7F4C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCard: {
    backgroundColor: '#1e5795',
  },
  addCategoryText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
  },
  processCount: {
    fontSize: 14,
    color: '#fff',
    marginTop: 0,
    textAlign: 'center'
  },
  lastUpdated: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    textAlign: 'center'
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
