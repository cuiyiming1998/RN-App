import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text, Image, 
	BackHandler,ToastAndroid,AsyncStorage
} from 'react-native';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/home/Home';
import Goods from './src/goods/Goods';
import Login from './src/common/Login'
import Message from './src/message/Message';
import SwiperPage from './src/common/SwiperPage';
import Userinfor from './src/Userinfo/Userinfo'


console.disableYellowBox = true;

const App = () => {
	let [isLogin,setLogin] = useState(false);
	let [isInstall,setInstall] = useState(true);
	let now = 0;
	let init = ()=>{
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			console.log('isinstall',res)
			if(res){
				setInstall(false);
			}
		})
		AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			console.log(user)
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();
			}
		})
	}
	useEffect(()=>{
		init();
	},[])
	let afterInstall = ()=>{
		console.log('after install')
		setInstall(false)
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}

	return (
		<Router
			backAndroidHandler={()=>{
				if(Actions.currentScene != 'home'){
					Actions.pop();
					return true;
				}else{
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}
				
			}}
		>
			<Overlay>
			<Modal key="modal" hideNavBar>
				<Lightbox key="lightbox">
					<Drawer 
						key="drawer"
						contentComponent={()=><Text>drawer</Text>}
						drawerIcon={()=><Icon name="menu"/>}
						drawerWidth={400}
					>
						<Scene key="root">
							<Tabs 
								key='tabbar'
								hideNavBar
								activeTintColor="red"
								inactiveTintColor="#409eff"
								tabBarStyle={{backgroundColor:'white'}}
							>
								{/* 首页 */}
								<Scene key='homePage'
									title='首页'
									hideNavBar
									icon={
										({focused})=><Icon 
											size={20}
											color={focused?'red':'#409eff'} 
											name="home"
										/>
									}
								>
									<Scene key='home' 
										component={Home}
									/>
								</Scene>
								{/* 商品分类 */}
								<Scene key='goodsPage'
									title='商品分类'
									hideNavBar
									icon={
										({focused})=><Icon 
											size={20}
											color={focused?'red':'#409eff'} 
											name="tags"
										/>
									}
									
								>
									<Scene key="goods" component={Goods}/>
								</Scene>
								{/* 信息 */}
								<Scene 
									key='msgPage'
									hideDrawerButton
									hideNavBar
									icon={({focused})=>
										<Icon 
											size={20}
											color={focused?'red':'#409eff'} 
											name='file'/>
										}
									title="信息"
									component={Message}
								/>
								<Scene 
									key='userPage'
									hideDrawerButton
									hideNavBar
									icon={({focused})=>
										<Icon 
											size={20}
											color={focused?'red':'#409eff'} 
											name='user'/>
										}
									title="用户中心"
									component={Userinfor}
								/>
								
							</Tabs>
						</Scene>
					</Drawer>
				</Lightbox>
				<Scene initial={!isLogin} key="login" component={Login} />
			</Modal>
			</Overlay>
		</Router>
	);
};

export default App;
