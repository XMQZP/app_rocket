import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';

import { themes } from '../constants/colors';
import DisclosureIndicator from '../containers/DisclosureIndicator';
import { isTablet } from '../utils/deviceInfo';
import { moderateScale, verticalScale } from '../utils/scaling';
import sharedStyles from '../views/Styles';

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: isTablet ? 'center' : 'flex-start'
	},
	onboarding: {
		alignSelf: 'center',
		marginTop: verticalScale(30),
		marginBottom: verticalScale(35),
		maxHeight: verticalScale(150),
		resizeMode: 'contain',
		width: 309,
		height: 250
	},
	title: {
		...sharedStyles.textBold,
		letterSpacing: 0,
		fontSize: moderateScale(24),
		alignSelf: 'center',
		marginBottom: verticalScale(8)
	},
	subtitle: {
		...sharedStyles.textRegular,
		fontSize: moderateScale(16),
		color: '#54585E',
		alignSelf: 'center'
	},
	buttonsContainer: {
		marginBottom: verticalScale(10),
		marginTop: verticalScale(30)
	},
	buttonContainer: {
		marginHorizontal: 15,
		marginVertical: 5,
		flexDirection: 'row',
		height: 60,
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 2
	},
	buttonCenter: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	buttonTitle: {
		...sharedStyles.textSemibold,
		fontSize: 17
	},
	buttonSubtitle: {
		...sharedStyles.textRegular,
		fontSize: 15
	},
	buttonIconContainer: {
		width: 65,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonIcon: {
		marginHorizontal: 10,
		width: 20,
		height: 20
	},
	buttonActive: {
		opacity: 0.5
	},
	closeModal: {
		position: 'absolute',
		left: 15
	}
});

export default class IconButton extends React.PureComponent {
	static propTypes = {
		title: PropTypes.string,
		subtitle: PropTypes.string,
		type: PropTypes.string,
		width: PropTypes.string,
		theme: PropTypes.string,
		iconsize: PropTypes.node.isRequired,
		flexDirection: PropTypes.string,
		icon: PropTypes.node.isRequired,
		testID: PropTypes.string.isRequired,
		onPress: PropTypes.func
	}

	static defaultProps = {
		title: 'Press me!',
		type: 'primary',
		iconsize: { width: 32, height: 27 },
		onPress: () => alert('It works!')
	}

	state = {
		active: false
	};

	render() {
		const {
			title, subtitle, type, onPress, icon, testID, theme, width, flexDirection, iconsize
		} = this.props;
		const { active } = this.state;
		const activeStyle = active && styles.buttonActive;
		const isPrimary = (type === 'primary');
		const buttonContainerStyle = {
			backgroundColor: isPrimary ? themes[theme].actionTintColor : themes[theme].focusedBackground,
			borderColor: isPrimary ? themes[theme].actionTintColor : themes[theme].borderColor
		};

		return (
			<TouchableWithoutFeedback
				accessible={false}
				onPress={onPress}
				onPressIn={() => this.setState({ active: true })}
				onPressOut={() => this.setState({ active: false })}
			>
				<View style={[{ width, height: '100%' ,justifyContent: 'center',alignItems: 'center',flexDirection:flexDirection}]}>
					<Image source={{ uri: icon }} style={iconsize} />
					<View style={{width:10,height:10}}/>
					<View style={[{flexDirection: flexDirection,justifyContent: 'center'}]}>
						<Text style={[styles.buttonTitle, { color: isPrimary ? themes[theme].buttonText : themes[theme].tintColor }, activeStyle]}>{title}</Text>
						{subtitle ? <Text style={[styles.buttonSubtitle, activeStyle, { color: themes[theme].auxiliaryText }]}>{subtitle}</Text> : null}
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
