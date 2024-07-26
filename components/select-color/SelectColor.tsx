import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import Color from './Color'

const { width, height } = Dimensions.get('window')

type SelectColorProps = {
    create: () => void
    onSelectColor: (color: string) => void
}

export default function SelectColor({ create, onSelectColor }: SelectColorProps) {

    const setSelectedColor = (color:string) =>{
        onSelectColor(color)
        create()
    }

    return (
        <View style={styles.container}>
            <View style={styles.colorContainer}>
                <Color colorProps='#B0F0A5' onPress={() => setSelectedColor('#B0F0A5')} />
                <Color colorProps='#FB9F9E' onPress={() => setSelectedColor('#FB9F9E')} />
                <Color colorProps='#FFD09E' onPress={() => setSelectedColor('#FFD09E')} />
                <Color colorProps='#FFDDD8' onPress={() => setSelectedColor('#FFDDD8')} />
                <Color colorProps='#F4F0BC' onPress={() => setSelectedColor('#F4F0BC')} />
                <Color colorProps='#C997C6' onPress={() => setSelectedColor('#C997C6')} />
                <Color colorProps='#B0EFEF' onPress={() => setSelectedColor('#B0EFEF')} />
                <Color colorProps='#A0E1B2' onPress={() => setSelectedColor('#A0E1B2')} />
                <Color colorProps='#83D9DC' onPress={() => setSelectedColor('#83D9DC')} />
            </View>

            <TouchableOpacity style={styles.button} onPress={create}>
                <Text style={styles.textButton}>X</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: (height / 2) - 50,
        backgroundColor: '#EFEFEF',
        width:'70%',
        padding: 20,
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 'auto',
        flexWrap: 'wrap',
        gap: 10,
    },
    button: {
        marginTop:25,
        backgroundColor: 'transparent',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    textButton: {
        color:'white',
        backgroundColor:'red',
        padding:5,
        width:30,
        height:30,
        borderRadius: 1000,
        textAlign:'center',
        fontWeight:'bold',
        borderWidth:2,
        borderColor:'black',
    }
})
