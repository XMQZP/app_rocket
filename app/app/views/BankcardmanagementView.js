import React from 'react';
import PropTypes from 'prop-types';
import {
	Keyboard, Text, ScrollView, View, StyleSheet, Alert, RefreshControl, Picker, Image, ImageBackground
} from 'react-native';
import {storage} from '../lib/storage';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import sharedStyles from './Styles';
import { loginRequest as loginRequestAction } from '../actions/login';
import { STATUS_COLORS, themes } from '../constants/colors';
import { withTheme } from '../theme';
import { themedHeader } from '../utils/navigation';
import Button from  '../containers/Button'
import Separator from '../containers/Separator';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import user from '../lib/methods/user';

class BankcardmanagementView extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => {
		const title = navigation.getParam('title', 'Rocket.Chat');
		return {
			title,
			...themedHeader(screenProps.theme)
		};
	}

	static propTypes = {
		navigation: PropTypes.object,
	}

	static defaultProps = {

	}

	constructor(props) {
		super(props);
		this.state = {
			bankdata:[],
		};
		this.refreshing= false;

		storage.load('bankinfo',(data) => {
			if (data){
				this.setState({bankdata:data});
			}
		})
	}
	renderSeparator = () => {
		const { theme } = this.props;
		return <Separator style={{height:1}} theme={theme} />;
	}

	game = (lang) => {
		this.setState({language:lang})
	}
	renderItem = ( item ) => {
		const { _card_number, _card_bank_name,_card_body } = item;
		const { theme } = this.props;
		return (
		<View
			style={[ {width: '100%', height:230,marginTop:10}]}
		>
			<ImageBackground
				style={[ {
					width: '100%', height: '100%', alignItems: 'center'
				}]}
				source={require('../static/images/cheque-guarantee-card.png')}
			>
				<Text style={[
					{...sharedStyles.textBold,fontSize: 17},
					{fontSize: 30,marginTop: 32,color: 'white',...sharedStyles.textRegular},
				]}
				>
					{_card_body}
				</Text>
				<View
					style={[{
						justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%',marginTop: -30
					}]}
				>
					<Text style={[
						{...sharedStyles.textBold,fontSize: 17},
						{fontSize: 30,color: 'white',...sharedStyles.textRegular},
						{color:'black'}]}
					>
						{_card_number}
					</Text>
					<Text style={[
						{...sharedStyles.textBold,fontSize: 17},
						{fontSize: 30,color: 'white',...sharedStyles.textRegular},
						{color:'black'}]}
					>
						{_card_bank_name}
					</Text>
				</View>
			</ImageBackground>
		</View>
		);
	}


	render() {
		const { navigation,theme } = this.props;
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
					refreshControl={
						<RefreshControl
							refreshing={this.refreshing}
							onRefresh={ async() => {
								let res = await user.getBankCards();
								if (res.err == 0) {
									storage.save('bankinfo', res.ret)
								}
								this.setState({ refreshing: this.refreshing,bankdata:res.ret })
							}
							}
						/>
					}
				>
					{(this.state.bankdata).map(service => this.renderItem(service))}
					{this.state.bankdata.length < 5 && <Button
						title={'添加银行卡'}
						onPress={() => {
							navigation.navigate('AddbankcardView',{title: '添加银行卡'});
						}}
						type={''}
						style={[{height:50,marginTop:20}]}
						theme={theme}
					/>}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	loginRequest: params => dispatch(loginRequestAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(BankcardmanagementView));

