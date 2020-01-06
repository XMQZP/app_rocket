import { StyleSheet } from 'react-native';

import sharedStyles from '../Styles';

export default StyleSheet.create({
	sectionSeparatorBorder: {
		...sharedStyles.separatorVertical,
		height: 36
	},
	listWithoutBorderBottom: {
		borderBottomWidth: 0
	},
	infoContainer: {
		padding: 15,
		marginBottom: 40
	},
	infoText: {
		fontSize: 14,
		...sharedStyles.textRegular
	},
	infoText30: {
		fontSize: 30,
		color: 'white',
		...sharedStyles.textRegular
	},
	row: {
		flexDirection: 'row'
	},
	height160: {
		height: 180
	},
	height80: {
		height: 80
	},
	part_1_left: {
		flex: 1
		//borderWidth: 1
		//borderColor: 'red'
	},
	part_1_rigth: {
		flex: 1
		//borderWidth: 1
		//borderColor: 'red'
	},
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 1
	},
	buttonTitle: {
		...sharedStyles.textBold,
		fontSize: 17
	},
});
