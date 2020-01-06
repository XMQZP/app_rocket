import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Keyboard, Alert, Image, Text,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import equal from 'deep-equal';
import sharedStyles from '../Styles';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import RocketChat ,{RocketChat_user} from '../../lib/rocketchat';
import log from '../../utils/log';
import Button from '../../containers/Button';
import { setUser as setUserAction } from '../../actions/login';
import { themes } from '../../constants/colors';
import { withTheme } from '../../theme';
import { themedHeader } from '../../utils/navigation';
import I18n from '../../i18n';
import PopUp from '../../containers/PopUp';

class gameView extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => {
		const title = navigation.getParam('title', 'Rocket.Chat');
		return{
			...themedHeader(screenProps.theme),
			title: (navigation.state.params.gameType?'(官)':'(传)')+title
		}

	}

	static propTypes = {
		theme: PropTypes.string
	}

	state = {
		coins:0,
	}

	async componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		const { user } = this.props;
		if (user !== nextProps.user) {
			this.init(nextProps.user);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!equal(nextState, this.state)) {
			return true;
		}
		if (!equal(nextProps, this.props)) {
			return true;
		}
		return false;
	}

	render() {
		const { theme } = this.props;
		return <SafeAreaView
			style={[sharedStyles.container, { backgroundColor: themes[theme].auxiliaryBackground }]}
			testID='settings-view'
		>
			<View style={[{flexDirection:'row', alignItems: 'center',flex:1,backgroundColor: 'green'}]}>
				<View style={[{flex:1, height:'100%',backgroundColor: themes[theme].auxiliaryBackground }]}>
					<Button
						type='secondary'
						title={''}
						onPress={()=>Alert.alert('123')}
						testID='recharge-button'
						theme={theme}
					/>
				</View>
				<View style={[{flex:1, height:'100%',backgroundColor: themes[theme].auxiliaryBackground }]}>
					<Button
						title={'筛选'}
						onPress={() => {
							this.popUp.show()
						}}
						type={''}
						theme={theme}
					/>
				</View>
				<Text style={[{textAlign:'center',flex:1}]}>
					{`余额：${this.state.coins}元`}
				</Text>
			</View>
			<View style={[{ width:'100%',height: 1 }]} />
			<View style={[{flex:10,backgroundColor: 'red' }]}>
				<ScrollView
					{...scrollPersistTaps}
					contentContainerStyle={[
						{borderBottomWidth: 0},
						{ borderColor: themes[theme].separatorColor }
					]}
					showsVerticalScrollIndicator={false}
					testID='settings-view-list'
				>
					<TouchableOpacity  onPress={()=>{}}  activeOpacity={0.2} focusedOpacity={0.5}>
						<View style=  {{justifyContent:'center',alignItems:'center',width:128,height:128,backgroundColor:'#841584'}}>
							<Image source={{ uri: 'new_server' }} style={{ width: 32, height: 27 }} fadeDuration={0} />
							<Text style={{color:'#ffffff'}}>ImageButton</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity  onPress={()=>{}}  activeOpacity={0.2} focusedOpacity={0.5}>
						<View style=  {{justifyContent:'center',alignItems:'center',width:128,height:128,backgroundColor:'#841584'}}>
							<Image source={{ uri: 'new_server' }} style={{ width: 32, height: 27 }} fadeDuration={0} />
							<Text style={{color:'#ffffff'}}>ImageButton</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity  onPress={()=>{}}  activeOpacity={0.2} focusedOpacity={0.5}>
						<View style=  {{justifyContent:'center',alignItems:'center',width:128,height:128,backgroundColor:'#841584'}}>
							<Image source={{ uri: 'new_server' }} style={{ width: 32, height: 27 }} fadeDuration={0} />
							<Text style={{color:'#ffffff'}}>ImageButton</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity  onPress={()=>{}}  activeOpacity={0.2} focusedOpacity={0.5}>
						<View style=  {{justifyContent:'center',alignItems:'center',width:128,height:128,backgroundColor:'#841584'}}>
							<Image source={{ uri: 'new_server' }} style={{ width: 32, height: 27 }} fadeDuration={0} />
							<Text style={{color:'#ffffff'}}>ImageButton</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity  onPress={()=>{}}  activeOpacity={0.2} focusedOpacity={0.5}>
						<View style=  {{justifyContent:'center',alignItems:'center',width:128,height:128,backgroundColor:'#841584'}}>
							<Image source={{ uri: 'new_server' }} style={{ width: 32, height: 27 }} fadeDuration={0} />
							<Text style={{color:'#ffffff'}}>ImageButton</Text>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</View>

			<View style={[{flex:1,backgroundColor:'pink'}]}>
				<Text style={[{textAlign:'center'}]}>
					{`余额：${this.state.coins}元`}
				</Text>
			</View>
			<PopUp ref={ref => this.popUp = ref} transparency={0.2} modalBoxHeight={300}>
				<View style={[{ backgroundColor: themes[theme].separatorColor, width:'100%',height: 0.4}]}/>
			</PopUp>
		</SafeAreaView>
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
	setUser: params => dispatch(setUserAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(gameView));
