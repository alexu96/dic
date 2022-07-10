import React, { FC } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import SoundPlayer from 'react-native-sound-player'

const Details: FC = ({ route }:any) => {
    const item = route?.params?.data;

    const handleSubmit=()=>{
        try {
            SoundPlayer.playUrl(item[0].phonetics[1].audio)
        } catch (e) {
            alert("Audio file not found");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>{item[0].word}</Text>
                <Text>Pronunciation : {item[0].phonetic}</Text>
            </View>
            <FlatList
                data={item}
                renderItem={({ item }) => (
                    item.meanings.map((res: { partOfSpeech: string; definitions: {
                        definition: string; example: string; }[]; }, index: React.Key) => (
                        <View key={index} style={styles.outer}>
                            <Text style={styles.text}>{res.partOfSpeech}</Text>
                            <Text>{res.definitions[0].definition}</Text>
                            <Text>EXAMPLE: {res.definitions[0]?.example}</Text>
                        </View>
                    ))
                )}
                keyExtractor={(_, index) => index.toString()}
            />
            <Button
                onPress={handleSubmit}
                title="Play Sound"
                color="#841584"
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        borderWidth: 1,
        padding: 10,
        margin: 10
    },
    text: {
        fontWeight: "bold",
        fontSize: 18
    },
    outer: {
        margin: 15,
    }


});

export default Details