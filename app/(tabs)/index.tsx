import {React, useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRootNavigationState, Redirect, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {

  const [posts, setPosts] = useState([{title:"location", subtitle:"0"}]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
  const checkSession = async () => {
    // const homePage = await JSON.parse(localStorage.getItem('homePage'));
    const homePage = await AsyncStorage.getItem('homePage');
    console.log("from homepage: "+homePage);
    if (!homePage) {
      console.log("inside if")
      setShouldRedirect(true);
      //       setPosts(data);
      // const rootNavigationState = useRootNavigationState();
      // if (!rootNavigationState?.key) return null;
      // return <Redirect href={'./login'} />  
    }
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // const urlencoded = new URLSearchParams();
    // urlencoded.append("uname", "admin");
    // urlencoded.append("pwd", "admin12345");

    fetch("https://curiousflip.com/suitecrm/customapi/homePage.php")
     .then((res) => res.json())
     .then((data) => {
        setPosts(data);
     })
     .catch((err) => {
        console.log(err.message);
     });
  };
  checkSession();
  }, []); 
  
  // const [cards = [
  //   { title: 'Orders', subtitle: 'Active Order: 5' },
  //   { title: 'Location', subtitle: 'Category: 5' },
  //   { title: 'Process Assignment', subtitle: 'Process: 15' }, // today's project tasks that are unassigned
  //   { title: 'Process Management', subtitle: 'Active order: 7' }, // project templates
  //   { title: 'User Management', subtitle: 'Users: 15' }, //users
  //   { title: 'Reports', subtitle: "Generate Today's Report" }, // 
  //   { title: 'Stock Management', subtitle: 'Stock Request: 16' } //new module  
  // ], setcards] = useState([]);

  if (shouldRedirect) {
    return <Redirect href={'./login'} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi {posts.name} 👋</Text>
          <Text style={styles.welcome}>Welcome Back</Text>
        </View>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://wallpapers.com/images/hd/mia-khalifa-wearing-a-suit-7eqmr734xd960yam.jpg' }} // Replace with profile image URL
        />
      </View>

      {/* Grid Section */}
      {/*<View style={styles.grid}>
        {posts.map((item, index) => (
          <Link key={index} href={`/${item.nav}`} asChild>
            <TouchableOpacity style={styles.card}>
              <View style={styles.plusIconContainer}>
                <Icon name="add-outline" size={20} color="#FF6347" />
              </View>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>*/}

      <View style={styles.grid}>
        {posts.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* Click on the + icon to navigate to a different page */}
            <Link href={`/${item.plusNav}`} asChild>
              <TouchableOpacity style={styles.plusIconContainer}>
                <Icon name="add-outline" size={20} color="#FF6347" />
              </TouchableOpacity>
            </Link>

            {/* Click on the rest of the card to navigate to the item's page */}
            <Link href={`/${item.nav}`} asChild>
              <TouchableOpacity style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ))}
      </View>
      
      {/*<View style={styles.grid}>
        {posts.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Link href={'/'+item.nav}>
            <TouchableOpacity style={styles.plusIconContainer}>
              <Icon name="add-outline" size={20} color="#FF6347" />
            </TouchableOpacity>
            </Link>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>*/}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 18,
    color: 'gray',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    
  },
  card: {
    backgroundColor: '#E0E8ED',
    width: '45%',
    height: 150,
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center'
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
  plusIconContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: '50%',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default Dashboard;
