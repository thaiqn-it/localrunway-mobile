import React, { useState,useEffect,useContext } from 'react'
import { useNavigation,useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Alert } from 'react-native'
import { Header, ListItem, Avatar, Button} from "react-native-elements";
import { FontAwesome5, Entypo,FontAwesome } from "@expo/vector-icons";
import { paymentApi } from '../api/payment';
import { CartContext } from "../context/Cart";
import { orderApi } from '../api/order';
import { CustomerContext } from '../context/Customer';
import LoadingSpinner from '../components/LoadingSpinner';

const IMAGE = [
    {
        name : "Momo",
        image : 'data:image/png;base64,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',
    },
    {
        name : "Visa",
        image : 'https://xinvisavietnam.net/wp-content/uploads/2018/10/dich-vu-visa.jpg',
    },
    {
        name : "COD",
        image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU3i9dKK73UudhX1ud5XCYt1-fTFj4M2PFtw&usqp=CAU',
    },
    {
        name : "ZaloPay",
        image : 'https://1.bp.blogspot.com/-gd31Y8LLTXc/XY0WhpfUF9I/AAAAAAADDzo/44-B6-qh8o0yyMwo-J2cHKyWz2SbfJGKACLcBGAsYHQ/s1600/logo.png',
    },
]


function PaymentComponent ({ data,isSelected,changeSelect }) {
    let image = ''
    IMAGE.map(item => {
        if (item.name === data.paymentMethod) image = item.image
    })

    return(
        <ListItem
                onPress={() => changeSelect(data._id)}
                button
                bottomDivider
                containerStyle={{
                    minHeight: 100,
                }}
            >  
            { isSelected == data._id ? <FontAwesome name="dot-circle-o" size={28} color="#2196F3" /> : <Entypo name="circle" size={24} color="black" /> }  
            
            <Avatar
                source={{
                uri: image,
                }}
                containerStyle={{
                width: 70,
                height: 70,
                }}
            />
            <ListItem.Content
                style={{
                alignSelf: "flex-start",
                alignSelf: 'center',
                }}
            >
                <ListItem.Title>{data.paymentMethod}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

export default function CreateOrder() {
    const navigation = useNavigation();
    const [payments,setPayments] = useState([]);     
    const [isSelected,setSelect] = useState(null);
    const route = useRoute();
    const { state,dispatch,getTotalPrice } = useContext(CartContext);
    const customerContext = useContext(CustomerContext) 
    const [ isLoading,setLoading ] = useState(false);
    
    const customerInfo = customerContext.state.address.find(item => item.select === true)

    const orderHandler = () => {
        setLoading(!isLoading)
        var brands = [];
        var products = [];
        // find all brand in cart
        if (state.item.lenght != 0) {      
            state.item.map(item => {
                const index = brands.findIndex(id => id === item.product._id);
                if (index === -1) {
                    brands.push(item.product.brandId)            
                }
            })         
        }    
        // find all product each brand    
        brands.map(async id => {
            let data = route.params
            data = {
                recipientName : customerInfo.customer.name,
                phoneNumber : customerInfo.customer.phone,
                address : customerInfo.address,
                paymentId : isSelected,
            }

            const orderId = await createOrder(data,id);
            const item = state.item.filter(item => item.product.brandId === id) 
            
            item.map(product => {
                const quantity = product.quantity;
                const productId = product.product._id;    
                products.push(productId)       
                createOrderDetail(productId,quantity,orderId)
            })
            dispatch({ type: "DELETE_ITEM", item: {item : products} })
        })
        
        setTimeout(() => {
            navigation.navigate("History");
        }, 1500);
    }


    const createOrder = async (data,brandId) => {
        let id = null;
        const order = {
            ...data,
            status : 'RECEIVED',
            brandId : brandId,
        }
        let errorMsg = "";
        try {
            const response = await orderApi.createOrder(order).then(res => {
                id = res.data.order._id;
            })
          } catch (err) {     
            if (err.response.data.errorParams.recipientName) {
              errorMsg = errorMsg.concat(
                `\n` + err.response.data.errorParams.recipientName
              );
            }
      
            if (err.response.data.errorParams.address) {
              errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.address);
            }
      
            if (err.response.data.errorParams.paymentId) {
              errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.paymentId);
            }
      
            if (err.response.data.errorParams.phoneNumber) {
              errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.phoneNumber);
            }
          }
          if (errorMsg) {
            Alert.alert("Failed", errorMsg);
          }
          return id;
    }

    const createOrderDetail = async (productId,quantity,orderId) => {
        let errorMsg = "";
        try {
            const response = await orderApi.createOrderDetail(productId,quantity,orderId)
          } catch (err) {   
            if (err.response.data.errorParams.productId) {
              errorMsg = errorMsg.concat(
                `\n` + err.response.data.errorParams.productId
              );
            }
      
            if (err.response.data.errorParams.quantity) {
              errorMsg = errorMsg.concat(`\n` + err.response.data.errorParams.quantity);
            }
          }

          if (errorMsg) {
            Alert.alert("Failed", errorMsg);
          } else {
            Alert.alert(            
                "Order Successfully",
            );
          }
          setLoading(isLoading)
    }


    useEffect(() => {
        setLoading(!isLoading)
        paymentApi
            .getAll()
            .then((res) => {
                setPayments(res.data.payments)
                setLoading(isLoading)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
        <View style={{backgroundColor: 'white',height:'100%'}}>
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
                text: "Order",
                style: { fontSize: 20, color: "black", fontWeight: "bold" },
                }}
            />
            <LoadingSpinner isLoading={isLoading}/>
            <Text style={{
                fontSize : 20,
                fontWeight : 'bold',
                padding : 5,
            }}>Select your payment method :</Text>
            <View>
                <FlatList 
                    data={payments}
                    extraData={isSelected}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=> <PaymentComponent    data={item} 
                                                                isSelected={isSelected}
                                                                changeSelect={id => setSelect(id)}/>}
                    keyExtractor={(item) => item._id}
                />
            </View>
            <View style={styles.blockBottom}>
                <Text style = {{fontSize:22, fontWeight:'bold'}}>Total : {getTotalPrice()}</Text>
                <View>
                    <Button
                        onPress={() => {
                            if (isSelected !== null) {
                                orderHandler()
                            } else Alert.alert('Please select your payment method !!!')        
                        }}
                        icon={{
                        type: "font-awesome-5",
                        name: "shopping-cart",
                        size: 15,
                        color: "black",
                        }}
                        buttonStyle={{
                        backgroundColor: "white",
                        }}
                        containerStyle={{
                        marginTop: 20,
                        borderWidth: 1,
                        borderColor: "black",
                        }}
                        titleStyle={{
                        color: "black",
                        }}
                        title={"Purchase"}
                    />
                </View>
            </View>         
        </View>
    )
}

const styles = StyleSheet.create({
    blockBottom : {
        backgroundColor : 'white',
        padding : 10,
    }
})
