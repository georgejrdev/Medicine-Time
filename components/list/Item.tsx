import { StyleSheet, Text, View } from 'react-native'


interface ItemProps {
    name: string
    hour: string
    color: string
    idMedicine: string
    onDelete: (id: string) => void
}


export default function Item({ name, hour, color, idMedicine, onDelete }: ItemProps) {

  const deleteV = async () => {
        await onDelete(idMedicine)
    }

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.hour}>{hour}</Text>
            <Text onPress={deleteV} style={styles.hour}>Delete</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row',
    },
    name: {
        fontSize: 22,
        color: '#FFF',
        fontWeight: 'bold',
    },
    hour: {
        fontSize: 16,
        color: '#FFF',
        marginLeft: 35,
    },
})