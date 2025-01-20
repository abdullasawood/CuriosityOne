import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface Order {
  id: string;
  title: string;
  customer: string;
  status: string;
  assignedTo: string;
}

const orders: Order[] = [
  {
    id: '1',
    title: '100 Wedding Invitation cards',
    customer: 'Mr Shukla',
    status: 'Printing',
    assignedTo: 'Megha Malya',
  },
  {
    id: '2',
    title: '100 Wedding Invitation cards',
    customer: 'Mr Shukla',
    status: 'Printing',
    assignedTo: 'Megha Malya',
  },
];

export default function OrdersScreen() {
  const renderOrderCard = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View style={styles.ongoingBadge}>
          <Text style={styles.badgeText}>Ongoing</Text>
        </View>
        <MaterialIcons name="more-vert" size={20} color="#FFF" />
      </View>
      <Text style={styles.orderTitle}>{item.title}</Text>
      <Text style={styles.customerText}>{item.customer}</Text>
      <Text style={styles.statusText}>Current assigned status: {item.assignedTo}</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressStep, styles.activeStep]} />
        <View style={[styles.progressStep, styles.activeStep]} />
        <View style={[styles.progressStep, styles.inactiveStep]} />
        <View style={[styles.progressStep, styles.inactiveStep]} />
      </View>
      <Text style={styles.progressLabel}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.tabTextActive}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Waiting</Text>
        </TouchableOpacity>
      </View>

      {/* Add Order Button */}
      <Link href="addorder">
      <TouchableOpacity style={styles.addOrderButton}>
        <Text style={styles.addOrderText}>Add Order</Text>
      </TouchableOpacity>
      </Link>

      {/* Order List */}
      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-evenly', width: '90%', alignSelf: 'center' },
  tabButton: { paddingVertical: 10, paddingHorizontal: 25, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#FF6D28' },
  activeTab: { backgroundColor: '#FF6D28' },
  tabText: { color: '#333' },
  tabTextActive: { color: '#FFF' },
  addOrderButton: { alignSelf: 'center', backgroundColor: '#fff', borderColor: '#FF6D28', borderWidth: 1, padding: 10, borderRadius: 10, marginVertical: 10, width: '90%', alignItems: 'center' },
  addOrderText: { color: '#000' },
  orderList: { paddingHorizontal: 16 },
  orderCard: { backgroundColor: '#FF6D28', padding: 16, borderRadius: 10, marginBottom: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ongoingBadge: { backgroundColor: '#FFF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  badgeText: { color: '#FF6D28', fontWeight: 'bold' },
  orderTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginTop: 8 },
  customerText: { color: '#FFF' },
  statusText: { color: '#FFF', marginVertical: 4 },
  progressBarContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 5 },
  progressStep: { width: 15, height: 15, borderRadius: 7.5, marginHorizontal: 4 },
  activeStep: { backgroundColor: '#0056A4' },
  inactiveStep: { backgroundColor: '#FFF', opacity: 0.3 },
  progressLabel: { color: '#FFF', textAlign: 'center', marginTop: 5 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#DDD' },
});
