import React from "react";
import { View,
        StyleSheet,
        Text,
        }from "react-native";
import { Header,Avatar,ListItem } from "react-native-elements";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { JWT_TOKEN, JWT_TOKEN_KEY, resetJWTToken } from "../constants";

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

  const logout = async () => {
    await SecureStore.deleteItemAsync(JWT_TOKEN_KEY);
    navigation.navigate('Login');
  }

  const optionHadleClick = (item) => {
    item.option === 'Logout' ? logout() : navigation.navigate(item.screen)
  }

  return(
      <View style={{flex:1}}>
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
                  text: 'Profile', style: {fontSize: 20, color: '#fff' } 
              }} 
              rightComponent={
              <MaterialIcons 
                        onPress={logout}
                        name="logout" 
                        size={24} 
                        color="white" />
              }
          />
          <View style={{flex:1}}>
              <View style={styles.infoContainer}>
                  <View style={{flexDirection:'row'}}>
                      <Avatar 
                          rounded
                          size={70}
                          source={{uri : 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}}
                      />
                      <Text style={styles.name} >Nguyen Van B</Text>
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
})
