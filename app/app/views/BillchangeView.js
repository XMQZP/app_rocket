import React from 'react';
import PropTypes from 'prop-types';
import {
	Text, ScrollView, View, StyleSheet, Alert, Image, Dimensions, Picker
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import sharedStyles from './Styles';
import { loginRequest as loginRequestAction } from '../actions/login';
import StatusBar from '../containers/StatusBar';
import { STATUS_COLORS, themes } from '../constants/colors';
import { withTheme } from '../theme';
import { themedHeader } from '../utils/navigation';
import DateTimePicker from "react-native-modal-datetime-picker";
import Time from "../lib/Time";
import Button from  '../containers/Button'
import scrollPersistTaps from '../utils/scrollPersistTaps';
import RNPickerSelect from "react-native-picker-select";
import I18n from '../i18n';
import ListItem from '../containers/ListItem';
import RadioButton from '../containers/RadioButton';

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

class BillchangeView extends React.Component {
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
		this.mScreenWidth= Dimensions.get('window').width;

		this.defaultType = 'default';
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
		Alert.alert(`${date}`)
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

	submit = (lang) => {
		this.setState({language:lang})
	}

	renderPicker = (key) => {
		const { room } = this.state;
		const { theme } = this.props;

		return (
			<RNPickerSelect
				testID={key}
				style={{ viewContainer: styles.viewContainer }}
				textInputProps={{ style: { ...styles.pickerText, color: themes[theme].actionTintColor } }}
				useNativeAndroidPickerStyle={false}
				placeholder={{}}
				onValueChange={value => this.onValueChangePicker(key, value)}
				items={OPTIONS[key]}
			/>
		);
	}

	onValueChangePicker = (key, value) => {

		if (key == 'desktopNotifications'){
			this.defaultType = value;
		}
		this.setState({defaultType:this.defaultType})
	}

	PickerItem = ( item ) => {
		const { theme } = this.props;
		return (<Picker.Item label={item.label} value={item.value} color={themes[theme].actionTintColor}/>);
	}

	submit = (lang) => {
		this.setState({language:lang})
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
				<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>item</Text>
			</View>
		</View>
	}
	renderView = () => {;
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

	render() {
		const { theme } = this.props;
		return (
			<SafeAreaView
				style={[sharedStyles.container, { backgroundColor: themes[theme].backgroundColor }]}
				forceInset={{ vertical: 'never' }}
				testID='Reportmanagement-view'
			>
				<StatusBar theme={theme} />
				<View style={[{flex :2}]}>
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
								this.state.currentTime = true;
								this.showDateTimePicker();
							}}
							type={''}
							style={[{width:'32%',height: '100%'}]}
							theme={theme}
						/>
						<View style={[{ backgroundColor: themes[theme].separatorColor, width:1,height: '100%'}]}/>
						<ListItem

							style={[{width:'36%',height: '100%'}]}
							title={`${OPTIONS[this.defaultType][0].label}`}
							testID='-view-alert'
							right={() => this.renderPicker('desktopNotifications')}
							theme={theme}
						/>

					</View>
					<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
					<Picker
							selectedValue={''}
							onValueChange={lang =>{ this.submit(lang)}}
							mode="dialog"
					>

						{(OPTIONS[this.defaultType]).map((item, index) => this.PickerItem(item))}
					</Picker>
					<View style={[
						{ height: 50, backgroundColor: themes[theme].separatorColor},
						{ flexDirection: 'row'},
						{ alignItems: 'center',justifyContent: 'center'}
					]}>
						<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>时间</Text>
						<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>账变类型</Text>
						<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>金额</Text>
						<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>账户余额</Text>
						<Text style={[{fontSize: 20, flex: 1,color:'black',textAlign:'center'}]}>详情</Text>
					</View>
				</View>
				<View style={[{flex :5.5}]}>
					{this.renderView()}
				</View>
				<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
				<View style={[
					{ flex :0.5},
					{ flexDirection: 'row'},
					{ alignItems: 'center',justifyContent: 'center'}
				]}>
					<View style={[{ flex :1}, {flexDirection: 'row'}]}>
						<Text style={[{fontSize: 20,color:'black',textAlign:'center'}]}>总计(笔)</Text>
						<Text style={[{fontSize: 20,color:'red',textAlign:'left'}]}  numberOfLines={1} ellipsizeMode='middle'>1000</Text>
					</View>
					<View style={[{ flex :1}, {flexDirection: 'row'}]}>
						<Text style={[{fontSize: 20, color:'black',textAlign:'center'}]}>总收入</Text>
						<Text style={[{fontSize: 20,color:'red',textAlign:'left'}]} numberOfLines={1} ellipsizeMode='middle'>1000</Text>
					</View>
					<View style={[{ flex :1}, {flexDirection: 'row'}]}>
						<Text style={[{fontSize: 20, color:'black',textAlign:'center'}]}>总支出</Text>
						<Text style={[{fontSize: 20, color:'red',textAlign:'left'}]}  numberOfLines={1} ellipsizeMode='middle'>1000</Text>
					</View>
				</View>
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					mode={'datetime'}
					onConfirm={this.handleDatePicked}
					onCancel={this.hideDateTimePicker}
				/>

			</SafeAreaView>
		);
	}
}
const OPTIONS = {
	desktopNotifications: [{
		label: '所有类型', value: 'default'
	}, {
		label: '收入', value: 'into'
	}, {
		label: '支出', value: 'out'
	}],
	default: [ {
		label: '所有', value: 'all'
	}],
	out: [{
		label: '出款扣除', value: 'none None'
	}, {
		label: '棋牌游戏转出', value: '0 Default'
	}, {
		label: '人工提出', value: 'beep Beep'
	}, {
		label: '冲销返水', value: 'ding Ding'
	}, {
		label: '彩票下注', value: 'chelle Chelle'
	}, {
		label: '转账充值', value: 'droplet Droplet'
	}, {
		label: '追号扣款', value: 'highbell Highbell'
	}, {
		label: '优惠扣除', value: 'seasons Seasons'
	}],
	into: [{
		label: '公司入款', value: 'none None'
	}, {
		label: '线上支付', value: '0 Default'
	}, {
		label: '人工存入', value: 'beep Beep'
	}, {
		label: '给予返水', value: 'ding Ding'
	}, {
		label: '活动优惠', value: 'chelle Chelle'
	}, {
		label: '彩票派将', value: 'droplet Droplet'
	}, {
		label: '彩票返水', value: 'highbell Highbell'
	}, {
		label: '退佣分红', value: 'seasons Seasons'
	}]
};

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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(BillchangeView));

