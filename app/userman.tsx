import React, { useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // for two cards per row with spacing

// Sample user data
const users = [
  { id: '1', name: 'Sapna Kumar', imageUri: 'https://wallpapers.com/images/high/baddie-profile-pictures-900-x-900-0r5i8o2d09miserg.webp' },
  { id: '2', name: 'Megha Malya', imageUri: 'https://wallpapers.com/images/high/baddie-profile-pictures-900-x-900-0r5i8o2d09miserg.webp' },
];

export default function UserManagementScreen() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://curiousflip.com/suitecrm/customapi/userlist.php");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.status == "success") {
          console.log(data);
          setUsers(data.data);
        }else{
          throw new Error(data.message);
        }        
      } catch (err) {
        setError(err.message);
        Alert.alert('Error', `Failed to fetch locations: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const renderItem = ({ item }: { item: { id: string; name: string; imageUri: string } }) => (
    <View style={styles.userCard}>
      <Image source={{ uri: item.imageUri }} style={styles.userImage} />
    {/*<img src="https://curiousflip.com/suitecrm/index.php?entryPoint=download&id=seed_jim_id_photo&type=Users"/>*/}
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Link href="/">
          <Icon name="arrow-back" size={24} color="#000" />
          </Link>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Management</Text>
        <View style={{ width: 24 }} /> {/* Empty view for spacing */}
      </View>
      <Link href="adduser" asChild>
      <TouchableOpacity style={styles.addUserButton}>
        <Text style={styles.addUserText}>Add User</Text>
      </TouchableOpacity>
      </Link>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
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
  addUserButton: {
    margin: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#FF6347',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  addUserText: {
    fontSize: 16,
    color: '#FF6347',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  userCard: {
    width: CARD_WIDTH,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1E5895',
    padding: 8,
    margin: 8,
  },
  userImage: {
    width: CARD_WIDTH - 32,
    height: CARD_WIDTH - 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
