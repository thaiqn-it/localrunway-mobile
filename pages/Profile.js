import React, { useContext } from "react";
import { View,
        StyleSheet,
        Text,
        Pressable,
        TouchableOpacity,
        }from "react-native";
import { Header,Avatar,ListItem } from "react-native-elements";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { JWT_TOKEN, JWT_TOKEN_KEY, resetJWTToken } from "../constants";
import { CustomerContext } from "../context/Customer";
import { CartContext } from "../context/Cart";

const OPTIONS = [
  {
    option : 'History Order',
    icon : 'history',
    screen: 'History',
  },
  {
    option : 'Logout',
    icon : 'logout',
  }
]

export default function Profile() {
  const navigation = useNavigation();
  const { customer } = useContext(CustomerContext)
  const { state,dispatch } = useContext(CartContext)

  const logout = async () => {
    await SecureStore.deleteItemAsync(JWT_TOKEN_KEY);
    dispatch({ type: "DELETE_ITEM", item: state })
    navigation.navigate('Login');
  }

  const optionHadleClick = (item) => {
    item.option === 'Logout' ? logout() : navigation.navigate(item.screen)
  }
 
  return(
      <View style={{flex:1}}>
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
                text: "Profile",
                style: { fontSize: 20, color: "black", fontWeight: "bold" },
              }}
              rightComponent={
              <MaterialIcons 
                        onPress={logout}
                        name="logout" 
                        size={24} 
                        color="black" />
              }
          />
          <View style={{flex:1}}>
              <View style={styles.infoContainer}>
                  <View style={{flexDirection:'row'}}>
                      {
                        !customer.profileUrl
                        ?
                        (
                          <Avatar 
                              rounded
                              size={70}
                              source={{uri : 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}}
                          />
                        )
                        :
                        (
                          <Avatar 
                              containerStyle={[{borderWidth : 1},styles.image]}
                              rounded
                              size={70}
                              source={{uri : customer.profileUrl}}
                          />
                        )
                      }
                      
                      <View>
                        <Text style={styles.name}>{customer.name}</Text>
                        <Pressable onPress={() => navigation.navigate("Customer")}>
                          <Text style={{color : '#2196F3',marginLeft :20}}>Change information</Text>
                        </Pressable>
                      </View>    
                  </View>
              </View>
              <View style={styles.optionContainer}>
                {                
                  OPTIONS.map((item,i) => (
                    <ListItem
                          onPress={() => optionHadleClick(item)}
                          key={i} 
                          bottomDivider>
                          <MaterialIcons name={item.icon} size={24} color="black" />
                          <ListItem.Content>
                              <ListItem.Title>{item.option}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                    </ListItem>
                  ))
                }
              </View>
          </View>
       </View>
  )
}

const styles = StyleSheet.create({
    infoContainer : {
       height:90,
       backgroundColor:'white',
       justifyContent:"center",
       paddingLeft:30,
    },
    optionContainer: {
      backgroundColor:'white',
      marginTop:10,
      height:'100%',
    },
    name : {
      fontSize:20,
      marginLeft:20,
    },
    image : {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10.5,

      elevation: 5,
    }
})
