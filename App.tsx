import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EmptySetNewMedicine from './components/set-new-medicine/EmptySetNewMedicine'
import CreateMedicine from './components/create-medicine/CreateMedicine'
import RenderList from './components/list/RenderList'
import Navbar from './components/navbar/Navbar'
import SelectColor from './components/select-color/SelectColor'
import { SavedMedicines } from './utils/createMedicine'

export default function App() {
    const [savedMedicine, setSavedMedicine] = useState<SavedMedicines>({})
    const [visibleCreateMedicine, setVisibleCreateMedicine] = useState(false)
    const [visibleEmptySetNewMedicine, setVisibleEmptySetNewMedicine] = useState(false)
    const [visibleNavbar, setVisibleNavbar] = useState(false)
    const [visibleList, setVisibleList] = useState(false)
    const [visibleSelectColor, setVisibleSelectColor] = useState(false)
    const [selectedColor, setSelectedColor] = useState('#E1E1E1')

    useEffect(() => {
        const loadSavedMedicines = async () => {
            try {
                const savedItems = await AsyncStorage.getItem('savedMedicines')
                if (savedItems) {
                    setSavedMedicine(JSON.parse(savedItems))
                }
            } catch (error) {
                console.error('Error loading items:', error)
            }
        }

        loadSavedMedicines()
    }, [])

    useEffect(() => {
        initRender()
    }, [savedMedicine])

    const updateSavedMedicine = async (newSavedMedicine: SavedMedicines) => {
        setSavedMedicine(newSavedMedicine)
        try {
            await AsyncStorage.setItem('savedMedicines', JSON.stringify(newSavedMedicine))
        } catch (error) {
            console.error('Error saving items:', error)
        }
    }

    const deleteMedicine = async (id: string) => {
        const updatedMedicines = { ...savedMedicine }

        for (const date in updatedMedicines) {
            updatedMedicines[date] = updatedMedicines[date].filter(
                (medicine: any) => medicine.id !== id
            )
        }

        for (const date in updatedMedicines) {
            if (updatedMedicines[date].length === 0) {
                delete updatedMedicines[date]
            }
        }

        await updateSavedMedicine(updatedMedicines)
    }

    const setAllVisibleToFalse = () => {
        setVisibleCreateMedicine(false)
        setVisibleList(false)
        setVisibleEmptySetNewMedicine(false)
        setVisibleNavbar(false)
        setVisibleSelectColor(false)
    }

    const createMedicine = () => {
        setAllVisibleToFalse()
        setVisibleCreateMedicine(true)
    }

    const hideElements = () => {
        setAllVisibleToFalse()
        initRender()
    }

    const showSelectColor = () => {
        setAllVisibleToFalse()
        setVisibleSelectColor(true)
    }

    const initRender = () => {
        setAllVisibleToFalse()
        if (Object.keys(savedMedicine).length === 0) {
            setVisibleEmptySetNewMedicine(true)
        } else {
            setVisibleNavbar(true)
            setVisibleList(true)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {visibleNavbar && (
                <Navbar create={createMedicine} />
            )}

            {visibleEmptySetNewMedicine && (
                <EmptySetNewMedicine create={createMedicine} />
            )}

            {visibleCreateMedicine && (
                <CreateMedicine
                    hideCreateMedicine={hideElements}
                    showSelectColor={showSelectColor}
                    onUpdateSavedMedicine={updateSavedMedicine}
                    savedMedicine={savedMedicine}
                    color={selectedColor} 
                />
            )}

            {visibleList && (
                <RenderList savedMedicine={savedMedicine} onDeleteMedicine={deleteMedicine} />
            )}

            {visibleSelectColor && (
                <SelectColor onSelectColor={setSelectedColor} create={createMedicine}/>
            )}

            <StatusBar style="light" backgroundColor="#000" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
})