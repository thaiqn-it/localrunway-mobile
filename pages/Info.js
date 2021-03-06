import React,{ useState,useContext,useEffect } from 'react'
import { StyleSheet, Text, View,Button,ScrollView,TouchableOpacity } from 'react-native'
import { Header,Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import {FontAwesome5} from "@expo/vector-icons";
import { CustomerContext } from '../context/Customer';
import * as SecureStore from "expo-secure-store";
import ModalSelector from 'react-native-modal-selector'
import { Alert } from 'react-native';

const data = require("../data/address.json")

export default function Info() {
    //navigation
    const navigation = useNavigation();
    //customer context
    const { customer,dispatch,state } = useContext(CustomerContext)
    //address declare
    const [province,setProvince] = useState('01')
    const [district,setDistrict] = useState('001');
    const [coummune,setCoummune] = useState('00001');
    const provinceData = data.province; 
    const districtData = data.district.filter((item) => item.idProvince == province)
    const coummuneData = data.commune.filter((item) => item.idDistrict == district)  
    const [street,setStreet] = useState("");
    //customer declare
    const [ name,setName ] = useState("");
    const [ phone,setPhone ] = useState("");
    const [ email,setEmail ] = useState("");
    // error
    const [ nameErr,setNameErr ] = useState();
    const [ phoneErr,setPhoneErr ] = useState();
    const [ addressErr,setAddressErr ] = useState();
    const [ emailErr,setEmailErr ] = useState();
    
    useEffect(() => {
        setEmail(customer.email)
        setName(customer.name)
        setPhone(customer.phoneNumber)
    }, [])

    const checkAddressExist = () => {
        // Check district is exist in province
        const districtList = data.district.filter(item => item.idProvince === province)
        const districtExist = districtList.findIndex(item => item.key === district)
        // Check coummune is exist in district
        const coummuneList = data.commune.filter(item => item.idDistrict === district)
        const coummuneExist = coummuneList.findIndex(item => item.key === coummune)
        if (districtExist === -1) {
            return false;
        } else if (coummuneExist === -1) {
            return false;
        } else return true
    }

    const saveHandler = () => {  
        const coummuneName = data.commune.find(item => item.key == coummune).label
        const districtName = data.district.find(item => item.key == district).label
        const provinceName = data.province.find(item => item.key == province).label
        const location =    street + ',' +  
                            coummuneName + ',' +  
                            districtName + ',' +
                            provinceName
        dispatch({
            type : "NEW_ADDRESS",
            customerId : customer._id,
            customer : {
                name,
                phone,
                email,
            },
            address : location,
        })      
    }

    const checkValidate = () => {
        let phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let err = false;

        if (name === "") {
            setNameErr("Name not empty !")       
            err = true
        } else setNameErr('')
        if (phone_regex.test(phone) == false) {
            setPhoneErr("Phone Number should be from VN. Prefix 0 is OK")
            err = true
        } else setPhoneErr('')
        if (email_regex.test(email) == false) {
            setEmailErr("Email is Not Correct")
            err = true
        } else setEmailErr('')
        if (street === '') {
            setAddressErr("Address not empty !")  
            err = true
        } else setAddressErr('')

        return err;
    }

    return (
        <ScrollView style={{height:'100%',backgroundColor:'white'}}>
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
                        value={name}
                        onChangeText={value => setName(value)}
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        placeholder={"Input your name"}
                        errorStyle={{ color: 'red' }}
                        errorMessage={nameErr}
                       />
                <Input  label={"Phone :"}
                        value={phone}
                        keyboardType='numeric'
                        onChangeText={value => setPhone(value)}
                        leftIcon={{ type: 'font-awesome', name: 'phone' }}
                        placeholder={"Input your phone"}
                        errorStyle={{ color: 'red' }}
                        errorMessage={phoneErr}
                       />
                <Input  label={"Email :"}
                        value={email}
                        onChangeText={value => setEmail(value)}
                        leftIcon={{ type: 'feather', name: 'mail' }}
                        placeholder={"Input your email"}
                        errorStyle={{ color: 'red' }}
                        errorMessage={emailErr}
                />
                <Input  label={"Address :"}
                        value={street}
                        onChangeText={value => setStreet(value)}
                        leftIcon={{ type: 'font-awesome', name: 'address-book' }}
                        placeholder={"Input your apartment number and street"}
                        errorStyle={{ color: 'red' }}
                        errorMessage={addressErr}
                />
             
                <View style={styles.picker}>
                    <Text style={styles.pickerLabel}>Province : </Text>
                    <ModalSelector
                        initValue={"Province"}
                        style={{width:200}}
                        selectedKey={province}
                        data={provinceData}
                        onChange={item => setProvince(item.key)}
                    />
                </View>
                
                <View style={styles.picker}>
                    <Text style={styles.pickerLabel}>District : </Text>
                    <ModalSelector
                        initValue={"District"}
                        style={{width:200}}
                        selectedKey={district}
                        data={districtData}
                        onChange={item => setDistrict(item.key)}
                    />
                </View>
                
                <View style={styles.picker}>
                    <Text style={styles.pickerLabel}>Commune : </Text>
                    <ModalSelector
                        initValue={"Coummune"}
                        style={{width:200}}
                        selectedKey={coummune}
                        data={coummuneData}
                        onChange={item => setCoummune(item.key)}
                    />
                </View>      
                
            </View>  
            <View style={{width:200,alignSelf:'center'}}>
                <Button onPress={async () => {
                    const err = checkValidate()
                    if (!err) {
                        const exist = checkAddressExist()
                            if (exist === false) {
                                Alert.alert("Error","Address not matching, try again")
                            } else {
                                saveHandler()
                                await SecureStore.setItemAsync("ADDRESS",JSON.stringify(state.address))
                                navigation.goBack()
                            }
                    }              
                }}
                        style={styles.saveButton} 
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
        width : 100
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
