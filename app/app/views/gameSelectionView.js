import React, { useState, useEffect } from 'react';
import {
	Keyboard, Text, ScrollView, View, StyleSheet, Animated, Picker, Image, UIManager, Dimensions, Alert
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import sharedStyles from './Styles';
import { loginRequest as loginRequestAction } from '../actions/login';
import { STATUS_COLORS, themes } from '../constants/colors';
import { withTheme } from '../theme';
import { themedHeader } from '../utils/navigation';
import Separator from '../containers/Separator';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import Button from './OnboardingView/Button';
import PropTypes from 'prop-types';
import styles from './LotteryhallView/styles';
import MarqueeHorizontal from './LotteryhallView/marquee/MarqueeHorizontal';
import IconButton from '../lib/Button';
import RadioButton from '../containers/RadioButton';
import FoldView from 'react-native-foldview';
import I18n from '../i18n';

const list = [
	{ text: "彩票游戏", value: "0" },
	{ text: "电子游戏", value: "1" },
	{ text: "棋牌游戏", value: "2" },
	{ text: "体育竞技", value: "3" },
	{ text: "真人视讯", value: "4" },
];
const list_child = [
	{ text: "官方玩法", value: "0" },
	{ text: "传统玩法", value: "1" }
];
const {width, height, scale} = Dimensions.get('window');

const FadeInView = (props) => {
	const [fadeAnim] = useState(new Animated.Value(0))  // 透明度初始值设为0

	React.useEffect(() => {
		Animated.timing(                  // 随时间变化而执行动画
			fadeAnim,                       // 动画中的变量值
			{
				toValue: 1,                   // 透明度最终变为1，即完全不透明
				duration: 300,              // 让动画持续一段时间
				useNativeDriver: true
			}
		).start();                        // 开始执行动画
	}, [])

	return (
		<Animated.View                 // 使用专门的可动画化的View组件
			style={{
				...props.style,
				opacity: fadeAnim,
				transform: [ {scale: fadeAnim }],
			}}
		>
			{props.children}
		</Animated.View>
	);
}
class gameSelectionView extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => {
		const title = navigation.getParam('title', 'Rocket.Chat');
		return {
			title,
			...themedHeader(screenProps.theme)
		};
	}

	static propTypes = {
		navigation: PropTypes.object,
	}
	constructor(props) {
		super(props);
		const { navigation } = props;
		const { state } = navigation;
		this.state = {
			currentstate: state.params.key ? state.params.key:'0',
			currentChild: '0'
		};
		this.indxdata = [
			{
				key: 0,
				name:'开户姓名',
				value:false
			}, {
				key: 1,
				name:'银行卡号',
				value:false
			}, {
				key: 2,
				name:'确认卡号',
				value:true
			}
		];
		this.data = [
			{ text: "彩票游戏", value: "0", color: 'blue'	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false },
			{ text: "体育竞技", value: "1", color: 'purple'	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false },
			{ text: "电子游戏", value: "2", color: 'red' 	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false },
			{ text: "棋牌游戏", value: "3", color: 'green'	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false },
			{ text: "真人视讯", value: "4", color: 'blue'	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false }
		];
	}

	navigateToRoom = (room) => {
		const { navigation } = this.props;
		navigation.navigate(room.view,{title:room.viewname});
	}

	touchRadio = (indix) => {
		for (let i in this.indxdata){
			if (this.indxdata[i].value){
				this.indxdata[i].value = !this.indxdata[i].value;
			}
		}
		this.setState({ data:this.data,indxdata:this.indxdata});
	}

	render_Item = (  item ) => {
		const { num, name } = item;
		const { theme } = this.props;
		return (
			<FadeInView style={[{justifyContent: 'center', alignItems: 'center',width:'100%'}]}>
				<View style={[{width:'100%'}]}>
					<Button
						type='secondary'
						title={I18n.t('Join_the_community')}
						subtitle='183'
						icon={<Image source={{ uri: 'logo_onboarding' }} style={{ width: 32, height: 27 }} fadeDuration={0} />}
						onPress={()=>this.navigateToRoom({view:'gameView',viewname: item.name,gameType:item.value})}
						testID='join-community-button'
						theme={theme}
					/>
				</View>
			</FadeInView>
		);
	}

	renderItem = (  item ) => {
		const { num, name } = item;
		const { theme } = this.props;
		return (
			<FadeInView style={[{justifyContent: 'center', alignItems: 'center'}]}>
				<View  style={[{width:'100%'}]}>
					<Button
						title={I18n.t('Reset_password')}
						type='primary'
						onPress={()=>{
							for (let i in this.indxdata){
								if (this.indxdata[i].value && this.indxdata[i] != item){
									this.indxdata[i].value = !this.indxdata[i].value;
								}
							}
								item.value = !item.value
								this.setState({indxdata:this.indxdata})
							}
						}
						icon={<Image source={{ uri: 'logo_onboarding' }} style={{ width: 32, height: 27 }} fadeDuration={0} />}
						testID='forgot-password-view-submit'
						theme={theme}
					/>
				</View>
				{item.value && <View   style={[{width:'100%'}]}>
					{(this.indxdata).map(service => this.render_Item(service))}
				</View>}
			</FadeInView>
		);
	}

	render() {
		const { server, split, theme } = this.props;
		return (
			<SafeAreaView
				style={[sharedStyles.container, { backgroundColor: themes[theme].auxiliaryBackground }]}
				testID='settings-view'
			>
				<FadeInView style={[{height: 50}]}>
					<RadioButton
						dataOption={list}
						options={{ value: "value", text: "text", disabled: "disabled" }}
						selectedValue={this.state.currentstate}
						onChange={(item) => {
							// console.log(item);
							if (this.state.currentstate == item.value){
								return;
							}
							this.state.currentstate = item.value;
							this.touchRadio(this.state.currentstate);
						}}
						size={[112, 50]}
					/>
					<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
				</FadeInView>

				{this.state.currentstate== 0 && <FadeInView style={[{height: 50}]}>
					<RadioButton
						dataOption={list_child}
						options={{ value: "value", text: "text", disabled: "disabled" }}
						selectedValue={this.state.currentChild}
						onChange={(item) => {
							// console.log(item);
							if (this.state.currentChild == item.value){
								return;
							}
							this.state.currentChild = item.value;
							this.touchRadio(this.state.currentChild);
						}}
						size={[width/2, 50]}
					/>
					<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
				</FadeInView>}
				<ScrollView
					{...scrollPersistTaps}
					contentContainerStyle={[
						{borderBottomWidth: 0},
						{ borderColor: themes[theme].separatorColor }
					]}
					showsVerticalScrollIndicator={false}
					testID='settings-view-list'
				>
					{(this.indxdata).map(service => this.renderItem(service))}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	loginRequest: params => dispatch(loginRequestAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(gameSelectionView));

