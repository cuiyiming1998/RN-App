import React, { Component } from 'react'
import { View, Button ,ScrollView, ToastAndroid, Text, FlatList, Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
const {width} = Dimensions.get('window')

class list extends Component {
    constructor(){
        super();
        this.state = ({
            txtColor: [],
            data: [],
            num: 1,
            rowData:[]
        })
    }

    // 点击下一页
    gotoNext = ()=>{
        if(this.state.num >= 0){
            this.setState({
                num:this.state.num+1
            })
        }
    }
    // 点击上一页
    gotoPre = ()=>{
        if(this.state.num > 1){
            this.setState({
                num:this.state.num-1
            })
        }else{
            ToastAndroid.show('当前已经是第一页',ToastAndroid.SHORT);
        }
    }

    // 请求数据，对请求的数据进行字符处理
    componentDidUpdate(){
        let pageNum = this.state.num;
        fetch('https://cnodejs.org/api/v1/topics?limit=14&page='+pageNum).then((res)=>res.json())
        .then((res)=>{
            res.data.forEach((item)=>{
                this.setState.length({rowData: res.data});
                if(item.title.length>15){
                    item.title = item.title.substr(0,15) + '...'
                }
            })
            this.setState({data: res.data});
        })
    }
    componentDidMount(){
        let pageNum = this.state.num;
        fetch('https://cnodejs.org/api/v1/topics?limit=14&page='+pageNum).then((res)=>res.json())
        .then((res)=>{
            res.data.forEach((item)=>{
                if(item.title.length>15){
                    item.title = item.title.substr(0,15) + '...'
                }
            })
            this.setState({data: res.data});
        })
    }

    render () {
        return (
            <View>
                <View style={styles.main}>
                    <View style={styles.nav}>
                        <View style={{width: width*0.2,marginLeft:20}}>
                        </View>
                        <Icon name="arrow-left" color="white" onPress={()=>{Actions.pop()}}/>
                        <View style={{width:width*0.8,marginLeft: 140}}>
                        <Text style={{color: 'white',fontSize: 18}}>我的发布</Text>
                        </View>
                    </View>
                    <FlatList 
                        data = {this.state.data}
                        renderItem = {
                            ({item,index})=>
                            <View style={styles.content}>
                                <Text style={{width:width*0.6}}>{item.title}</Text>
                                <Text>{item.create_at.substr(0,10)}</Text>
                                <View>{Math.floor((Math.random()*10))%2 == 0?<Text>已回复</Text>:<Text style={{color:'red'}}>待回复</Text>}</View>
                            </View>
                        }
                    />
                    <View style={styles.btns}>
                        <View style={styles.btn}>
                            <Button onPress={()=>this.gotoPre()} title="上一页" color="red"></Button>
                        </View>
                        <Text>第{this.state.num}页</Text>
                        <View style={styles.btn}>
                            <Button onPress={()=>this.gotoNext()} style={styles.btn1}title="下一页" color="red"></Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default list;

const styles = StyleSheet.create({
    main:{
        fontSize: 15,
        backgroundColor: 'white'
    },
    nav:{
        height: 50,
        width: width,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
    content:{
        flexDirection: 'row',
        height: 40,
        width: width,
        justifyContent: 'space-around'
    },
    btns:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 'auto'
    },
    btn:{
        width: 180,
        height: 60
    }

})