import React, {useState} from 'react';
import {View, Text, TextInput, Button, ScrollView, Alert, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {StatusBar} from 'expo-status-bar';
import {datasource} from './Data.js';

const Add = ({navigation}) => {

    const [name, setName] = useState('');
    const [brand, setBrand] = useState( '');
    const [icon, setIcon] = useState('bottle-droplet');
    const [use, setUse] = useState('Best for Both Day and Night uses.');
    const [image, setImage] = useState('');

    return (
        <ScrollView style={styles.container}>
            <StatusBar/>

            <Text style={styles.title}>Add Product</Text>
            <Text style={styles.label}>Product Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter product name"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Brand:</Text>
            <Picker
                selectedValue={brand}
                onValueChange={(value) => setBrand(value)}
            >
                <Picker.Item label="Select a Brand" value=""/>
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
                placeholder="Enter image URL"
                value={image}
                onChangeText={(text) => setImage(text)}
                autoCapitalize="none"
            />

            <Button
                title="Submit"
                onPress={() => {

                    if (name.trim() === "" || brand === "" || image.trim() === "") {
                        Alert.alert("Error", "Please enter all fields.");
                        return;
                    }

                    let indexnum = datasource.findIndex(
                        (section) => section.title === brand
                    );

                    if (indexnum === -1) {
                        Alert.alert("Error", "Brand not found.");
                        return;
                    }

                    let item = {
                        key: name.trim(),
                        icon: icon,
                        use: use,
                        image: image.trim()
                    };

                    datasource[indexnum].data.push(item);
                    navigation.goBack();
                }}
            />

            <View style={{marginTop: 10, marginBottom: 30}}>
                <Button
                    title="Cancel"
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
        marginBottom: 20
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
    }
});

export default Add;