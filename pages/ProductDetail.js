import React, {useState, useRef} from 'react'
import { StyleSheet,
        Text, 
        View, 
        Image,
        TouchableOpacity,
        ScrollView, 
        Pressable, 
        FlatList,
        Button,
     } 
    from 'react-native'
import { Header } from 'react-native-elements'
import {FontAwesome5, SimpleLineIcons, Feather, AntDesign} from "@expo/vector-icons";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
  } from 'react-native-popup-menu';
import MyCarousel from '../component/MyCarousel';
import BlockCard from '../component/BlockCard';

const data = {};

function SeparateLine () {
    return(
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
        />
    )
}

function BlockDetail () {
    const [more,setMore] = useState(4);

    toggleNumOfLine = () => {
        if (more == 4) {
            setMore(0);
        } else setMore(4);
    }

    return(
        <ScrollView style={styles.blockDetailContainer}>
            <View style={styles.titleDetail}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Product Detail</Text>
                <View style={{marginLeft:20, flexDirection: 'row'}}>
                    <FontAwesome5 name="clock" size={20} color="black" />
                    <Text>
                        14 months
                    </Text>
                </View>         
            </View>
            <SeparateLine/>
            <View style={styles.titleDetail}>
                <View style={{flex:3}}>
                    <Text style={styles.textDetail}>Brand</Text>
                    <Text style={styles.textDetail}>Category</Text>
                    <Text style={styles.textDetail}>Quantity</Text>
                </View>
                <View style={{flex:7}}>
                    <Text style={styles.textInfoDetail}>Robo3T</Text>    
                    <Text style={styles.textInfoDetail}>Robo3T</Text>    
                    <Text style={styles.textInfoDetail}>Robo3T</Text>    
                </View>
            </View>     
            <SeparateLine />      
            <View>
                <Text style={styles.description} numberOfLines={more}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </View>
            <SeparateLine />
            <Pressable onPress={toggleNumOfLine}>
                <Text style={{color: 'red', textAlign:'center',padding: 5}}>View More</Text>
            </Pressable>
        </ScrollView>
    )
}

function BlockMoreProduct () {
    const data = [
        {
            id : 1,
            price: 200000,
            unitSold : 123,
        },
        {
            id : 2,
            price: 240000,
            unitSold: 200,
        },
        {
            id : 3,
            price: 240000,
            unitSold: 200,
        },
        {
            id : 4,
            price: 240000,
            unitSold: 200,
        },
    ];
    data.slice(0,2)
    return(
    <View style={styles.containerMoreProduct}>
        <View style={styles.titleDetail}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>More Product</Text>         
        </View>
        <SeparateLine/>
        <FlatList 
            style={{margin:5}}
            data={data}
            numColumns={2}   
            showsVerticalScrollIndicator={false} 
            keyExtractor={item => item.id}
            renderItem={({item}) => <BlockCard data={item}/>}
        />  
        <SeparateLine/>     
        <Pressable >
            <Text style={{color: 'red', textAlign:'center', padding: 5}}>View More</Text>
        </Pressable>
    </View>
    )}

function BlockLocalBrand() {
    return(
       <View style={styles.containerLocalBrand}>
           <View style={{flexDirection:'row', padding:10}}>
                <Image source={{uri : 'https://thumbs.dreamstime.com/z/shop-building-colorful-isolated-white-33822015.jpg'}} style={styles.shopImage}/>
                <View style={{marginLeft: 20}}>
                    <Text style={{fontSize:20}}>Shop cà chua</Text>
                    <Text>Hồ Chí Minh</Text>
                </View>  
                <View style={{height:50, left: 75}}>
                    <Button title={'Go Shop'}/>
                </View>               
           </View>
           <View style={{flexDirection:'row', justifyContent:'space-around', padding:5}}>
               <Text style={{fontSize:18,fontWeight:'bold'}}>Product</Text>
               <Text style={{fontSize:18,fontWeight:'bold'}}>Sales</Text>
               <Text style={{fontSize:18,fontWeight:'bold'}}>Rating</Text>
           </View>
           <View style={{flexDirection:'row', justifyContent:'space-around', padding:5, marginBottom:10}}>
               <Text style={{color: 'red'}}>123</Text>
               <Text style={{color: 'red'}}>20000</Text>
               <Text style={{color: 'red'}}>50</Text>
           </View>
       </View> 
    )
}

export default function ProductDetail() {
    const scroll = useRef()
    const [test,setTest] = useState("First")

    return (
        <MenuProvider>      
            <Header 
                placement="left"
                leftComponent={
                    <FontAwesome5
                                name={"arrow-left"}
                                size={25}
                                style={{width: 30}}
                                color={'white'}
                            />
                }
                centerComponent={{ 
                    text: 'MY TITLE', style: { color: '#fff' } 
                }}
                rightComponent={
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginRight: 15}}>
                            <FontAwesome5 name="share-alt" size={25} color="white" />
                        </View>
                        <View style={{marginRight: 15}}>
                            <FontAwesome5 name="shopping-cart" size={25} color="white" /> 
                        </View>                             
                        <Menu>
                            <MenuTrigger  children={<SimpleLineIcons name="options-vertical" size={25} color="white" />} />
                            <MenuOptions>
                                <MenuOption onSelect={() => alert(`Go Home`)}> 
                                    <View style={styles.menuOptions}>
                                        <FontAwesome5 name="home" size={24} color="black" />
                                        <Text style={styles.textOption}>
                                            {test}
                                        </Text>
                                    </View>                                    
                                </MenuOption>
                                <MenuOption onSelect={() => alert(`Report this product`)} >
                                    <View style={styles.menuOptions}>
                                        <SimpleLineIcons name="exclamation" size={24} color="black" />
                                        <Text style={styles.textOption}>
                                            Report this product
                                        </Text>
                                    </View>    
                                </MenuOption>
                                <MenuOption onSelect={() => alert(`Need Help?`)} >
                                    <View style={styles.menuOptions}>
                                        <Feather name="help-circle" size={24} color="black" />
                                        <Text style={styles.textOption}>
                                            Need Help?
                                        </Text>
                                    </View>                     
                                </MenuOption>
                            </MenuOptions>
                            </Menu>                  
                    </View>               
                }
            />
            <ScrollView ref={scroll}>
                <MyCarousel data={data} changeTest={test => {setTest(test);console.log(test);}}/>
                <BlockLocalBrand />
                <BlockDetail />
                {/* <BlockMoreProduct /> */}
                             
            </ScrollView>
            <View style={styles.iconToTop}>
                <AntDesign name="totop"  size={30} color="red" onPress={() => {
                    scroll.current?.scrollTo({
                        y: 0,
                        animated: true,
                })}} />
             </View>  
            <View style={{backgroundColor:'white', borderWidth: 1,flexDirection:'row', padding: 10, justifyContent:'space-evenly'}}>
                <Button title={'chat'}/>
                <View style={{width: 300}}>
                    <Button style={styles.purchaseButton} color={'red'} title={'Purchase now'}/>   
                </View>
            </View>
       
        </MenuProvider>
    )
}

const styles = StyleSheet.create({
    menuOptions: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        padding: 10,
    },
    textOption: {
        marginLeft: 10,
        color: 'black',
    },
    blockDetailContainer: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    titleDetail: {
        flexDirection: 'row',
        padding: 10,
    },
    textDetail: {
        padding: 5,
        fontSize: 15,
    },
    textInfoDetail: {
        padding: 5,
        fontSize: 15,
        marginLeft: 10,
    },
    description: {
        padding: 10,
        fontSize: 15,
    },
    containerMoreProduct: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
    },
    purchaseButton : {
        position: 'absolute',
        bottom:0,
        left:0,
    },
    containerLocalBrand : {
        backgroundColor: 'white',
        marginTop: 10,
        flex: 1,
    },
    shopImage: {
        height: 65,
        width: 65,
        borderRadius: 30,
        borderWidth:1,
        borderColor: 'black',
    },
    iconToTop : {
        width:40,
        height:40,
        borderRadius:20,
        backgroundColor:'white',        
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        bottom:70,
        right:20,
    }
})
