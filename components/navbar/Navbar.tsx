import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'


type NavbarProps = {
    create: () => void
}


export default function Navbar({ create }: NavbarProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={create}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        backgroundColor: '#FFF',
        width: '100%',
        padding: 10,
    },
    text: {
        color: '#000',
        textAlign: 'center',
        fontSize: 50,
    },
    button: {
        backgroundColor: '#F5F5F5',
        width: '100%',
    },
})