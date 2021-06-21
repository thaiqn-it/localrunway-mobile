import React, {useState, useRef,useEffect} from 'react'
import { StyleSheet,
        Text, 
        View, 
        Image,
        ScrollView, 
        Pressable, 
        FlatList,
        Button,
     } 
    from 'react-native'
import { Header } from 'react-native-elements'
import { useRoute } from '@react-navigation/native';
import {FontAwesome5, SimpleLineIcons, Feather, AntDesign} from "@expo/vector-icons";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
  } from 'react-native-popup-menu';
import MyCarousel from '../components/MyCarousel';
import BlockCard from '../components/BlockCard';
import { productApi } from '../api/product';
import { localBrandApi } from '../api/localbrand';
import { categoryApi } from '../api/category';
import { useNavigation } from "@react-navigation/native";
import { CartContext } from '../context/Cart';

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

function BlockDetail ({data}) {
    const [more,setMore] = useState(4);    
    const [localBrand,setLocalBrand] = useState([]);
    const [category,setCategory] = useState([]);

    useEffect(() => {
        if (data.brandId != null){
            localBrandApi.getOneById(data.brandId)
                .then((res) => {
                    setLocalBrand(res.data.localBrand)
                }).catch(err => {
                    console.log(err)
                }) 
        }
    },[data])

    useEffect(() => {
        if (data.brandId != null){
            categoryApi.getOneById(data.categoryId)
                .then((res) => {
                    setCategory(res.data.category)
                }).catch(err => {
                    console.log(err)
                }) 
        }
    },[data])


    const toggleNumOfLine = () => {
        if (more == 4) {
            setMore(0);
        } else setMore(4);
    }

    return(
        <ScrollView style={styles.blockDetailContainer}>
            <View style={styles.titleDetail}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Product Detail</Text>      
            </View>
            <SeparateLine/>
            <View style={styles.titleDetail}>
                <View style={{flex:3}}>
                    <Text style={styles.textDetail}>Brand</Text>
                    <Text style={styles.textDetail}>Category</Text>
                    <Text style={styles.textDetail}>Quantity</Text>
                </View>
                <View style={{flex:7}}>
                    <Text style={styles.textInfoDetail}>{localBrand.name}</Text>    
                    <Text style={styles.textInfoDetail}>{category.name}</Text>    
                    <Text style={styles.textInfoDetail}>{data.quantity}</Text>    
                </View>
            </View>     
            <SeparateLine />      
            <View>
                <Text style={styles.description} numberOfLines={more}>
                {data.description}
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

function BlockLocalBrand({data}) {
    const [localBrand,setLocalBrand] = useState([]);
    useEffect(() => {
        if (data.brandId != null){
            localBrandApi.getOneById(data.brandId)
                .then((res) => {
                    setLocalBrand(res.data.localBrand)
                }).catch(err => {
                    console.log(err)
                }) 
        }
    },[data])
    return(
       <View style={styles.containerLocalBrand}>
           <View style={{flexDirection:'row', padding:10}}>
                <Image source={{uri : 'https://cdn2.iconfinder.com/data/icons/online-shopping-flat-round/550/store-512.png'}} style={styles.shopImage}/>
                <View style={{marginLeft: 20}}>
                    <Text style={{fontSize:20}}>{localBrand.name}</Text>
                    <Text>{localBrand.address}</Text>
                </View>               
           </View>
       </View> 
    )
}

export default function Product() {
    const route = useRoute();
    const scroll = useRef()
    const [test,setTest] = useState("First")
    const [product,setProduct] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        productApi.getOneById(route.params)
                    .then((res) => {
                         setProduct(res.data.product);
                      }).catch(err => {
                        console.log(err)
                      })            
    }, [])

    return (      
        <MenuProvider>      
            <Header 
                placement="left"
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
                    text: product.name, style: {fontSize: 20, color: '#fff' } 
                }}
                rightComponent={
                    <View style={{flexDirection:'row'}}>                   
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
                <MyCarousel data={product} changeTest={test => {setTest(test);console.log(test);}}/>
                <BlockLocalBrand data={product} />
                <BlockDetail data={product} />
                {/* <BlockMoreProduct /> */}
                             
            </ScrollView>
            <View style={styles.iconToTop}>
                <AntDesign name="totop"  size={30} color="red" onPress={() => {
                    scroll.current?.scrollTo({
                        y: 0,
                        animated: true,
                })}} />
             </View>  
            <View style={{backgroundColor:'white', borderWidth: 1,padding:10}}>
                <View style={{width: 300,alignSelf:'center'}}>
                    <CartContext.Consumer> 
                        {({dispatch}) => (
                            <Button style={styles.purchaseButton} 
                                    color={'red'}
                                    title={'Add To Cart'}
                                    onPress={()=>dispatch({type:'INCREASE',
                                                            item:{
                                                                product : product,
                                                                quantity: 1,
                                                            }})}/>                             
                        )}                                  
                    </CartContext.Consumer>
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
