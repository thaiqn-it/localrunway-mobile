import React,{ useState } from 'react'
import { StyleSheet, Text, View,Button,ScrollView,TouchableOpacity } from 'react-native'
import { Header,Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import {FontAwesome5} from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';

const data = require("../data/address.json")

export default function Info() {
    const [province,setProvince] = useState(null)
    const [district,setDistrict] = useState(null);
    const [coummune,setCoummune] = useState(null);
    const navigation = useNavigation();
    const provinceData = data.province; 
    const districtData = data.district.filter((item) => item.idProvince == province)
    const coummuneData = data.commune.filter((item) => item.idDistrict == district)

    return (
        <ScrollView style={{height:'100%'}}>
            <Header
        containerStyle={{
          backgroundColor: "white",
        }}
        leftComponent={
          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => {
              navigation.goBack();
            }}
            >
            <FontAwesome5
            name={"chevron-left"}
            size={20}
            style={{ width: 30 }}
            color={"black"}
            />
            <Text
            style={{
                fontSize: 20,
                marginLeft: -5,
            }}
            >
            Back
            </Text>
        </TouchableOpacity>
        }
            centerComponent={{
            text: "Info",
            style: { fontSize: 20, color: "black", fontWeight: "bold" },
            }}
        />
            <View>
                <Text style={styles.title}>Input your information : </Text>
                <Input  label={"Name :"}
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        placeholder={"Input your name"}
                       />
                <Input  label={"Phone :"}
                        leftIcon={{ type: 'font-awesome', name: 'phone' }}
                        placeholder={"Input your phone"}
                       />
                <Input  label={"Email :"}
                        leftIcon={{ type: 'feather', name: 'mail' }}
                        placeholder={"Input your email"}
                />
                <Input  label={"Address :"}
                        leftIcon={{ type: 'font-awesome', name: 'address-book' }}
                        placeholder={"Input your address"}
                />
             
                <View style={styles.picker}>
                    <Text style={styles.pickerLabel}>Province : </Text>
                    <Picker
                        selectedValue={province}
                        style={{ height: 70, width: 250 }}
                        onValueChange={(itemValue, itemIndex) => setProvince(itemValue)}
                    >
                        {provinceData.map((province) => {
                            return(
                                <Picker.Item    label={province.name} 
                                                value={province.idProvince} 
                                                key={province.idProvince}/>
                            )
                        })}
                    </Picker>
                </View>
                
                <View style={styles.picker}>
                    <Text style={styles.pickerLabel}>District : </Text>
                    <Picker
                    selectedValue={district}
                    style={{ height: 70, width: 250 }}
                    onValueChange={(itemValue, itemIndex) => setDistrict(itemValue)}
                    >
                        {districtData.map((district) => {
                            return(
                                <Picker.Item    label={district.name} 
                                                value={district.idDistrict} 
                                                key={district.idDistrict}/>
                            )
                        })}
                    </Picker>
                </View>
                
                <View style={styles.picker}>
                    <Text style={styles.pickerLabel}>Commune : </Text>
                    <Picker
                    selectedValue={coummune}
                    style={{ height: 70, width: 250 }}
                    onValueChange={(itemValue, itemIndex) => {
                        setCoummune(itemValue)
                    }}
                    >
                        {coummuneData.map((coummune) => {
                            return(
                                <Picker.Item    label={coummune.name} 
                                                value={coummune.idCoummune} 
                                                key={coummune.idCoummune}/>
                            )
                        })}
                    </Picker>
                </View>            
            </View>  
            <View style={{width:200,alignSelf:'center'}}>
                <Button style={styles.saveButton} 
                            color={'red'}
                        title={'Save'}
                        />  
            </View>   
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    picker : {
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
    },
    pickerLabel : {
        fontSize:17,
    },
    title : {
        fontSize :25,
        textAlign:'center',
        fontWeight:'bold',
        marginBottom:20,
    },
    saveButton : {
        position: 'absolute',
        bottom:0,
        left:0,
    },
})
