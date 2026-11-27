import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {StatusBar} from 'expo-status-bar';
import {datasource} from './Data.js';

const Edit = ({navigation, route}) => {

    const [brand, setBrand] = useState(route.params.type);
    const [name, setName] = useState(route.params.key);
    const [icon, setIcon] = useState(route.params.icon);
    const [use, setUse] = useState(route.params.use);
    const [image, setImage] = useState(route.params.image);

    let indexnum = datasource.findIndex(
        (section) => section.title === route.params.type
    );

    return (
        <ScrollView style={styles.container}>
            <StatusBar/>

            <Text style={styles.title}>Edit Product</Text>
            <Image
                source={{uri: image}}
                style={styles.productImage}
                resizeMode="contain"
            />

            <Text style={styles.label}>Product Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Brand:</Text>
            <Picker
                selectedValue={brand}
                onValueChange={(value) => setBrand(value)}
            >
                {datasource.map((section) => (
                    <Picker.Item
                        key={section.title}
                        label={section.title}
                        value={section.title}
                    />
                ))}
            </Picker>

            <Text style={styles.label}>Product Type:</Text>

            <Picker
                selectedValue={icon}
                onValueChange={(value) => setIcon(value)}
            >
                <Picker.Item
                    label="Serum / Essence"
                    value="bottle-droplet"
                />

                <Picker.Item
                    label="Cream"
                    value="prescription-bottle"
                />

                <Picker.Item
                    label="Facial Mask"
                    value="face-smile"
                />
            </Picker>

            <Text style={styles.label}>Product Usage:</Text>

            <Picker
                selectedValue={use}
                onValueChange={(value) => setUse(value)}
            >
                <Picker.Item
                    label="Day"
                    value="Best for Day uses."
                />

                <Picker.Item
                    label="Night"
                    value="Best for Night uses."
                />

                <Picker.Item
                    label="Both Day and Night"
                    value="Best for Both Day and Night uses."
                />
            </Picker>

            <Text style={styles.label}>Image URL:</Text>
            <TextInput
                style={styles.input}
                value={image}
                onChangeText={(text) => setImage(text)}
                autoCapitalize="none"
            />

            <View style={{flexDirection: 'row'}}>

                <View style={{margin: 5, flex: 1}}>
                    <Button
                        title="Save"
                        onPress={() => {

                            if (name.trim() === "" || brand === "" || image.trim() === "") {
                                Alert.alert("Error", "Please enter all fields.");
                                return;
                            }

                            let newIndexnum = datasource.findIndex(
                                (section) => section.title === brand
                            );

                            if (indexnum === -1 || newIndexnum === -1) {
                                Alert.alert("Error", "Brand not found.");
                                return;
                            }

                            let item = {
                                key: name.trim(),
                                icon: icon,
                                use: use,
                                image: image.trim()
                            };

                            if (indexnum === newIndexnum) {
                                datasource[indexnum].data[route.params.index] = item;

                            }
                            else {
                                datasource[indexnum].data.splice(
                                    route.params.index, 1
                                );
                                datasource[newIndexnum].data.push(item);
                            }
                            navigation.goBack();
                        }}
                    />
                </View>

                <View style={{margin: 5, flex: 1}}>

                    <Button title="Delete"
                            color="red"
                            onPress={() => {

                                Alert.alert(
                                    "Confirmation",
                                    "Are you sure you want to delete this product?",
                                    [
                                        {
                                            text: "Yes",
                                            onPress: () => {

                                                if(indexnum === -1){
                                                    Alert.alert("Error", "Brand not found.");
                                                    return;
                                                }

                                                datasource[indexnum].data.splice(
                                                    route.params.index, 1
                                                );

                                                navigation.goBack();
                                            }
                                        },
                                        {
                                            text: "No"
                                        }
                                    ]
                                );

                            }}
                    />

                </View>

            </View>

            <View style={{marginTop: 10, marginBottom: 30}}>
                <Button title="Cancel"
                        color="grey"
                        onPress={() => navigation.goBack()}
                />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 35,
        backgroundColor: '#FAF9F6'
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5
    },

    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10
    },

    productImage: {
        width: 130,
        height: 150,
        alignSelf: 'center',
        borderRadius: 8
    }
});

export default Edit;