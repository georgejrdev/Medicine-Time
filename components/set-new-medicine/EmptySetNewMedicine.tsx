import { StyleSheet, Text, View, Dimensions } from 'react-native'
import RegisterButton from './RegisterButton'

const { width, height } = Dimensions.get('window')


type EmptySetNewMedicineProps = {
    create: () => void
}


export default function EmptySetNewMedicine({ create }: EmptySetNewMedicineProps) {
    
    return (
        <View style={styles.container}>
            <RegisterButton create={create} />
            <Text>You haven't registered any medicine yet</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: (height / 2) - 50,
    },
})