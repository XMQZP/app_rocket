import React from 'react';
import {
	View,
	Linking,
	ScrollView,
	ImageBackground,
	SafeAreaView,
	Alert,
	Text,
	TouchableOpacity,
	Image,
	FlatList,
	RefreshControl
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout as logoutAction } from '../../actions/login';
import { toggleMarkdown as toggleMarkdownAction } from '../../actions/markdown';
import { toggleCrashReport as toggleCrashReportAction } from '../../actions/crashReport';
import { SWITCH_TRACK_COLOR, themes } from '../../constants/colors';
import { DrawerButton, CloseModalButton, CustomHeaderButtons } from '../../containers/HeaderButton';
import ListItem from '../../containers/ListItem';
import { DisclosureImage } from '../../containers/DisclosureIndicator';
import Separator from '../../containers/Separator';
import I18n from '../../i18n';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import styles from './styles';
import sharedStyles from '../Styles';
import { withTheme } from '../../theme';
import { themedHeader } from '../../utils/navigation';
import { withSplit } from '../../split';
import Navigation from '../../lib/Navigation';
import IconButton from '../../lib/Button'
import Button from '../OnboardingView/Button';
import Icon from '../RoomView/Header/Icon';
import { Item } from 'react-navigation-header-buttons';
import { CustomIcon } from '../../lib/Icons';
import { NavigationActions } from "react-navigation";
import user from '../../lib/methods/user';
import { storage } from '../../lib/storage';

const SectionSeparator = React.memo(({ theme }) => (
	<View
		style={[
			styles.sectionSeparatorBorder,
			{
				borderColor: themes[theme].separatorColor,
				backgroundColor: themes[theme].auxiliaryBackground
			}
		]}
	/>
));
SectionSeparator.propTypes = {
	theme: PropTypes.string
};

const ItemInfo = React.memo(({ info, theme }) => (
	<View style={[styles.infoContainer, { backgroundColor: themes[theme].auxiliaryBackground }]}>
		<Text style={[styles.infoText, { color: themes[theme].infoText }]}>{info}</Text>
	</View>
));
ItemInfo.propTypes = {
	info: PropTypes.string,
	theme: PropTypes.string
};

class MembercentrecView extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		...themedHeader(screenProps.theme),
		headerLeft: screenProps.split ? (
			<CloseModalButton navigation={navigation} testID='settings-view-close' />
		) : (
			<DrawerButton navigation={navigation} />
		),
		title: I18n.t('Membercentrec')
	});

	static propTypes = {
		navigation: PropTypes.object,
		server:	PropTypes.object,
		useMarkdown: PropTypes.bool,
		allowCrashReport: PropTypes.bool,
		toggleMarkdown: PropTypes.func,
		toggleCrashReport: PropTypes.func,
		theme: PropTypes.string,
		split: PropTypes.bool,
		logout: PropTypes.func.isRequired
	}
	refreshing= false;

	Data = {
		text : [{label : 1 ,value : `蓝蓝的天上白云飘，白云下面小肥羊儿跑`}],
		recharge : '充值',
		withdraw : '提现',
		gamerecord : '游戏记录',
		name: '去你妈的',
		money: '6'
	}

	logout = () => {
		const { logout, split } = this.props;
		if (split) {
			Navigation.navigate('RoomView');
		}
		logout();
	}

	renderDisclosure = () => {
		const { theme } = this.props;
		return <DisclosureImage theme={theme} />;
	}

	renderSeparator = () => {
		const { theme } = this.props;
		return <Separator style={{height:1}} theme={theme} />;
	}

	navigateToRoom = (room) => {
		const { navigation } = this.props;
		navigation.navigate(room.view,{title:I18n.t(room.title)});
	}

	renderItem = ({ item }) => {
		const { theme } = this.props;
		return <View>
			<ListItem
				title={I18n.t(item.title)}
				onPress={() => {this.navigateToRoom(item)}}
				showActionIndicator
				testID='membercentrec-view-contact'
				right={this.renderDisclosure}
				theme={theme}
			/>

		</View>

	}

	render() {
		const { server, split, theme } = this.props;
		return (
			<SafeAreaView
				style={[sharedStyles.container, { backgroundColor: themes[theme].auxiliaryBackground }]}
				testID='settings-view'
			>
				<ScrollView
					{...scrollPersistTaps}
					contentContainerStyle={[
						{flex: 1},
						{borderBottomWidth: 0,},
					]}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={this.refreshing}
							onRefresh={ () => {
								Alert.alert('5555');
								this.setState({ refreshing: this.refreshing})
								}
							}
						/>
					}
					testID='settings-view-list'
				>
					<View style={[{backgroundColor: themes[theme].headerBackground,flex: 2,flexDirection:'row'}]}>
						<View style={[{flex: 2,flexDirection:'row',justifyContent: 'center',alignItems: 'center',}]}>
							<Image source={{ uri: 'logo_onboarding' }} style={{width:98, height: 80}} />
						</View>
						<View style={[{flex: 3,flexDirection:'column',justifyContent: 'center'}]}>
							<Text style={[styles.buttonTitle, { color:  themes[theme].buttonText }]}>{this.Data.name}</Text>
							<View style={[{ height: 10 }]} />
							<View style={[{flexDirection:'row'}]}>
								<Text style={[styles.buttonTitle, { color:  themes[theme].buttonText}]}>{`余额：${this.Data.money}元`}</Text>
								<View style={[styles.buttonTitle, { color:  themes[theme].buttonText}]}>
									<CustomHeaderButtons>
										<Item iconName='File-google-drive' onPress={() => Alert.alert('按钮被点击3')} testID={'updata_money'} />
									</CustomHeaderButtons>
								</View>
							</View>
						</View>

					</View>
					<View style={[{flex: 8,justifyContent: 'center',alignItems: 'center',}]}>
						<Separator style={{height:1}} theme={theme} />
						<FlatList
							style={[{width: '100%'}]}
							data={[
								{key: 1, view: "ReportmanagementView", title: 'Reportmanagement' },
								{key: 2, view: "AgencyCenterView", title: 'AgencyCenter' },
								{key: 3, view: "SecuritycenterView", title: 'Securitycenter' },
								{key: 4, view: "WebsiteannouncementView", title: 'Websiteannouncement' },
								{key: 5, view: "StationSMSView", title: 'StationSMS' },
								{key: 6, view: "SystemsettingsView", title: 'Systemsettings' },
							]}
							renderItem={this.renderItem}
							ItemSeparatorComponent={this.renderSeparator}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	server: state.server,
	useMarkdown: state.markdown.useMarkdown,
	allowCrashReport: state.crashReport.allowCrashReport
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutAction()),
	toggleMarkdown: params => dispatch(toggleMarkdownAction(params)),
	toggleCrashReport: params => dispatch(toggleCrashReportAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withSplit(MembercentrecView)));
