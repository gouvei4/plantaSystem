import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Welcome() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.containerView}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation={"flipInY"}
                    source={require('../assets/images/logo.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>
            <Animatable.View
                delay={600}
                animation={"fadeInUp"}
                style={styles.containerForm}
            >
                <Text style={styles.title}>
                    Anote, adicione códigos e imagens de itens.
                </Text>
                <Text style={styles.text}>
                    Clique abaixo para acessar
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Root')}
                    style={styles.button}>
                    <Text
                        style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
                <Text style={styles.containerSub}>
                    Desenvolvido por Afonso Corp
                </Text>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: '#111',
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 12,
    },
    text: {
        color: '#a1a1a1',
    },
    button: {
        marginTop: 8,
        position: 'absolute',
        backgroundColor: '#7934AD',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    containerSub: {
        position: 'absolute',
        paddingVertical: 8,
        alignSelf: 'center',
        top: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'gray',
    },
})