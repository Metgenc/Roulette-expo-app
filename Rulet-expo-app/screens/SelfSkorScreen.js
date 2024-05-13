import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';



const ScoreListScreen = () => {

  const[data,setData]=useState();

  useEffect(() => { // API isteği tek defalık olmak üzere
    if (!data) {
      fetchData();
    }
  }, [data]);

  const fetchData = async () => { // API fonksiyonu
    try {
        const response = await axios.get(`http://10.0.2.2:8000/api/getSkor`,
          {
            params: {
              email: "mtngenc52@gmail.com",
            },
          }
        );
        console.log(response.data);
        setData(response.data.message);
      } catch (error) {
        console.log('API isteği başarısız:', error);
      }
  };

  const refresh =  () => { // API fonksiyonu
    setData();
  };


  const renderItem = ({ item }) => (
    <View style={styles.row} key={item.id}>
      <Text style={styles.cell}>{item.email.split('@')[0]}</Text>
      <Text style={styles.cell}>{item.skor}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={[styles.row, styles.header]}>
            <Text style={styles.cell} onPress={refresh}>K.adı</Text>
            <Text style={styles.cell} onPress={refresh}>Skor</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:"80%",
    marginTop:40,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width:"80%",


  },
  header: {
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    width:"80%",

  },
});

export default ScoreListScreen;
