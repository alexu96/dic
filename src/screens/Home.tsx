import React, { useState, FC, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import {  TextInput } from 'react-native-paper';
import axios from 'axios';

const Home: FC = ({ navigation }:any) => {


    const [data, Setdata] = useState(null)
    const [random, Setrandom] = useState({
        word: '',
        definition: '',
        pronunciation: ''
    })
    const [searchQuery, setSearchQuery] = useState('')

    const handleSubmit = () => {
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`)
            .then(function (response) {
                Setdata(response?.data)
            }).catch(function (error) {
                alert("Word doesn't exist in dictionary");
            })
    }


    useEffect(() => {
        axios.get("https://random-words-api.vercel.app/word").then((response) => {
            setSearchQuery(response.data[0].word);
            Setrandom({
                ...random,
                word: response.data[0].word,
                pronunciation: response.data[0].pronunciation,
                definition: response.data[0].definition
            })
            
        })
    }, []);



    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput style={styles.textinput} placeholder="Enter Keyword....." onChangeText={setSearchQuery} />
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button1}>
                    <Text>Search</Text>
                </TouchableOpacity>


            </View>
            {
                data != null ? (
                    <View>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                item.meanings.map((res: { definitions: any[]; }) => (
                                    res.definitions.map((ans, index) => (
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => { navigation.navigate('Details', { data: data }) }}
                                            key={index}
                                        >
                                            <Text style={styles.text}>{item.word}</Text>
                                            <Text>{ans.definition}</Text>

                                        </TouchableOpacity>
                                    ))
                                ))
                            )}
                            keyExtractor={(_, index) => index.toString()}


                        />
                    </View>
                ) : (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{
                                    handleSubmit();        
                            }}>
                        <Text style={styles.text}>Word of the day</Text>
                        <Text>Word : {random.word}</Text>
                        <Text>Definition: {random.definition}</Text>
                        <Text>pronunciation: {random.pronunciation}</Text>
                            
                        </TouchableOpacity>
                       
                   
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 15,
        marginTop: '5%'
    },

    label: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        width: '30%'
    },
    value: {
        color: '#000',
        fontSize: 16,
        width: '68%'
    },
    button: {
        backgroundColor: 'whitesmoke',
        padding: 15,
        margin: 5
    },
    text: {
        color: "gray",
        fontWeight: 'bold',
        fontSize: 18,
        margin: 5
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textinput: {
        width: "70%",
        margin: 10,
    },
    button1: {
        borderWidth: 1,
        padding: 15,
        margin: 5,
        justifyContent: 'center',
        height: 60
    },
});

export default Home