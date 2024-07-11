import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ItemDetailsScreen = ({ route, navigation }) => {
    const { itemId } = route.params;
    const [item, setItem] = useState(null);

    useEffect(() => {

        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/itemDetails/${itemId}`);
                // here you insert your ip number 
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItemDetails();
    }, [itemId]);

    if (!item) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.discountPrice}>{item.discount_price}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.benefits}>Benefits: {item.benefits}</Text>
            <Button title="Add to Cart" onPress={() => navigation.navigate('Cart', { item })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    price: {
        fontSize: 20,
        color: 'green',
    },
    discountPrice: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    quantity: {
        fontSize: 16,
        marginVertical: 10,
    },
    benefits: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default ItemDetailsScreen;
