import React from 'react';
import PropTypes from 'prop-types';
import {
	View, Text, ImageBackground, TouchableOpacity
} from 'react-native';

import styles from './styles';

export default class Button extends React.PureComponent {
	static propTypes = {
		title: PropTypes.string,
		color: PropTypes.string,
		textcolor: PropTypes.string,
		icon: PropTypes.node.isRequired,
		opacity: PropTypes.number,
		width: PropTypes.string,
		onPress: PropTypes.func
	}

	static defaultProps = {
		title: 'Press me!',
		onPress: () => alert('It works!')
	}

	state = {
		active: false
	};

	render() {
		const {
			title, onPress, icon, color, opacity, width, textcolor
		} = this.props;
		// eslint-disable-next-line no-unused-vars
		const { active } = this.state;
		return (
			<TouchableOpacity
				style={[{ width, height: '100%' }]}
				onPress={onPress}
				onPressIn={() => this.setState({ active: true })}
				onPressOut={() => this.setState({ active: false })}
			>
				<ImageBackground
					style={[styles.backgroundImage, {
						justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'
					}]}
					source={icon}
				>
					<View
						style={[{
							justifyContent: 'center', alignItems: 'center', opacity, width: '100%', height: '100%', backgroundColor: color
						}]}
					><Text style={[styles.buttonTitle, styles.infoText30,{color:textcolor}]}>{title}</Text>
					</View>
				</ImageBackground>
			</TouchableOpacity>
		);
	}
}
