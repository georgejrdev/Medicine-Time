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
                <Color colorProps='#90F27F' onPress={() => setSelectedColor('#90F27F')} />
                <Color colorProps='#FC716F' onPress={() => setSelectedColor('#FC716F')} />
                <Color colorProps='#FFD09E' onPress={() => setSelectedColor('#FFD09E')} />
                <Color colorProps='#FCA6CA' onPress={() => setSelectedColor('#FCA6CA')} />
                <Color colorProps='#DED454' onPress={() => setSelectedColor('#DED454')} />
                <Color colorProps='#C997C6' onPress={() => setSelectedColor('#C997C6')} />
                <Color colorProps='#69DEDE' onPress={() => setSelectedColor('#69DEDE')} />
                <Color colorProps='#48B265' onPress={() => setSelectedColor('#48B265')} />
                <Color colorProps='#2F979B' onPress={() => setSelectedColor('#2F979B')} />
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
