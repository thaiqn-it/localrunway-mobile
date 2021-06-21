import React from 'react'
import { StyleSheet,
        Text,
        View 
} from 'react-native'
import { Header,ListItem,Avatar } from 'react-native-elements'
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { vndFormat } from "../utils";

const DATA = [
    {
        image : 'https://cf.shopee.vn/file/a61450378a8d324716b87ac3989b12ab',
        name : 'Jogger',
        price : '250000',
    },
    {
        image : 'https://cf.shopee.vn/file/a61450378a8d324716b87ac3989b12ab',
        name : 'Jogger',
        price : '250000',
    },
    {
        image : 'https://cf.shopee.vn/file/a61450378a8d324716b87ac3989b12ab',
        name : 'Jogger',
        price : '250000',
    },
]

export default function HistoryOrders() {
    const navigation = useNavigation();
    return (
        <View>
            <Header 
              leftComponent={
              <FontAwesome5
                          onPress={ () => { navigation.goBack() } }
                          name={"arrow-left"}
                          size={25}
                          style={{width: 30}}
                          color={'white'}
                      />
              }
              centerComponent={{ 
                  text: 'History order', style: {fontSize: 20, color: '#fff' } 
              }} 
              rightComponent={
                <FontAwesome5 onPress={() => navigation.navigate("Cart")} name="shopping-cart" size={25} color="white" /> 
              }
             />
            <View>
            {                
                DATA.map((item,i) => (
                <ListItem
                        key={i} 
                        bottomDivider>
                        <Avatar
                            source={{
                            uri: item.image,
                            }}
                            containerStyle={{
                            width: 100,
                            height: 100,
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
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
                                    Size:{" "}
                                    <Text
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                    >
                                    {item.size}
                                    </Text>
                                </Text>
                                <View
                                    style={{
                                    backgroundColor: 'red',
                                    width: 20,
                                    height: 20,
                                    borderRadius: 50,
                                    }}
                                />
                                </View>

                                <ListItem.Title
                                style={{
                                    fontWeight: "bold",
                                    marginTop: 20,
                                }}
                                >
                                {vndFormat(item.price)}
                                </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
