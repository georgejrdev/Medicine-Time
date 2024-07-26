import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, Dimensions, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import { createMedicine, saveHourMedicine, InputMedicine, SavedMedicines } from '../../utils/createMedicine'

const { width, height } = Dimensions.get('window')


type CreateMedicineProps = {
    onUpdateSavedMedicine: (newSavedMedicine: SavedMedicines) => void
    hideCreateMedicine: () => void
    savedMedicine: SavedMedicines
}


export default function CreateMedicine({ onUpdateSavedMedicine, hideCreateMedicine, savedMedicine }: CreateMedicineProps) {
    
    const [name, setName] = useState('')
    const [initDate, setInitDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [initHour, setInitHour] = useState(new Date())
    const [spaceHour, setSpaceHour] = useState('')
    const [isInitDatePickerVisible, setInitDatePickerVisibility] = useState(false)
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false)
    const [isInitHourPickerVisible, setInitHourPickerVisibility] = useState(false)

    const handleConfirmInitDate = (date: Date) => {
        setInitDate(date)
        setInitDatePickerVisibility(false)
    }

    const handleConfirmEndDate = (date: Date) => {
        setEndDate(date)
        setEndDatePickerVisibility(false)
    }

    const handleConfirmInitHour = (date: Date) => {
        setInitHour(date)
        setInitHourPickerVisibility(false)
    }

    const handleConfirm = () => {
        let medicine: InputMedicine = createMedicine(
            name,
            format(initDate, 'yyyy-MM-dd'),
            format(endDate, 'yyyy-MM-dd'),
            format(initHour, 'HH:mm'),
            parseInt(spaceHour, 10),
            'blue'
        )

        let updatedSavedMedicine = saveHourMedicine(medicine, savedMedicine)
        onUpdateSavedMedicine(updatedSavedMedicine)

        hideCreateMedicine()
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.name}
                placeholder='Nome'
                onChangeText={text => setName(text)}
            />

            <TouchableOpacity onPress={() => setInitDatePickerVisibility(true)} style={styles.initDate}>
                <Text>Initial Date: {format(initDate, 'dd/MM/yyyy')}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isInitDatePickerVisible}
                mode="date"
                date={initDate}
                onConfirm={handleConfirmInitDate}
                onCancel={() => setInitDatePickerVisibility(false)}
            />

            <TouchableOpacity onPress={() => setEndDatePickerVisibility(true)} style={styles.endDate}>
                <Text>End Date: {format(endDate, 'dd/MM/yyyy')}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                date={endDate}
                onConfirm={handleConfirmEndDate}
                onCancel={() => setEndDatePickerVisibility(false)}
            />

            <TouchableOpacity onPress={() => setInitHourPickerVisibility(true)} style={styles.initHour}>
                <Text>Initial Hour: {format(initHour, 'HH:mm')}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isInitHourPickerVisible}
                mode="time"
                date={initHour}
                onConfirm={handleConfirmInitHour}
                onCancel={() => setInitHourPickerVisibility(false)}
            />

            <TextInput
                style={styles.spaceHour}
                placeholder='Intervalo de Tempo (Horas)'
                onChangeText={text => setSpaceHour(text)}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.createButton} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '32%',
        width: '95%',
        paddingVertical: 20,
        backgroundColor: '#EFEFEF',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    name: {
        width: '90%',
        backgroundColor: '#FB9F9E',
        height: 50,
        textAlign: 'center',
    },
    initDate: {
        width: '90%',
        backgroundColor: '#FFDDD8',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    endDate: {
        width: '90%',
        backgroundColor: '#BC9EFB',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    initHour: {
        width: '90%',
        backgroundColor: '#72CCCB',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spaceHour: {
        width: '90%',
        backgroundColor: '#FFD09E',
        height: 50,
        textAlign: 'center',
    },
    createButton: {
        backgroundColor: '#B0F0A5',
        width: '90%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
})