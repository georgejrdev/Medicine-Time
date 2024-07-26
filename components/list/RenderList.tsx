import { FlatList, Text, View, StyleSheet } from 'react-native'
import { SavedMedicines, generateId } from '../../utils/createMedicine'
import Item from './Item'


interface RenderListProps {
    savedMedicine: SavedMedicines
    onDeleteMedicine: (id: string) => void
}


export default function RenderList({ savedMedicine, onDeleteMedicine }: RenderListProps) {

    const groupedMedicines = Object.entries(savedMedicine).map(([date, medicines]) => ({
        date,
        medicines,
    }))

    const renderMedicine = ({ item }: { item: { date: string; medicines: any[] } }) => (
        <View>
            <Text style={styles.date}>{item.date}</Text>
            {item.medicines.map((medicine: any) => (
                <Item
                    key={generateId()}
                    name={`${medicine.name} ->`}
                    hour={`${medicine.hours}:${medicine.minutes}`}
                    color={medicine.color || '#E1E1E1'}
                    idMedicine={medicine.id}
                    onDelete={onDeleteMedicine}
                />
            ))}
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={groupedMedicines}
                keyExtractor={({ date }) => date}
                renderItem={renderMedicine}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 10,
        marginBottom: 150,
    },
    date: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 35,
        marginBottom: 15,
    }
})