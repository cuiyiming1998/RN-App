import React, { Component } from 'react'
import { View, Button ,ScrollView, ToastAndroid, Text, FlatList, Dimensions, StyleSheet } from 'react-native'

const {width} = Dimensions.get('window')

class list extends Component {
    constructor(){
        super();
        this.state = ({
            data: [],
            num: 1
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
                        <Text style={{color: 'white',fontSize: 18}}>我的发布</Text>
                    </View>
                    <FlatList 
                        data = {this.state.data}
                        renderItem = {
                            ({item})=>
                            <View style={styles.content}>
                                <Text style={{width:width*0.6}}>{item.title}</Text>
                                <Text>{item.create_at.substr(0,10)}</Text>
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
        fontSize: 15
    },
    nav:{
        height: 50,
        width: width,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
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