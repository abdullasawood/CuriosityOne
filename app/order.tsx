import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import axiosInstance from "./api/axiosInstance.js";

interface Order {
  id: string;
  title: string;
  customer: string;
  status: string;
  assignedTo: string;
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedTab, setSelectedTab] = useState('Ongoing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("sawood")
        const response = await axiosInstance.get('/customapi/getorder.php');
        if(response.status == 200){
          const result = await response.data;
          console.log(result)
          setOrders(result.data);
          setFilteredOrders(result.data);
          // setFilteredOrders(result.data.filter((order: Order) => order.status === selectedTab));
        } else {
          Alert.alert('Error', 'Failed to fetch orders');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // setFilteredOrders(orders.filter((order) => order.status === selectedTab));
  }, [selectedTab, orders]);

  const renderOrderCard = ({ item }: { item: Order }) => {
    // Split comma-separated task names and statuses into arrays
    const taskNames = item.taskname ? item.taskname.split(',') : [];
  const taskStatuses = item.taskstatus ? item.taskstatus.split(',') : [];

    return (
      <View style={styles.orderCard}>
        <View style={styles.cardHeader}>
          <View style={styles.statusBadge}>
            <Text style={styles.badgeText}>{item.status}</Text>
          </View>
          <MaterialIcons name="more-vert" size={20} color="#FFF" />
        </View>
        <Text style={styles.orderTitle}>{item.title}</Text>
        <Text style={styles.customerText}>Customer: {item.customer}</Text>
        <Text style={styles.statusText}>Assigned To: {item.assignedTo}</Text>

        {/* Dynamic Progress Steps */}
        {taskNames.map((taskName, index) => (
          <View key={index} style={styles.progressBarContainer}>
            {/* Progress Step */}
            <View
              style={[
                styles.progressStep,
                taskStatuses[index]?.trim() === 'Completed'
                  ? styles.activeStep
                  : styles.inactiveStep,
              ]}
            />
            {/* Task Name */}
            <Text style={styles.progressLabel}>{taskName.trim()}</Text>
            {/* Task Status */}
            <Text style={styles.progressLabel}>{taskStatuses[index]?.trim()}</Text>
          </View>
        ))}
      </View>
    );
  };


  const tabs = ['In Review', 'Underway', 'Draft'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Link href="..">
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={selectedTab === tab ? styles.tabTextActive : styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Order Button */}
      <Link href="addorder">
        <TouchableOpacity style={styles.addOrderButton}>
          <Text style={styles.addOrderText}>Add Order</Text>
        </TouchableOpacity>
      </Link>

      {/* Order List */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF6D28" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.orderList}
          ListEmptyComponent={<Text style={styles.emptyText}>No orders found.</Text>}
        />
      )}
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
  statusBadge: { backgroundColor: '#FFF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  badgeText: { color: '#FF6D28', fontWeight: 'bold' },
  orderTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginTop: 8 },
  customerText: { color: '#FFF' },
  statusText: { color: '#FFF', marginVertical: 4 },
  loader: { marginTop: 20 },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#555' },
  progressBarContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 5 },
  progressStep: { width: 15, height: 15, borderRadius: 7.5, marginHorizontal: 4 },
  activeStep: { backgroundColor: '#0056A4' },
  inactiveStep: { backgroundColor: '#FFF', opacity: 0.3 },
  progressLabel: { color: '#FFF', textAlign: 'center', marginTop: 5 },
});
