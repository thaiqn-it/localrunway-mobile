import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Rating } from 'react-native-elements';

export default function BlockCard({data}) {
    const [rating,setRating] = useState(4);
    const { price,unitSold } = data;
    return (
        <TouchableOpacity style={{flex: 1}}>
            <View style={{margin : 2, borderWidth:1, borderRadius: 2}}>
                <Image style={styles.image} source={{uri : 'https://www.kvbro.com/wp-content/uploads/2020/11/quan-ao-giay-dep.jpg'}}/>
                <Text numberOfLines={2} style={styles.title}>
                    Áo khoác jean nữ TH Store phối nón Daniel, áo khoác bò cá tính phong cách ulzzang chống 
                </Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.price}>
                        {price}
                    </Text>
                    <Text style={styles.soldText}>Sold: {unitSold}</Text>
                </View>   
                <View style={styles.rating}>
                    <Rating
                    readonly
                    count={5}
                    defaultRating={4}
                    startingValue={4}
                    imageSize={15}
                    fractions={1}
                    onFinishRating={rating => setRating(rating)}
                    />
                    <Text style={styles.ratingTitle}>{rating}</Text>          
                </View>  
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        padding : 10,
    },
    price: {
        color: 'red',
        fontSize: 13,
        marginLeft: 16,
    },
    rating:{
        paddingLeft: 10,
        padding:5,
        flexDirection:'row',
        alignItems:'center'
    },
    ratingTitle : {
        fontSize: 15,
        marginLeft:10
    },
    soldText: {
        marginLeft: 10,
        fontSize: 13,
        alignSelf:'center',
    },
    image: {
        width: '100%',
        height: 150,
    }
})
