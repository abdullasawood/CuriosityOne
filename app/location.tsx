import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axiosInstance from "./api/axiosInstance.js";
import { Link } from 'expo-router';

const LocationScreen = () => {
  const [locations, setLocations] = useState([]); // For the full list of locations
  const [filteredLocations, setFilteredLocations] = useState([]); // For filtered locations by L1, L2, etc.
  const [filters, setFilters] = useState([]); // For the filter options like L1, L2
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isModalVisible, setModalVisible] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch all locations
    const fetchLocations = async () => {
      try {
        const response = await axiosInstance.get("/customapi/locationlist.php");
        if(response.status == 200){
          const result = await response.data;
          if (result.status === "success") {
            setFilters(result.filters);
            setLocations(result.data);
            setFilteredLocations(result.data); // Initially show all locations
            setLoading(false);
          } else {
            throw new Error(result.message);
          }
        }else{
          Alert.alert('Error', 'Something went wrong. Please check your network try again.');
        }
      } catch (err) {
        setError(err.message);
        Alert.alert('Error', `Failed to fetch locations: ${err.message}`);
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on selected filter (L1, L2, etc.)
  const filterLocations = (filter) => {
    setSelectedFilter(filter);
    if(filter == 'All'){
      setFilteredLocations(locations);
    }else{
      const filtered = locations.filter(location => location.category === filter); // Adjust based on your actual data structure
      setFilteredLocations(filtered);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNewLocation(""); // Clear the input field
  };

  const saveLocation = async () => {
    console.log("inside saveLocation")
    if (!newLocation.trim()) {
      Alert.alert("Validation Error", "Location name cannot be empty.");
      return;
    }
    setSaving(true);
    console.log("setsaving true")
    try {
      const response = await fetch("https://curiousflip.com/suitecrm/customapi/addlocationgroup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `name=${encodeURIComponent(newLocation)}`,
      });
      const result = await response.json();
      console.log("API Response:", result);
      if (result.status === "success") {
        Alert.alert("Success", "Location added successfully.");
        closeModal(); // Close modal on success
        // Optionally refresh the locations list
        setLocations((prev) => [...prev, { name: newLocation }]);
      } else {
        throw new Error(result.message || "Failed to add location");
      }
    } catch (error) {
      Alert.alert("Error", `Failed to add location: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Link href="/">
            <Icon name="arrow-back" size={24} color="black" />
          </Link>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location</Text>
        <Link href="addlocation" asChild>
        <TouchableOpacity>
          <Icon name="add-outline" size={24} color="black" />
        </TouchableOpacity>
        </Link>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.addButton}
         onPress={openModal}>
          <Icon name="add-outline" size={24} color="#F08E69" />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={
              selectedFilter === filter
                ? styles.filterButtonActive
                : styles.filterButton
            }
            onPress={() => filterLocations(filter)}
          >
            <Text style={
              selectedFilter === filter
                ? styles.filterButtonTextActive
                : styles.filterButtonText
            }>{filter}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Left Column (Locations) */}
        <View style={styles.locationContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#F08E69" />
          ) : error ? (
            <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredLocations.map((location, index) => (
                <View style={styles.locationRow} key={index}>
                  <Icon name="pencil" size={16} color="#F08E69" style={styles.locationIcon} />
                  <Text style={styles.locationText}>{location.name}</Text> {/* Accessing the `name` property */}
                </View>
              ))}
            </ScrollView>
          )}
        </View>


        {/* Right Column */}
        <View style={styles.rightColumn}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {['+', '+', 'L1', '+', 'L2', 'L1', '+', 'L2', 'L1', '+', 'L1', '+', 'L2'].map((label, index) => (
              <TouchableOpacity
                style={label === '+' ? styles.addButtonRight : styles.levelButton}
                key={index}
              >
                <Text style={label === '+' ? styles.addButtonText : styles.levelButtonText}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal} // Handle back button on Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Location</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter location name"
              value={newLocation}
              onChangeText={setNewLocation}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveLocation}
                disabled={saving}
              >
                <Text style={styles.modalButtonText}>{saving ? "Saving..." : "Save"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EDE7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#F3EDE7',
  },
  addButton: {
    backgroundColor: '#F3EDE7',
    borderWidth: 2,
    borderColor: '#F08E69',
    borderRadius: 8,
    padding: 8,
    fontWeight: 800,
    marginHorizontal: 4,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F08E69',
  },
  filterButtonActive: {
    backgroundColor: '#F08E69',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  filterButtonText: {
    color: 'black',
    fontSize: 20,
  },
  filterButtonTextActive: {
    color: 'white',
    fontSize: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  locationContainer: {
    flex: 3,
    paddingVertical: 10,
    backgroundColor: '#DAEBF3',
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 12,
    marginRight: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  locationIcon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    color: 'black',
    paddingVertical: 4.5,
  },
  rightColumn: {
    flex: 1,
    backgroundColor: '#DAEBF3',
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    marginLeft: 4,
  },
  addButtonRight: {
    backgroundColor: '#F3EDE7',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  levelButton: {
    backgroundColor: '#F08E69',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  addButtonText: {
    color: '#F08E69',
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#F08E69",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LocationScreen;
