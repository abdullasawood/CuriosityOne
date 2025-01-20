import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const AddProcessScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Location');

  const locationItems = ['Location 1 (L1)', 'Location 2 (L2)', 'Location 3 (L3)', 'Location 4 (L4)', 'Location 5 (L5)'];
  const taskItems = ['Envelopes', 'Boxes', 'Cards', 'Invites', 'Labels'];

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Process</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Location' && styles.selectedTab]}
          onPress={() => handleTabPress('Location')}
        >
          <Text style={[styles.tabText, selectedTab === 'Location' && styles.selectedTabText]}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Task' && styles.selectedTab]}
          onPress={() => handleTabPress('Task')}
        >
          <Text style={[styles.tabText, selectedTab === 'Task' && styles.selectedTabText]}>Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Agent' && styles.selectedTab]}
          onPress={() => handleTabPress('Agent')}
        >
          <Text style={[styles.tabText, selectedTab === 'Agent' && styles.selectedTabText]}>Agent</Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic List based on Selected Tab */}
      <ScrollView contentContainerStyle={styles.itemList}>
        {(selectedTab === 'Location' ? locationItems : taskItems).map((item, index) => (
          <TouchableOpacity key={index} style={styles.itemButton}>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next  ➔</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#F08E69',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedTab: {
    backgroundColor: '#F08E69',
  },
  tabText: {
    color: '#F08E69',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#ffffff',
  },
  itemList: {
    paddingBottom: 20,
  },
  itemButton: {
    backgroundColor: 'rgba(240, 142, 105, 0.1)',
    borderColor: 'rgba(240, 142, 105, 0.8)',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#F08E69',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProcessScreen;
