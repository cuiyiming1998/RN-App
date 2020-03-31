import React, {Component} from 'react';
import {Router,View, Text, Image, TextInput, AsyncStorage, TouchableOpacity, BackHandler, ToastAndroid, Alert} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'
import Home from '../home/Home'
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            now:0,
            username:'',
            pwd:'',
            isloading:false
        }
    }
    
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    login = ()=>{
        this.setState({isloading:true})
        if(this.state.username.length < 3 || this.state.username.length > 12){
          Alert.alert('格式不正确')
        }
        if(this.state.pwd.length < 3 || this.state.pwd.length > 12){
          Alert.alert('格式不正确')
        }else{
          myFetch.post('/api/login',{
              username:this.state.username,
              pwd:this.state.pwd}
          )
          .then(res=>{
            // 用户名111111
            if(res.data.token == 1){
              AsyncStorage.setItem('user',JSON.stringify(res.data))
              .then(()=>{
                console.log(this.state.username)
                this.setState({isloading:false})
                Actions.reset('lightbox');
              })
            }else{
              Alert.alert('用户名或密码不正确');
              this.state.isloading = !this.state.isloading;
            }
          })
        }
    } 
    componentWillMount(){
      BackHandler.addEventListener('hardwareBackPress', this.backAndroidHandler);
    }
    backAndroidHandler=()=>{
      if(Actions.currentScene != 'login'){
        Actions.pop();
        return true;
      }else{
        if(new Date().getTime()-this.state.now<2000){
          BackHandler.exitApp();
        }else{
          ToastAndroid.show('确定要退出吗',100);
          this.setState({now:new Date().getTime()})
          return true;
        }
      }
    }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="用户名" 
                onChangeText={this.userhandle}
                />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="密码" 
                secureTextEntry={true}
                />
          </View>
            <TouchableOpacity 
                style={{
                  width: '80%',
                  height: 40,
                  backgroundColor: '#ccc',
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={this.login}>
                {
            this.state.isloading
            ?<View><Text style={{color:'gray'}}>登录中</Text></View>
            :<Text>登录</Text>
          }
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
