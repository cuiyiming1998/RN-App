import React, { Component } from 'react'
import { Animated,Easing, TextInput, TouchableOpacity, View, ActivityIndicator, Text, FlatList, Dimensions ,ScrollView, StyleSheet, Image} from 'react-native';
import Button from 'react-native-button';
import { MessageBarManager } from 'react-native-message-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions, Tabs} from 'react-native-router-flux';

const {width} = Dimensions.get('window')

export default class Homework extends Component {

    constructor(){
        super();
        let data = [];
        for(var i=0; i<4; i++){
            data.push({tit:i,key:i});
        }
        this.state = {
            data
        }
    }

  render() {
    return (
      <View style={styles.main}>
          <View style={{backgroundColor:'white'}}>
			<View style={{flexDirection:'row',height:40,justifyContent:"center",marginTop:10}}>
				<View style={styles.search}>
				<TextInput placeholder='请输入商品名称'/>
				</View>
          </View>
            <ScrollView
                horizontal={true} 
                pagingEnabled={true} 
                horizontal={true}
                    style={styles.topNav} 
                    >
                    <View style={styles.slide}>
                        <Text style={{color:'red'}}>综合</Text>
                    </View>
                    <View style={styles.slide}>
                        <Text>销量</Text>
                    </View>
                    <View style={styles.slide}>
                        <Text>新品</Text>
                    </View>
                    <View style={styles.slide}>
                        <Text>价格</Text>
                    </View>
                    <View style={styles.slide}>
                        <Text>信用</Text>
                    </View>
            </ScrollView>
            </View>

            <FlatList 
                    style={styles.main}
                    data={this.state.data}
                    renderItem={
                        ({item})=>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.goods}>
                            <Image source={require('../../assets/shanghaojia.jpg')} style={styles.imgStyle}/>
                            <Text style={styles.text}>Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳</Text>
                            <Text style={{color:'red',paddingLeft:10}}>36.00</Text>
                            </View>
                            <View style={styles.goods}>
                            <Image source={require('../../assets/shupian.jpg')} style={styles.imgStyle}/>
                            <Text style={styles.text}>Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳</Text>
                            <Text style={{color:'red',paddingLeft:10}}>36.00</Text>
                            </View>
                        </View>
                    }
                    />
      </View>
    );
  }
}

const styles = StyleSheet.create({

    main:{
        backgroundColor:'#f5f5f5',
    },
    search:{
        width:'80%',
        paddingLeft:20,
		backgroundColor:'#f1f1f1',
		flexDirection:'row',
		alignItems:'center',
        borderRadius:2,
    },
    topNav:{
        width: width,
        height: 40,
        marginTop:10,
        backgroundColor: '#ccc',
    },
    btn:{
        width: 200,
        height: 40,
        color: '#fff',
        textAlignVertical: 'center',
        borderRadius: 20,
        backgroundColor: 'red'
    },
    slide:{
        width: width*0.2,
        height: 40,
        borderStyle: "solid",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#ccc',
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    goods:{
        width:width*0.47,
        marginLeft:width*0.02,
        marginTop:10,
        height:230,
        backgroundColor:'white',
        justifyContent:'center',
    },
    imgStyle:{
        width: width*0.47,
        height:110,
        resizeMode:'contain',
        marginBottom:30,
        marginTop:20
    },
    text:{
        fontSize:12,
        paddingLeft:10,
        paddingRight: 10,
        marginBottom:3
    }
})
