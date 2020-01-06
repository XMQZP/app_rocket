import React from 'react';
import PropTypes from 'prop-types';
import { Alert, FlatList, Image, ImageBackground, ScrollView, Text, View } from 'react-native';
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
import Button from '../../views/OnboardingView/Button';

const list = [
	{
		label: '登录密码',
		value: 'PersonaloverviewView'
	}, {
		label: '资金密码',
		value: 'PersonalreportView'
	}, {
		label: '银行卡管理',
		value: 'BankcardmanagementView'
	}
];

class WebsiteannouncementView extends React.Component {
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
		Alert.alert('标题内容',`${ room.label}`);
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
			<View>
				<Button
					type='secondary'
					title={label}
					subtitle={`${item}`}
					icon={<Image source={{ uri: 'logo_onboarding' }} style={{ width: 32, height: 27 }} fadeDuration={0} />}
					onPress={() => this.navigateToRoom(item)}
					testID='button'
					theme={theme}
				/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(WebsiteannouncementView));
