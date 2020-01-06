import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView, NavigationActions } from 'react-navigation';
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

const list = [
	{
		label: '个人总览',
		value: 'PersonaloverviewView'
	}, {
		label: '个人报表',
		value: 'PersonalreportView'
	}, {
		label: '账变记录',
		value: 'BillchangeView'
	}, {
		label: '投注记录',
		value: 'BettingrecordView'
	}, {
		label: '充值记录',
		value: 'RechargerecordView'
	}, {
		label: '提现记录',
		value: 'WithdrawalsrecordView'
	}, {
		label: '追号记录',
		value: 'TrackingrecordView'
	}, {
		label: '活动详情',
		value: 'EventDetailsView'
	}
];

class ReportmanagementView extends React.Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ReportmanagementView));
