import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Dimensions, FlatList, Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView, NavigationActions } from 'react-navigation';

import RocketChat from '../../lib/rocketchat';
import I18n from '../../i18n';
import Loading from '../../containers/Loading';
import { showErrorAlert } from '../../utils/info';
import log from '../../utils/log';
import { setUser as setUserAction } from '../../actions/login';
import StatusBar from '../../containers/StatusBar';
import { CustomIcon } from '../../lib/Icons';
import sharedStyles from '../Styles';
import ListItem from '../../containers/ListItem';
import Separator from '../../containers/Separator';
import { themes } from '../../constants/colors';
import { withTheme } from '../../theme';
import { themedHeader } from '../../utils/navigation';
import { CustomHeaderButtons, LegalButton } from '../../containers/HeaderButton';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import ImageContainer from '../../containers/message/Image';
import styles from '../LotteryhallView/styles';
import uri from 'rn-fetch-blob/utils/uri';
import Time from '../../lib/Time';
import Button from '../../containers/Button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { isAndroid } from '../../utils/deviceInfo';
import { Item } from 'react-navigation-header-buttons';
import RadioButton from '../../containers/RadioButton';

const list = [
	{ text: "收件箱", value: "0" },
	{ text: "发件箱", value: "1" }
];
const { width, height } = Dimensions.get('window');
class StationSMSView extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => {
		const title = navigation.getParam('title', 'Rocket.Chat');
		const searching = navigation.getParam('searching');
		return {
			...themedHeader(screenProps.theme),
			title,
			headerRight:searching ? (<CustomHeaderButtons>
				<Item
					title='new'
					iconName='edit-rounded'
					onPress={() => {}
						//onPressItem
					}
					testID='rooms-list-view-create-channel'
				/>

			</CustomHeaderButtons>) : (
				<CustomHeaderButtons>
					<Item
						title='一键已读'
						onPress={() => {}
							//onPressItem
						}
						testID='rooms-list-view-create-channel'
					/>
				</CustomHeaderButtons>
				)
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
		this.searching = false;
		this.data = [];
		const { Site_Name } = this.props;
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
	initSearchingAndroid = () => {
		const { navigation } = this.props;
		this.searching = !this.searching;
		this.setState({ searching: this.searching });
		navigation.setParams({ searching: this.searching });
	};
	game = (lang) => {
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
							{Alert.alert(`${item.text}`)};
							this.initSearchingAndroid();
						}}
						size={[width/2, 50]}
					/>
					<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
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
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	userLanguage: state.login.user
});

const mapDispatchToProps = dispatch => ({
	setUser: params => dispatch(setUserAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(StationSMSView));
