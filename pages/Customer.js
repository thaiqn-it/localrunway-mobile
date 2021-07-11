import React, { useState,useEffect,useContext } from 'react'
import { StyleSheet, 
        Text, 
        ScrollView,
        View,
        Alert,
        TouchableOpacity, } from 'react-native'
import { Header,Input,CheckBox,Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import {FontAwesome5} from "@expo/vector-icons";
import { CustomerContext } from '../context/Customer';
import { customerApi } from '../api/customer';

export default function Customer() {
    const { customer,setCustomer,getCustomerFromDB } = useContext(CustomerContext)
    const navigation = useNavigation();
    const [ isChangePasw, setChangePasw ] = useState(false);
    // customer attr
    const [ name,setName ] = useState(null);
    const [ email,setEmail ] = useState(null);
    const [ job,setJob ] = useState(null);
    const [ hobby,setHobby ] = useState(null);
    const [ heightValue, setHeightValue ] = useState(0);
    const [ weightValue, setWeightValue ] = useState(0);
    const [ oldPasw,setOldPasw ] = useState(null);
    const [ newPasw,setNewPasw ] = useState(null);
    const [ confirmPasw,setConfirmPasw ] = useState(null);
    const waist = customer.waist;
    const hip = customer.hip;
    const bust = customer.bust;

    //gender
    const [ isMale, setIsMale ] = useState(false);
    const [ isFemale, setIsFemale ] = useState(false);
    const [ isOther, setIsOther ] = useState(false);
    const [ gender, setGender ] = useState("");
    //show password
    const [ showOldPasw,setShowOld ] = useState(false);
    const [ showNewPasw,setShowNew ] = useState(false);
    const [ showConfirmPasw,setShowConfirm ] = useState(false);
    //err
    const [ errName,setErrName ] = useState("")
    const [ errEmail,setErrEmail ] = useState("")

    const maleChoice = () => {
        setIsMale(true);
        setIsOther(false);
        setIsFemale(false);
        setGender("MALE");
      };
    
      const femaleChoice = () => {
        setIsMale(false);
        setIsOther(false);
        setIsFemale(true);
        setGender("FEMALE");
      };
    
      const otherChoice = () => {
        setIsMale(false);
        setIsOther(true);
        setIsFemale(false);
        setGender("OTHER");
      };
    
    useEffect(() => {
        setName(customer.name)
        setEmail(customer.email)
        setJob(customer.job)
        setHobby(customer.hobby)
        setHeightValue(customer.height)
        setWeightValue(customer.weight)
        if (customer.gender === 'MALE') {
            setIsMale(true);
            setGender("MALE")
        } else if (customer.gender === 'FEMALE') {
            setIsFemale(true);
            setGender("FEMALE")
        }
        else {
            setIsOther(true)
            setGender('OTHER')
        }
    }, [])

    const loadCustomer = () => {
        async function load () {
        const data = await getCustomerFromDB()
        setCustomer({
            type : 'LOAD',
            data : data,
        })
        }   
        load()
    }

    const updatePassword = async (err) => {
        let errorMsg = err;
        try {
            const response = await customerApi.changePassword(oldPasw,newPasw)
        } catch (err) {
            if (err.response.data.errorParams.password) {
                errorMsg = errorMsg.concat(
                    `\n` + err.response.data.errorParams.password
                );
            }
            if (err.response.data.errorParams.newPassword) {
                errorMsg = errorMsg.concat(
                    `\n` + err.response.data.errorParams.newPassword
                );
            }
        } 
        if (errorMsg) {
            Alert.alert("Failed", 'Something went wrong !!! Check your password');
        } else {
            loadCustomer();
            Alert.alert("Successfull !!!")
        };
    }

    const updateInformation = async () => {
        let errorMsg = "";
        const customer = {
            email : email,
            hobby : hobby,
            job : job,
            waist : waist,
            hip : hip,
            bust : bust,        
            name : name,
            gender : gender,
            height : heightValue,
            weight : weightValue,
        }
        try {
            const response = await customerApi.updateCustomer(customer)
        } catch (err) {
            if (err.response.data.errorParams.email) {
                setErrEmail(err.response.data.errorParams.email)
                errorMsg = errorMsg.concat(
                    `\n` + err.response.data.errorParams.email
            );
            }
            if (err.response.data.errorParams.name) {
                setErrName(err.response.data.errorParams.name)
                errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.name);
            }
    
            if (err.response.data.errorParams.gender) {
                errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.gender);
            }

        }
        return errorMsg;
    }

    const save = () => {
        if (isChangePasw === true) {
            if (newPasw === confirmPasw) {
                updateInformation().then((err) => updatePassword(err))
            } else {
                Alert.alert(
                    "Error","New password not match confirm password"
                );
            }          
        } else {
            updateInformation().then(err => {
                if (err) {
                    Alert.alert("Error","Something went wrong !!!")
                } else {
                    loadCustomer();
                    Alert.alert("Successfull !!!")
                };
            })            
        } 
    }

    return (
        <ScrollView style={{backgroundColor:'white',height : '100%'}}>
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
                    text: "Customer",
                    style: { fontSize: 20, color: "black", fontWeight: "bold" },
                    }}
                />

            <View>
                <Input  label={"Name :"}
                        value={name}
                        onChangeText={value => {
                            setName(value)
                            setErrName('')
                        }}
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        placeholder={"Input your name"}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errName}
                       /> 
                <Text style={{
                    color:'gray',
                    fontSize:15,
                    fontWeight:'bold',
                    marginLeft: 10}}>Gender: </Text> 
                 <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "100%",
                    marginRight: 20,
                    }}
                >
                    <CheckBox
                    center
                    title="Male"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={isMale}
                    containerStyle={{ width: "29%" }}
                    onPress={maleChoice}
                    />
                    <CheckBox
                    center
                    title="Female"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={{ width: "29%" }}
                    checked={isFemale}
                    onPress={femaleChoice}
                    />
                    <CheckBox
                    center
                    title="Other"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={{ width: "29%" }}
                    checked={isOther}
                    onPress={otherChoice}
                    />
                </View>          
                <Input  label={"Email :"}
                        value={email}
                        onChangeText={value => {
                            setEmail(value)
                            setErrEmail('')
                        }}
                        leftIcon={{ type: 'feather', name: 'mail' }}
                        placeholder={"Input your email"}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errEmail}
                />
                <Input  label={"Job :"}
                        value={job}
                        onChangeText={value => setJob(value)}
                        leftIcon={{ type: 'antdesign', name: 'paperclip' }}
                        placeholder={"Input your job"}
                />
                <Input  label={"Hobby :"}
                        value={hobby}
                        onChangeText={value => setHobby(value)}
                        leftIcon={{ type: 'material-icon', name: 'favorite' }}
                        placeholder={"Input your hobby"}
                />
                <CheckBox
                    containerStyle={styles.cbContainer}
                    checked={isChangePasw}
                    onPress={() => setChangePasw(!isChangePasw)}
                    title={'Change password'}
                />
                {isChangePasw === true && (               
                    <View>
                        <Input  label={"Old password :"}
                        value={oldPasw}
                        onChangeText={value => setOldPasw(value)}
                        placeholder={"Input your old password"}
                        secureTextEntry={!showOldPasw}
                        rightIcon={{
                            type: "font-awesome-5",
                            name: showOldPasw ? "eye" : "eye-slash",
                            onPress: (e) => {
                              setShowOld(!showOldPasw);
                            },
                        }}
                        />
                        <Input  label={"New password :"}
                        value={newPasw}
                        onChangeText={value => setNewPasw(value)}
                        placeholder={"Input your new password"}
                        secureTextEntry={!showNewPasw}
                        rightIcon={{
                            type: "font-awesome-5",
                            name: showNewPasw ? "eye" : "eye-slash",
                            onPress: (e) => {
                              setShowNew(!showNewPasw);
                            },
                        }}
                        />
                        <Input  label={"Confirm :"}
                        value={confirmPasw}
                        onChangeText={value => setConfirmPasw(value)}
                        placeholder={"Confirm your password"}
                        secureTextEntry={!showConfirmPasw}
                        rightIcon={{
                            type: "font-awesome-5",
                            name: showConfirmPasw ? "eye" : "eye-slash",
                            onPress: (e) => {
                              setShowConfirm(!showConfirmPasw);
                            },
                        }}
                        />
                    </View>
                )}       
            </View>  
            <View style={{padding:10}}>
                <Button
                    onPress={ () => save() }
                    buttonStyle={{
                    backgroundColor: "white",
                    }}
                    containerStyle={{
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: "black",
                    }}
                    titleStyle={{
                    color: "black",
                    }}
                    title={"Save"}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cbContainer: {
        borderWidth: 0,
        backgroundColor: "white",
    },
    saveButton : {
        position: 'absolute',
        bottom:0,
        left:0,
    },
})
