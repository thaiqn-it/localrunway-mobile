import React, { useState,useEffect,useContext } from 'react'
import { useNavigation,useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Alert } from 'react-native'
import { Header, ListItem, Avatar, Button} from "react-native-elements";
import { FontAwesome5, Entypo,MaterialIcons } from "@expo/vector-icons";
import { paymentApi } from '../api/payment';
import { CartContext } from "../context/Cart";
import { orderApi } from '../api/order';
import { CustomerContext } from '../context/Customer';
import { productApi } from '../api/product';
import { vndFormat } from "../utils";

const DetailComponent = ({data,navigation}) => {
    const [product,setProduct] = useState('')
    useEffect(() => {  
        productApi.getOneById(data.productId).then(res => {
            setProduct(res.data.product)
        }).catch((err) => {
            console.log(err);
            });     
    }, [data])
    return(
        <ListItem
            button
            onPress={() => {
                navigation.navigate("Product", product._id);
            }}
            bottomDivider
            containerStyle={{
                minHeight: 100,
            }}
            >
            <Avatar
                source={{
                uri:
                    product.thumbnailUrl ??
                    "https://neva.vn/upload/img/ao-so-mi-trang-quan-au-den-soc.jpg",
                }}
                containerStyle={{
                width: 100,
                height: 100,
                }}
            />
            <ListItem.Content
                style={{
                alignSelf: "flex-start",
                }}
            >
                <ListItem.Title style={{fontSize : 20}}>{product.name}</ListItem.Title>
                <ListItem.Title>
                    <Text style={{
                        fontWeight: "bold",
                        marginTop: 20,
                        color : 'red',
                    }}>
                        {vndFormat(data.unitPrice)}
                    </Text>
                    <Text> x {data.quantity}</Text>     
                </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
            </ListItem>
    )
}

export default function Order() {
    const navigation = useNavigation()
    const route = useRoute();
    const [orderDetails,setOrderDetails] = useState([]);
    
    useEffect(() => {
        orderApi
          .getOrderDetail(route.params)
          .then((res) => {
            setOrderDetails(res.data.order);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    return (
        <View style={{backgroundColor:'white',height : '100%'}}>
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
                text: "Order Details",
                style: { fontSize: 20, color: "black", fontWeight: "bold" },
                }}
            />   
            <ListItem 
              bottomDivider>
              <MaterialIcons name="location-pin" size={24} color="#2196F3" />
              <ListItem.Content>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 10 }}>
                    <Text style={styles.title}>
                      {orderDetails.recipientName}   | 
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.title}>
                      {orderDetails.phoneNumber}
                    </Text>
                  </View>
                </View>
                <ListItem.Subtitle>
                  {orderDetails.address}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <View>
                <FlatList   data={orderDetails.details}
                        renderItem={({item}) => <DetailComponent    data={item} 
                                                                    navigation={navigation}/>}
                        keyExtractor={item => item._id}/>
            </View>
            {orderDetails.payment !== undefined && (
                <View style={{padding: 10}}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Payment method : {orderDetails.payment.paymentMethod}
                    </Text>      
                </View>
            )}
            
            <View style={{padding: 10}}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Total: {vndFormat(orderDetails.total)}
              </Text>
            </View>          
        </View>
    )
}

const styles = StyleSheet.create({
    blockBottom : {
        backgroundColor : 'white',
        padding : 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
    containerProduct: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: "white",
        paddingLeft:20,
        padding: 10,
    },
})
