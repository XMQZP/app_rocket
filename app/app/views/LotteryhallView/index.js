import React from 'react';
import {
	View, Linking, ScrollView, ImageBackground, SafeAreaView, Alert, Text, TouchableOpacity, Image, Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SWITCH_TRACK_COLOR, themes } from '../../constants/colors';
import { DrawerButton, CloseModalButton } from '../../containers/HeaderButton';
import StatusBar from '../../containers/StatusBar';
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
import Button from './Button';
import  MarqueeHorizontal from './marquee/MarqueeHorizontal'
import IconButton from '../../lib/Button'
import Time from '../../lib/Time';

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

class LotteryhallView extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		...themedHeader(screenProps.theme),
		headerLeft: screenProps.split ? (
			<CloseModalButton navigation={navigation} testID='settings-view-close' />
		) : (
			<DrawerButton navigation={navigation} />
		),
		title: I18n.t('Lottery_hall')
	});

	static propTypes = {
		navigation: PropTypes.object,
	}
	constructor(props) {
		super(props);
		this.state = {
		};
		this.data = [
			{ text: "彩票游戏", value: "0", color: 'blue'	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false },
			{ text: "电子游戏", value: "1", color: 'purple'	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false },
			{ text: "棋牌游戏", value: "2", color: 'red' 	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false },
			{ text: "体育竞技", value: "3", color: 'green'	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false },
			{ text: "真人视讯", value: "4", color: 'blue'	, uri: 'http://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png',child:false }
		];
	}

	Data = {
		text : [{label : 1 ,value : `蓝蓝的天上白云飘，白云下面小肥羊儿跑`}],
		recharge : '充值',
		withdraw : '提现',
		gamerecord : '游戏记录',
	}

	recharge = (Data) => {
		this.Data.recharge = '充   值'
		this.setState(prevState => ({ Data: this.Data.recharge }));
	}

	withdraw = (Data) => {
		this.Data.withdraw = '提   现'
		this.setState(prevState => ({ Data: this.Data.withdraw }));
	}
	navigateToRoom = (room) => {
		const { navigation } = this.props;
		navigation.navigate(room.view,{title:room.viewname});
	}

	renderItem = ( item ) => {
		const { theme } = this.props;

		return <View style={[
			styles.radioEmpty,
			styles.tylisr
		]}>
			<Button
				icon={{ uri: item.uri }}
				onPress={() => {
					const { navigation } = this.props;
					navigation.navigate('gameSelectionView',{title:'游戏选择',key:item.value});
				}}
				title={item.text}
				color={item.color}
				textcolor={'white'}
				opacity={0.5}
				width='100%'
				theme={theme}
			/>
		</View>

	}

	renderView = (list) => {
		let length = list.length;
		let yushu =(length % 2);
		let arr = list.slice(0, yushu);
		let data = list;
		return (<View style={styles.wrap}>
				{data && data.map((item, index) => this.renderItem(item))}
				{/* 创建空视图不全整行 */}
				{arr.length > 0 &&
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
		const { server, split, theme } = this.props;
		return (
			<SafeAreaView
				style={[sharedStyles.container, { backgroundColor: themes[theme].auxiliaryBackground }]}
				testID='settings-view'
			>
				<ScrollView
					{...scrollPersistTaps}
					contentContainerStyle={[
						{borderBottomWidth: 0},
						{ borderColor: themes[theme].separatorColor }
					]}
					showsVerticalScrollIndicator={false}
					testID='settings-view-list'
				>
					<View style={[{height: 30}, styles.row]}>
						<Image style={[styles.image,{width:'8%'}]} source={{ uri: 'new_server' }} />
						<MarqueeHorizontal
							textList = {this.Data.text}
							speed = {60}
							width = {Dimensions.get('window').width}
							height = {30}
							direction = {'left'}
							reverse = {false}
							bgContainerStyle = {{backgroundColor : 'withe'}}
							textStyle = {{fontSize : 16,color : 'black'}}
							onTextClick = {(item) => {
							}}
						/>
					</View>
					<View style={[styles.height80, styles.row]}>
						<IconButton
							type='secondary'
							title={this.Data.recharge}
							icon={'logo_onboarding'}
							onPress={this.recharge}
							testID='recharge-button'
							iconsize={ {width:40, height: 30}}
							width='33%'
							theme={theme}
						/>
						<IconButton
							type='secondary'
							title={this.Data.withdraw}
							icon={'logo_onboarding'}
							onPress={this.withdraw}
							testID='withdraw-button'
							iconsize={ {width:40, height: 30}}
							width='33%'
							theme={theme}
						/>
						<IconButton
							type='secondary'
							title={this.Data.gamerecord}
							icon={'logo_onboarding'}
							onPress={() => this.navigateToRoom({view:'BettingrecordView',viewname:'投注记录'})}
							testID='gamerecord-button'
							iconsize={ {width:40, height: 30}}
							width='33%'
							theme={theme}
						/>
					</View>
					<View style={[{ height: 10 }]} />
					{ this.renderView(this.data)}
					<View style={[{ height: 10 }]} />
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withSplit(LotteryhallView)));
