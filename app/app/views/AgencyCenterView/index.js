import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ImageBackground, ScrollView, Text, View } from 'react-native';
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
import { LegalButton } from '../../containers/HeaderButton';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import ImageContainer from '../../containers/message/Image';
import styles from '../LotteryhallView/styles';
import uri from 'rn-fetch-blob/utils/uri';

const list = [
	{
		label: '代理说明',
		value: 'PersonaloverviewView'
	}, {
		label: '团队总览',
		value: 'PersonaloverviewView'
	}, {
		label: '团队报表',
		value: 'BillchangeView'
	}, {
		label: '下级开户',
		value: 'BettingrecordView'
	}, {
		label: '用户列表',
		value: 'RechargerecordView'
	}, {
		label: '投注明细',
		value: 'WithdrawalsrecordView'
	}, {
		label: '交易明细',
		value: 'TrackingrecordView'
	}
];

class AgencyCenterView extends React.Component {
	static navigationOptions = ({navigation, screenProps }) => {
		const title = navigation.getParam('title', 'Rocket.Chat');
		return {
			title,
			...themedHeader(screenProps.theme)
		};

	}

	static propTypes = {
		userLanguage: PropTypes.string,
		navigation: PropTypes.object,
		setUser: PropTypes.func,
		theme: PropTypes.string
	}

	constructor(props) {
		super(props);
	}

	navigateToRoom = (room) => {
		const { navigation } = this.props;
		navigation.navigate(room.value,{title: room.label});
	}

	renderSeparator = () => {
		const { theme } = this.props;
		return <Separator style={{height:1}} theme={theme} />;
	}

	renderIcon = () => {
		const { theme } = this.props;
		return <CustomIcon name='check' size={20} style={{ color: themes[theme].tintColor }} />;
	}

	renderItem = ({ item }) => {
		const { value, label } = item;
		const { theme } = this.props;
		const isSelected = false;

		return (
			<ListItem
				title={label}
				onPress={() => this.navigateToRoom(item)}
				testID={`Reportmanagement-view-${ value }`}
				right={isSelected ? this.renderIcon : null}
				theme={theme}
			/>
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
				<View
					style={[ {justifyContent: 'flex-start', alignItems: 'flex-start',flex: 0.5}]}
				>
					<ImageBackground
						style={[ {
							 width: '100%', height: '100%'
						}]}
						source={{uri:'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png'}}
					/>
				</View>

				<ScrollView
					{...scrollPersistTaps}
					contentContainerStyle={[
						{flex: 1},
						{borderBottomWidth: 0,},
					]}
					showsVerticalScrollIndicator={false}
					testID='settings-view-list'
				>
					<FlatList
						data={list}
						keyExtractor={item => item.value}
						contentContainerStyle={[
							{
								backgroundColor: themes[theme].auxiliaryBackground,
								borderColor: themes[theme].separatorColor
							}
						]}
						renderItem={this.renderItem}
						ItemSeparatorComponent={this.renderSeparator}
					/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AgencyCenterView));
