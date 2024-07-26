import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'


type RegisterButtonProps = {
    create: () => void
}


export default function RegisterButton({ create }: RegisterButtonProps) {
    
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={create}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
    },
    text: {
        color: '#000',
        textAlign: 'center',
        fontSize: 50,
    },
})