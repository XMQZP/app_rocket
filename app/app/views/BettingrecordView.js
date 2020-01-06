import React from 'react';
import PropTypes from 'prop-types';
import {
	Keyboard, Text, ScrollView, View, StyleSheet, Alert, FlatList, Image, Picker
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { analytics } from '../utils/log';
import sharedStyles from './Styles';
import { loginRequest as loginRequestAction } from '../actions/login';
import StatusBar from '../containers/StatusBar';
import { STATUS_COLORS, themes } from '../constants/colors';
import { withTheme } from '../theme';
import { themedHeader } from '../utils/navigation';
import RadioButton from  '../containers/RadioButton'
import DateTimePicker from "react-native-modal-datetime-picker";
import Time from "../lib/Time";
import Button from  '../containers/Button'
import Separator from '../containers/Separator';
import Icon from './RoomView/Header/Icon';
import ListItem from '../containers/ListItem';
import I18n from '../i18n';
import scrollPersistTaps from '../utils/scrollPersistTaps';

import PopUp from '../containers/PopUp'

const styles = StyleSheet.create({
	bottomContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 10
	},
	dontHaveAccount: {
		...sharedStyles.textRegular,
		fontSize: 13
	},
	createAccount: {
		...sharedStyles.textSemibold,
		fontSize: 13
	},
	loginTitle: {
		marginVertical: 0,
		marginTop: 15
	},
	wrap: {
		justifyContent: "space-between",
		alignItems: "flex-start"
	},
	radioEmpty: {
		// width: 78,
		// height: 37,
		backgroundColor: "transparent"
	},
	tylisr: {
		width: '100%',
		height:  50,
	},
	viewStyle: {
		borderWidth:0.5,
		borderStyle:'solid',
	},
});

const list = [
	{ text: "彩票游戏", value: "0"},
	{ text: "体育竞技", value: "1"},
	{ text: "电子游戏", value: "2"},
	{ text: "电子竞技", value: "3"},
	{ text: "棋牌游戏", value: "4"},
	{ text: "真人视讯", value: "5"}
];
const list_list = [
	{ value: [{ gametype: [
				{ text: "所有游戏", value: "0"},
				{ text: "体育竞技", value: "1"},
				{ text: "电子游戏", value: "2"},
				{ text: "电子竞技", value: "3"},
				{ text: "棋牌游戏", value: "4"},
				{ text: "真人视讯", value: "5"},
			]}],},
	{ value: [{ gametype: [
				{ text: "全部", value: "0"},
				{ text: "体育竞技", value: "1"},
				{ text: "电子游戏", value: "2"},
				{ text: "电子竞技", value: "3"},
				{ text: "棋牌游戏", value: "4"},
				{ text: "真人视讯", value: "5"}
			]},
			{ gametype: [
					{ text: "全部", value: "0"},
					{ text: "体育竞技", value: "1"},
					{ text: "电子游戏", value: "2"},
					{ text: "电子竞技", value: "3"},
					{ text: "棋牌游戏", value: "4"},
					{ text: "真人视讯", value: "5"}
				]},
			{ gametype: [
					{ text: "全部", value: "0"},
					{ text: "体育竞技", value: "1"},
					{ text: "电子游戏", value: "2"},
					{ text: "电子竞技", value: "3"},
					{ text: "棋牌游戏", value: "4"},
					{ text: "真人视讯", value: "5"}
				]}
				],},
	{ value: [{ gametype: [
				{ text: "彩票游戏", value: "0"},
				{ text: "体育竞技", value: "1"},
				{ text: "电子游戏", value: "2"},
				{ text: "电子竞技", value: "3"},
				{ text: "棋牌游戏", value: "4"},
				{ text: "真人视讯", value: "5"}
			]}],},
	{ value: [{ gametype: [
				{ text: "彩票游戏", value: "0"},
				{ text: "体育竞技", value: "1"},
				{ text: "电子游戏", value: "2"},
				{ text: "电子竞技", value: "3"},
				{ text: "棋牌游戏", value: "4"},
				{ text: "真人视讯", value: "5"}
			]}],},
	{ value: [{ gametype: [
				{ text: "彩票游戏", value: "0"},
				{ text: "体育竞技", value: "1"},
				{ text: "电子游戏", value: "2"},
				{ text: "电子竞技", value: "3"},
				{ text: "棋牌游戏", value: "4"},
				{ text: "真人视讯", value: "5"}
			]}],},
	{ value: [{ gametype: [
				{ text: "彩票游戏", value: "0"},
				{ text: "体育竞技", value: "1"},
				{ text: "电子游戏", value: "2"},
				{ text: "电子竞技", value: "3"},
				{ text: "棋牌游戏", value: "4"},
				{ text: "真人视讯", value: "5"}
			]}],},
];

const typelist = [
	{ text: "全部", value: "0" },
	{ text: "未开奖", value: "1" },
	{ text: "已中奖", value: "2" },
	{ text: "未中奖", value: "3" },
	{ text: "已撤单", value: "4" }
];

class BettingrecordView extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => {
		const title = navigation.getParam('title', 'Rocket.Chat');
		return {
			title,
			...themedHeader(screenProps.theme)
		};
	}

	static propTypes = {
		navigation: PropTypes.object,
		loginRequest: PropTypes.func.isRequired,
		error: PropTypes.object,
		Site_Name: PropTypes.string,
		Accounts_EmailOrUsernamePlaceholder: PropTypes.string,
		Accounts_PasswordPlaceholder: PropTypes.string,
		Accounts_PasswordReset: PropTypes.bool,
		isFetching: PropTypes.bool,
		failure: PropTypes.bool,
		theme: PropTypes.string,
	}

	static defaultProps = {
		Accounts_PasswordReset: true,

	}

	constructor(props) {
		super(props);
		this.state = {
			user: '',
			password: '',
			code: '',
			showTOTP: false,
			selected: '0',
			currentstate: '0',
			isDateTimePickerVisible: false,
			nowtime: Time.getYestoday(),
			oldtime: Time.getToday(),

			currentTime: false,
			language:''
		};

		this.data = [];
	}

	showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	};

	hideDateTimePicker = () => {
		this.state.isDateTimePickerVisible = false;
		this.setState({ state:this.state});
	};

	handleDatePicked = date => {
		console.log("A date has been picked: ", date)
		if (this.state.currentTime){
			this.state.nowtime = Time.getTimeType(date);
		}else {
			this.state.oldtime = Time.getTimeType(date);
		}

		this.hideDateTimePicker();
	};

	valid = () => {
		const {
			user, password, code, showTOTP
		} = this.state;
		if (showTOTP) {
			return code.trim();
		}
		return user.trim() && password.trim();
	}

	game = (lang) => {
		this.setState({language:lang})
	}

	touchRadio = (indix) => {
		this.data = [];
		this.setState({ data:this.data});
	}

	PickerItem = ( item ) => {
		const { theme } = this.props;

		return (<Picker.Item label={item.text} value={item.value} color={themes[theme].actionTintColor}/>);
	}

	renderItem = ( item ) => {
		const { theme } = this.props;
		return <View style={[
			styles.tylisr,
		]}>
			<View style={[
				{width:'100%',height: '100%',alignItems: 'center',justifyContent: 'center',flexDirection: 'row'},
				styles.viewStyle,
			]}>
				<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>item</Text>
				<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>item</Text>
				<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>item</Text>
				<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>item</Text>
			</View>
		</View>
	}

	renderView = () => {
		let data = this.data;
		if (this.data.length == 0){
			return (<View style={[{width:'100%',height: '100%',alignItems: 'center',justifyContent: 'center'}]}>
					<Image source={{ uri: 'logo_onboarding' }} style={{width:240, height: 200} } />
					<Text style={[{fontSize: 20, color:'black',textAlign:'center'}]}>温馨提示</Text>
					<Text style={[{fontSize: 20, color:'black',textAlign:'center'}]}>当前暂无数据~</Text>
				</View>
			);
		}
		return (
			<ScrollView
				{...scrollPersistTaps}
				contentContainerStyle={[
					{borderBottomWidth: 0},
				]}
				showsVerticalScrollIndicator={false}
				testID='personal-view-list'
			>
				<View style={styles.wrap}>
					{data && data.map((item, index) => this.renderItem(item))}
				</View>
			</ScrollView>
		);
	}

	popuplist = (anddata) =>{
		const { theme } = this.props;
		return (
			<View>
				<Picker
					selectedValue={''}
					onValueChange={lang =>{ this.game(lang)}}
					mode="dialog"
				>
					{anddata.map((item, index) => this.PickerItem(item))}
				</Picker>
				<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
			</View>
		)
	}

	render() {
		const { theme } = this.props;
		return (
			<SafeAreaView
				style={[sharedStyles.container, { backgroundColor: themes[theme].backgroundColor }]}
				forceInset={{ vertical: 'never' }}
				testID='Reportmanagement-view'
			>
				<StatusBar theme={theme} />
				<View >
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
					<View
						style={[{flexDirection: 'row',height: 50}]}
					>
						<Button
							title={this.state.nowtime}
							onPress={() => {
								this.state.currentTime = true;
								this.showDateTimePicker();
							}}
							type={''}
							style={[{width:'32%',height: '100%'}]}
							theme={theme}
						/>
						<View style={[{ backgroundColor: themes[theme].separatorColor, width:1,height: '100%'}]}/>
						<Button
							title={this.state.oldtime}
							onPress={() => {
								this.state.currentTime = false;
								this.showDateTimePicker();
							}}
							type={''}
							style={[{width:'32%',height: '100%'}]}
							theme={theme}
						/>
						<View style={[{ backgroundColor: themes[theme].separatorColor, width:1,height: '100%'}]}/>
						<Button
							title={'筛选'}
							onPress={() => {
								this.popUp.show()
							}}
							type={''}
							style={[{width:'32%',height: '100%'}]}
							theme={theme}
						/>

					</View>
					<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
					{this.state.currentstate == 0 && <RadioButton
						dataOption={typelist}
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
						size={[82, 50]}
					/>}
					<View style={[
						{ height: 50, backgroundColor: themes[theme].separatorColor},
						{ flexDirection: 'row'},
						{ alignItems: 'center',justifyContent: 'center'}
					]}>
						<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>彩种</Text>
						<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>投注金额</Text>
						<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>状态</Text>
						<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>详情</Text>
					</View>
					<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 1}]}/>

				</View>
				<ScrollView
					{...scrollPersistTaps}
					contentContainerStyle={[
						{width:'100%',height: '100%'},
						{borderBottomWidth: 0},
					]}
					showsVerticalScrollIndicator={false}
					testID='personal-view-list'
				>

					{ this.renderView()}
					<DateTimePicker
						isVisible={this.state.isDateTimePickerVisible}
						mode={'datetime'}
						onConfirm={this.handleDatePicked}
						onCancel={this.hideDateTimePicker}
					/>
				</ScrollView>
				<PopUp ref={ref => this.popUp = ref} transparency={0.2} modalBoxHeight={((list_list[this.state.currentstate ].value).length+2)*62}>
					<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
						<View>
							{(list_list[this.state.currentstate ].value).map((item, index) => this.popuplist(item.gametype))}

							<Button
								title={I18n.t('Search')}
								onPress={() => {
									this.popUp.hide()
								}}
								type={''}
								theme={theme}
							/>
							<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
						</View>

				</PopUp>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	isFetching: state.login.isFetching,
	failure: state.login.failure,
	error: state.login.error && state.login.error.data,
	Site_Name: state.settings.Site_Name,
	Accounts_EmailOrUsernamePlaceholder: state.settings.Accounts_EmailOrUsernamePlaceholder,
	Accounts_PasswordPlaceholder: state.settings.Accounts_PasswordPlaceholder,
	Accounts_PasswordReset: state.settings.Accounts_PasswordReset
});

const mapDispatchToProps = dispatch => ({
	loginRequest: params => dispatch(loginRequestAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(BettingrecordView));

