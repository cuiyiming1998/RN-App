import React, { Component } from 'react'
import { Animated,Easing, TextInput, TouchableOpacity, View, ActivityIndicator, Text, FlatList, Dimensions ,ScrollView, StyleSheet, Image} from 'react-native';
import Button from 'react-native-button';
import { MessageBarManager } from 'react-native-message-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions, Tabs} from 'react-native-router-flux';
import Swiper from 'react-native-swiper'
import Message from '../message/Message';


const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export default class Homework extends Component {

    constructor(){
        super();
        let data = [1];

        this.state = {
            data
        }
    }

  render() {
    return (
      <ScrollView style={styles.main}>
        <View style={{backgroundColor:'#ff3030',height:60}}>
			<View style={{flexDirection:'row',height:40,justifyContent:"center",marginTop:10}}>
				<View style={styles.search}>
				<TextInput placeholder='请输入您要搜索的关键字'/>
				</View>
                <Image 
                    source={require('../../assets/cart.png')} 
                    style={styles.cart}
                />
            </View>
        </View>
        <View style={{height:200}}>
            <Swiper
                removeClippedSubviews={false}
                style={styles.wraper}
                >
                        <Image source={require('../../assets/xinkezhuanxiang.png')} style={styles.img} />
                        <Image source={require('../../assets/xinkezhuanxiang.png')} style={styles.img} />
                        <Image source={require('../../assets/xinkezhuanxiang.png')} style={styles.img} />
            </Swiper>
        </View>
        <FlatList 
            data={this.state.data}
            renderItem={
                ({item})=>  <View>
                                <View style={styles.table} >
                                    <Text style={{height:85,marginLeft:20,fontSize:15}}>
                                    <Image 
                                       
                                        style={{height:50,width:50}}
                                        source = {require('../../assets/avator.png')}
                                    />
                                            
                                        <Text  onPress={()=>Actions.message()}>居家维修保养</Text>
                                    </Text>
                                </View>
                                <View style={styles.table} >
                                    <Text onPress={()=>Actions.message()} style={{height:85,marginLeft:20,fontSize:15}}>
                                    <Image 
                                        style={{height:50,width:50}}
                                        source = {require('../../assets/avator.png')}
                                    />
                                        住宿优惠
                                    </Text>
                                </View>
                                <View style={styles.table} >
                                    <Text onPress={()=>Actions.message()} style={{height:85,marginLeft:20,fontSize:15}}>
                                    <Image 
                                        style={{height:50,width:50}}
                                        source = {require('../../assets/avator.png')}
                                    />
                                        出行接送
                                    </Text>
                                </View>
                                <View style={styles.table} >
                                    <Text onPress={()=>Actions.message()} style={{height:85,marginLeft:20,fontSize:15}}>
                                    <Image 
                                        style={{height:50,width:50}}
                                        source = {require('../../assets/avator.png')}
                                    />
                                        E族活动
                                    </Text>
                                </View>
                            </View>
            }
        />
        <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
            <Button style={styles.btn}> 发布需求 </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

    main:{
        backgroundColor:'#f5f5f5',
        height:height
    },
    search:{
        width:'80%',
        paddingLeft:20,
		backgroundColor:'#f1f1f1',
		flexDirection:'row',
		alignItems:'center',
        borderRadius:20,
    },
    cart:{
        height:40,
        width:40,
        marginLeft:10
    },
    wraper:{

    },
    topNav:{
        width: width,
        height: 40,
        marginTop:10,
        backgroundColor: '#ccc',
    },
    btn:{
        width: width*0.7,
        height: 40,
        color: '#fff',
        textAlignVertical: 'center',
        borderRadius: 10,
        backgroundColor: 'red'
    },
    text:{
        fontSize:12,
        paddingLeft:10,
        paddingRight: 10,
        marginBottom:3
    },
    table:{
        marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    img:{
        flex: 1,
        width: width,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    }
})