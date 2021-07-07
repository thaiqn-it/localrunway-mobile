import React, { useEffect,useState } from 'react'
import { StyleSheet,
        Text,
        View,
        FlatList, 
        TouchableOpacity,
} from 'react-native'
import { Header,ListItem,Avatar } from 'react-native-elements'
import {FontAwesome5} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { vndFormat } from "../utils";
import { orderApi } from '../api/order';

function HistoryOrderComponent ({data,navigation}){
    return(
        <ListItem
            onPress={() => navigation.navigate("Order",data.item._id)}
            bottomDivider>
            <Avatar
                source={{
                uri: data.item.localbrand.logoUrl,
                }}
                containerStyle={{
                width: 100,
                height: 100,
                }}
            />
            <ListItem.Content>
                <ListItem.Title>{data.item.localbrand.name}</ListItem.Title>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                    }}
                    >
                    <Text
                        style={{
                        marginRight: 10,
                        }}
                    >
                        <Text
                        style={{
                            fontWeight: "bold",
                        }}
                        >
                        {data.item.localbrand.address}
                        </Text>
                    </Text>
                    </View>
                    <ListItem.Title
                    style={{
                        fontWeight: "bold",
                        marginTop: 20,
                    }}
                    >
                    {vndFormat(data.item.total)}
                    </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
}

export default function HistoryOrders() {
    const navigation = useNavigation();
    const [ orders,setOrders ] = useState([])

    useEffect(() => {
        orderApi.getAll().then(res => {
            setOrders(res.data.orders)
        })
    }, [])

    return (
        <View>
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
                text: "History Orders",
                style: { fontSize: 20, color: "black", fontWeight: "bold" },
              }}
              rightComponent={
                <FontAwesome5   onPress={() => navigation.navigate("Cart")} 
                                name="shopping-cart" 
                                size={25} 
                                color="black" /> 
              }
             />
            { orders.length > 0 && (
                <FlatList   data={orders}
                            renderItem={item => <HistoryOrderComponent data={item} navigation={navigation}/>}
                            keyExtractor={item => item._id}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({})
