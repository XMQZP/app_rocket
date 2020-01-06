import React from 'react';
import PropTypes from 'prop-types';
import {
	Keyboard, Text, ScrollView, View, StyleSheet, Alert, FlatList, Picker, Image, ImageBackground
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
import styles from './LotteryhallView/styles';
import TextInput from '../containers/TextInput';
import RNPickerSelect from "react-native-picker-select";
import user from '../lib/methods/user';
import { storage } from '../lib/storage';
import EventEmitter from '../utils/events';
import { LISTENER } from '../containers/Toast';



class AddbankcardView extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => {
		const title = navigation.getParam('title', 'Rocket.Chat');
		return {
			title,
			...themedHeader(screenProps.theme)
		};
	}

	static propTypes = {

	}

	static defaultProps = {
	}

	constructor(props) {
		super(props);
		this.state = {
			bankName: 0,
		};

		this.data = [
			{
				key: 0,
				name:'开户姓名',
				value:null
			}, {
				key: 1,
				name:'银行卡号',
				value:null
			}, {
				key: 2,
				name:'确认卡号',
				value:null
			}
		];
	}

	valid = () => {
		const {
			user, password, code, showTOTP
		} = this.state;
		if (showTOTP) {
			return code.trim();
		}
		return user.trim() && password.trim();
	}

	setbankName= (value) => {
		this.setState({bankName:value});
	}

	PickerItem = ( item ) => {
		const { theme } = this.props;
		return (<Picker.Item label={item.label} value={item.value} color={themes[theme].actionTintColor}/>);
	}
	renderSeparator = () => {
		const { theme } = this.props;
		return <Separator style={{height:1}} theme={theme} />;
	}
	renderItem = (  item ) => {
		const { num, name } = item;
		const { theme } = this.props;
		return (
			<View style={[{flexDirection:'row',justifyContent: 'center', alignItems: 'center',marginTop:10}]}>
				<Text style={[{flex:2,textAlign:'center', height: 30}]}>{name}</Text>
				<View style={[{flex:8}]}>
					<TextInput
						autoFocus
						onChangeText={value => {
							this.data[item.key].value = value;
							this.setState({ data: value });
						}}
						keyboardType={item.key == 0 ?'twitter':'numeric'}
						autoCapitalize='none'
						testID={`login-view-${num}`}
						containerStyle={sharedStyles.inputLastChild}
						accessibilityLabel={name}
						placeholder={name}
						contentDescription={name}
						value = {this.data[item.key].value}
						theme={theme}
					/>
				</View>
			</View>
		);
	}

	render() {
		const { theme } = this.props;
		return (
			<SafeAreaView
				style={[sharedStyles.container, { backgroundColor: themes[theme].auxiliaryBackground }]}
				forceInset={{ vertical: 'never' }}
				testID='Reportmanagement-view'
			>

				<ScrollView
					{...scrollPersistTaps}
					showsVerticalScrollIndicator={false}
					testID='settings-view-list'
				>
					<View style={[{flexDirection:'row',justifyContent: 'center', alignItems: 'center',marginTop:10}]}>
						<Text style={[{flex:2,textAlign:'center'}]}>{'开户银行'}</Text>
						<View style={[{flex:8,backgroundColor:'white'}]}>
							<Picker
								selectedValue={this.state.bankName}
								onValueChange={(value) =>{
									this.setbankName(value)
								}}
								mode="dialog"
							>
								{(OPTIONS['desktopNotifications']).map((item, index) => this.PickerItem(item))}
							</Picker>
						</View>

					</View>

					{(this.data).map(service => this.renderItem(service))}
					<View style={[{marginTop:20,flexDirection:'row'}]}>
						<Button
							title={'添加银行卡'}
							onPress={ async() => {


								this.HttpRequest();
							}}
							style={[{height:50,marginTop:20,flex:1,borderWidth:0.5,borderStyle:'solid'}]}
							theme={theme}
						/>
					</View>

				</ScrollView>
			</SafeAreaView>
		);
	}

	async HttpRequest() {
		let bankName = OPTIONS['desktopNotifications'][this.state.bankName].label
		let res = await user.bindBankCard(this.data[1].value, this.data[0].value, bankName);
		if (res.err == null) {
			EventEmitter.emit(LISTENER, { message: '添加成功' });
			storage.remove('bankinfo');
			storage.load('bankinfo',(data) => {});
			for (let i in this.data){
				this.data[i].value = '';
			}
			this.setState({data:this.data});
		} else {
			EventEmitter.emit(LISTENER, { message: '添加失败' });
		}
	}
}

const OPTIONS = {
	desktopNotifications: [
		{label: '工商银行', value: 0},
		{label: '交通', value: 1},
		{label: '广大', value: 2},
		],


};

const mapStateToProps = state => ({
	isFetching: state.login.isFetching,
	failure: state.login.failure,
	error: state.login.error && state.login.error.data,

});

const mapDispatchToProps = dispatch => ({
	loginRequest: params => dispatch(loginRequestAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AddbankcardView));

