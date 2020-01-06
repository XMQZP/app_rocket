import React from 'react';
import PropTypes from 'prop-types';
import {
	Keyboard, Text, ScrollView, View, StyleSheet, Alert, FlatList
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
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		alignItems: "flex-start"
	},
	radioEmpty: {
		// width: 78,
		// height: 37,
		backgroundColor: "transparent"
	},
	tylisr: {
		width: '33.3%',
		height:  120,
	},
	viewStyle: {
		borderWidth:0.5,
		borderStyle:'solid',
	},
});

const list = [
	{ text: "彩票游戏", value: "0" },
	{ text: "体育竞技", value: "1" },
	{ text: "电子游戏", value: "2" },
	{ text: "电子竞技", value: "3" },
	{ text: "棋牌游戏", value: "4" },
	{ text: "真人视讯", value: "5" }
];

class PersonaloverviewView extends React.Component {
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
		};
		const {navigation, Site_Name } = this.props;
		const title = navigation.getParam('title',Site_Name);

		this.isTeam = (title == '团队总览');
		this.data = this.getData(0);
	}

	getData = (type) =>{
		let _data = [
			{ value: 1, title: '余额' },
			{ value: 2, title: '充值' },
			{ value: 3, title: '提现' },
		];
		if(this.isTeam){
			let data = [
				{ value: 1, title: '团队人数(人)' },
				{ value: 2, title: '注册人数(人)' },
			]
			_data = data.concat(_data);
		}
		let arr = [];
		switch (type) {
			case 0:
				arr =  [
					{ value: 1, title: '投注金额' },
					{ value: 2, title: '中奖金额' },
					{ value: 3, title: '打和返款' },
					{ value: 1, title: '投注返点' },
					{ value: 2, title: '代理返点' },
					{ value: 3, title: '优惠' },
					{ value: 1, title: '活动优惠' },

				]

				break;
			case 1:
				 arr = [
					 { value: 1, title: '下注投注金额' },
					 { value: 2, title: '受注投注金额' },
					 { value: 3, title: '有效投注' },
					 { value: 1, title: '中奖金额' },
					 { value: 2, title: '打和返款' },
					 { value: 3, title: '盘口盈亏' },
				]
				break;
			case 2:
				arr = [
					{ value: 1, title: '投注金额' },
					{ value: 2, title: '中奖金额' },
					{ value: 3, title: '投注退还' },
					{ value: 1, title: '有效投注' },
				]
				break;
			case 3:
				arr = [
					{ value: 1, title: '下注投注金额' },
					{ value: 2, title: '有效投注' },
					{ value: 3, title: '中奖金额' },
					{ value: 1, title: '打和返款' },
					{ value: 2, title: '盘口盈亏' },
				]
				break;
			case 4:
				arr = [
					{ value: 1, title: '投注金额' },
					{ value: 2, title: '有效投注' },
					{ value: 3, title: '中奖金额' },
				]
				break;
			case 5:
				arr = [
					{ value: 1, title: '投注金额' },
					{ value: 2, title: '有效投注' },
					{ value: 3, title: '中奖金额' },
					{ value: 1, title: '退水金额' },
				]
				break;
		}
		_data = _data.concat(arr,{ value: 2, title: '净盈利' })
		return _data;
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

	submit = () => {
		if (!this.valid()) {
			return;
		}

		const { user, password, code } = this.state;
		const { loginRequest } = this.props;
		Keyboard.dismiss();
		loginRequest({ user, password, code });
		analytics().logEvent('login');
	}

	touchRadio = (indix) => {
		this.data = this.getData(parseInt(indix));
		this.setState({ data:this.data});
	}

	renderItem = ( item ) => {
		const { theme } = this.props;
		return <View style={[
			styles.tylisr,
		]}>
			<View style={[
				{width:'100%',height: '100%',alignItems: 'center',justifyContent: 'center',},
				styles.viewStyle
			]}>
				<Text style={[{fontSize: 20}]}>0</Text>
				<Text style={[{fontSize: 20}]}>{item.title}</Text>
			</View>
		</View>


	}

	renderView = () => {
		let length = this.data.length;
		let yushu = 3 - (length % 3);
		let arr = this.data.slice(0, yushu);
		let data = this.data;
		return (<View style={styles.wrap}>
				{data && data.map((item, index) => this.renderItem(item))}
				{/* 创建空视图不全整行 */}
				{arr.length > 0 &&
				arr.length != 3 &&
				arr.map((item, index) => {
					return (
						<View
							key={index}
							//设置默认宽高
							style={[
								styles.radioEmpty,
								styles.tylisr
							]}
						/>
					);
				})}
			</View>
		);
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
				<View>
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
							style={[{width:'50%',height: '100%'}]}
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
							style={[{width:'50%',height: '100%'}]}
							theme={theme}
						/>
					</View>
					<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 10}]}/>
					<View style={[
						{ width:'100%',height: 50,left: 20},
						{ flexDirection: 'row'},
						{ alignItems: 'center'}
					]}>
						<View style={[{borderRadius: 10,width: 10,height: 10,backgroundColor: 'red'}]}/>
						<Text style={[{fontSize: 20,marginVertical: 15,lineHeight: 50,left: 10}]}>个人详情</Text>
					</View>
					<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 1}]}/>
				</View>
				<ScrollView
					{...scrollPersistTaps}
					contentContainerStyle={[
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PersonaloverviewView));

