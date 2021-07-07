import React, { useEffect,useState,useContext } from 'react'
import { StyleSheet,
        Text,
        View,
        FlatList, 
        TouchableOpacity,
} from 'react-native'
import { Header,ListItem,Avatar,CheckBox,Button } from 'react-native-elements'
import {FontAwesome5, Entypo,FontAwesome,MaterialIcons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CustomerContext } from '../context/Customer';
import * as SecureStore from "expo-secure-store";

function AddressComponent ({ data,isSelected,changeSelect }) {
    const { dispatch,state } = useContext(CustomerContext)
    return(
        <ListItem
                onPress={() => changeSelect(data.id)}
                button
                bottomDivider
                containerStyle={{
                    minHeight: 100,
                }}
            >  
            { isSelected == data.id ? <FontAwesome name="dot-circle-o" size={28} color="#2196F3" /> : <Entypo name="circle" size={24} color="black" /> }  
            <ListItem.Content
                style={{
                alignSelf: "flex-start",
                alignSelf: 'center',
                }}
            >       
                <View style={{flexDirection : 'row'}}>
                    <ListItem.Title style={{fontSize:16,fontWeight:'bold'}}>
                        {data.customer.name} - {data.customer.phone}          
                    </ListItem.Title>
                    <View style = {{flexDirection :'row', justifyContent :'flex-end',flex:1}}>
                        <MaterialIcons  name="delete" 
                                        size={23} 
                                        color="red" 
                                        onPress={ async () => {
                                            dispatch({
                                                type : "DELETE",
                                                id : data.id
                                            })
                                            await SecureStore.setItemAsync("ADDRESS",JSON.stringify(state.address))
                                        }}/>
                    </View>        
                </View>
                <ListItem.Subtitle>{data.address}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}


export default function Address() {
    const { state,dispatch,customer } = useContext(CustomerContext)
    const navigation = useNavigation();
    const [isSelected,setSelect] = useState(null);
    const data = state.address.filter(item => item.customerId === customer._id)

    return (
        <View style={{height:'100%'}}>
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
                text: "Delivery Address",
                style: { fontSize: 20, color: "black", fontWeight: "bold" },
                }}
            />
            {state.address.length > 0 && (
                <View>  
                    <FlatList 
                        data={data}
                        extraData={isSelected}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item})=> <AddressComponent    data={item} 
                                                                    isSelected={isSelected}
                                                                    changeSelect={id => setSelect(id)}/>}
                        keyExtractor={(item) => item.id.toString()}
                />            
                </View>
            )}

            <ListItem style={{marginTop:10}} onPress={() => navigation.navigate("Info")}>
                <ListItem.Content>
                    <ListItem.Title style={{color:'#2196F3'}}>Add new address</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <View style={{padding:10}}>
                <Button
                    onPress={async () => {          
                        dispatch({
                            type : "SELECT",
                            selectedId : isSelected,
                        })
                        await SecureStore.setItemAsync("ADDRESS",JSON.stringify(state.address))
                        navigation.goBack()
                    }}
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
                    title={"Confirm"}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
