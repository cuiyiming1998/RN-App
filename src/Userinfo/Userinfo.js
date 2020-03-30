import React, { Component } from 'react'
import { Animated,Easing, TextInput, TouchableOpacity, View, ActivityIndicator, Text, FlatList, Dimensions ,ScrollView, StyleSheet, Image} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements'


const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export default class Doc extends Component {

    constructor(){
        super();
        let msg1 = [
            '账户管理',
            '收货地址',
            '我的信息',
            '我的订单',
            '我的二维码',
            '我的积分',
            '我的收藏'
        ]
        let msg2 = [
            '居家维修保养',
            '出行接送',
            '我的受赠人',
            '我的住宿优惠',
            '我的活动',
            '我的发布'
        ]
        let msg1Icon = [
            'bars',
            'home',
            'user',
            'file',
            'barcode',
            'tags',
            'star'
        ]
        let msg2Icon = [
            'bell',
            'home',
            'user',
            'file',
            'barcode',
            'heart'
        ]
        let data1 = [];
        let data2 = []
        for(var i=0;i<7;i++){
            data1.push({tit:msg1[i],icon:msg1Icon[i]})
        }
        for(var i=0;i<6;i++){
            data2.push({tit:msg2[i],icon:msg2Icon[i]})
        }
        this.state = {
            data1,
            data2
        }
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.top}>
                    <Avatar
                        size="xlarge"
                        rounded
                        source={require('../../assets/ava.jpg')}
                    />
                    <Text style={styles.name}>BINNU DHILLON</Text>
                </View>
                <View style={styles.my}>
                        <Icon name="android" size={30} color="gray" style={{marginLeft:20}} />
                        <Text style={styles.myText}>我的个人中心</Text>
                </View>
                <FlatList 
                    style={styles.icon}
                    data={this.state.data1}
                    numColumns={3}
                    renderItem = {
                        ({item})=>
                        <View style={styles.icons}>
                            <Icon name={item.icon} size={30} color="gray" />
                            <Text style={{marginTop: 10,color:'gray'}}>
                                {item.tit}
                            </Text>
                        </View>
                    }
                />
                <View style={styles.my}>
                        <Icon name="tags" size={30} color="gray" style={{marginLeft:20}} />
                        <Text style={styles.myText}>E族活动</Text>
                </View>
                <FlatList 
                    style={styles.icon}
                    data={this.state.data2}
                    numColumns={3}
                    renderItem = {
                        ({item})=>
                        <View style={styles.icons}>
                            <Icon name={item.icon} size={30} color="gray" />
                            <Text style={{marginTop: 10,color:'gray'}}>
                                {item.tit}
                            </Text>
                        </View>
                    }
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    top: {
        height: height*0.4,
        width: width,
        backgroundColor: '#ff3030',
        alignItems:'center',
        justifyContent:'center'
    },
    name: {
        marginTop: 20,
        color: 'white',
        fontSize: 18
    },
    my: {
        width: width,
        height:45,
        borderWidth: 0.3,
        borderColor: 'white',
        borderBottomColor: 'gray',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    myText: {
        color: "gray",
        marginLeft: 10
    },
    icon: {
        width: width,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row'
    },
    icons: {
        width: width/3,
        height: width/3,
        justifyContent:'center',
        alignItems:'center',
    }
})