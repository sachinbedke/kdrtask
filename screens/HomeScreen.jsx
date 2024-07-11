// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/items')
            // here you insert your ip number 
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);


    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { itemId: item.id })}>
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.image_url }} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                            <Text style={styles.discountPrice}>{item.discount_price}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: 'green',
    },
    discountPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
});

export default HomeScreen;
