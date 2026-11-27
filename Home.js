import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Button, SectionList, TouchableOpacity, Image } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {useIsFocused} from '@react-navigation/native';
import {datasource} from './Data.js';

const Home = ({navigation}) => {

    const isFocused = useIsFocused();
    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity
                style={styles.productBox}
                onPress={() => {
                    navigation.navigate("Edit", {
                        index: index,
                        type: section.title,
                        key: item.key,
                        icon: item.icon,
                        use: item.use,
                        image: item.image
                    });
                }}
            >

                <View style={styles.productInfo}>
                    <FontAwesome6
                        name={item.icon}
                        size={25}
                        color="black"
                    />

                    <Text style={styles.productName}>
                        {item.key}
                    </Text>
                </View>

                <Image
                    source={{uri: item.image}}
                    style={styles.productImage}
                    resizeMode="contain"
                />

            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.buttonBox}>
                <Text style={styles.title}>
                    L10 Skincare Products
                </Text>

                {/* Exercise 1C */}
                <Button
                    title="ADD PRODUCT"
                    onPress={() => navigation.navigate("Add")}
                />
            </View>

            <SectionList
                sections={datasource}
                extraData={isFocused}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                renderSectionHeader={({section}) => (
                    <Text style={[
                        styles.headerText,
                        {backgroundColor: section.bgcolor}
                    ]}>
                        {section.title}
                    </Text>
                )}
            />

            <StatusBar style="auto"/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
        padding: 10,
        paddingTop: 35
    },

    buttonBox: {
        marginBottom: 15
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },

    productBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF5F5',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        padding: 10,
        marginBottom: 8
    },

    productInfo: {
        flex: 1,
        marginRight: 10,
        alignItems: 'flex-start'
    },

    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        flexShrink: 1
    },

    productImage: {
        width: 110,
        height: 150,
        borderRadius: 8
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        color: 'white',
        borderRadius: 5
    }
});

export default Home;