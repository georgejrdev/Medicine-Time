import { StyleSheet, TouchableOpacity, View } from 'react-native'

type ColorProps = {
    colorProps: string
    onPress: () => void
}

export default function Color({ colorProps, onPress }: ColorProps) {

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: colorProps }]}></TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: '#000',
    }
})
