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



class fundsPasswodeView extends React.Component {
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
				name:'原资金密码',
				value:''
			}, {
				key: 1,
				name:'新资金密码',
				value:''
			}, {
				key: 2,
				name:'确认新资金密码',
				value:''
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
	renderSeparator = () => {
		const { theme } = this.props;
		return <Separator style={{height:1}} theme={theme} />;
	}
	renderItem = (  item ) => {
		const { num, name } = item;
		const { theme } = this.props;
		return (
			<View style={[{flexDirection:'row',justifyContent: 'center', alignItems: 'center',marginTop:10}]}>
				<Text style={[{flex:2,textAlign:'center', height: 40}]}>{name}</Text>
				<View style={[{flex:8}]}>
					<TextInput
						autoFocus
						onChangeText={value => {
							this.data[item.key].value = value;
							this.setState({ data: value });
						}}
						keyboardType={'numbers-and-punctuation'}
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
					{(this.data).map(service => this.renderItem(service))}
					<View style={[{marginTop:20,flexDirection:'row'}]}>
						<Button
							title={'确认修改'}
							onPress={ async() => {

								if (this.data[1].value == this.data[2].value)
								{
									this.HttpRequest();

								}else {
									Alert.alert('请确认两次输入的密码是否一致');
								}
							}}
							style={[{height:50,marginTop:20,flex:1,borderWidth:0.5,borderStyle:'solid'}]}
							theme={theme}
						/>
					</View>
					<View style={[{justifyContent: 'center', alignItems: 'center'}]}>
						<View style={[{justifyContent: 'center', alignItems: 'center',backgroundColor:'#FDFFDF',width:'90%',height:60}]}>
							<Text>如果你未设置资金密码你可以尝试下你注册时的登录密码</Text>
						</View>
					</View>

				</ScrollView>
			</SafeAreaView>
		);
	}

	async HttpRequest() {
		let res = await user.cheatAmountPassword(this.data[0].value, this.data[1].value);
		if (res.err == null) {
			Alert.alert('修改成功');
			for (let i in this.data){
				this.data[i].value = '';
			}

			this.setState({data:this.data});
		} else {
			Alert.alert('修改失败');
		}
	}
}

const mapStateToProps = state => ({
	isFetching: state.login.isFetching,
	failure: state.login.failure,
	error: state.login.error && state.login.error.data,

});

const mapDispatchToProps = dispatch => ({
	loginRequest: params => dispatch(loginRequestAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(fundsPasswodeView));

