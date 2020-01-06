import React, { Component } from "react";
import {
	View,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity,
	Text,
	Image,
	Dimensions,
	ScrollView,
	Modal,
	Animated
} from "react-native";
import styles from "./radioStyle";
import scrollPersistTaps from '../../utils/scrollPersistTaps';
// 设备屏幕宽高
const { width, height } = Dimensions.get("window");
export default class RadioButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: ""
		};
	}
	static defaultProps = {
		options: {
			value: "value",
			text: "text",
			disabled: "disabled"
		},
		disabledAll: false,
		txtColor: "#555555",
		activeTxtColor: "#FF552E",
		backgroundColor: "#F6F6F6",
		activeBackgroundColor: "#FFEFEB",
		size: [78, 37],
		//seledImg: ''
	};
	/**
	 * @description 点击单选 设置当前选中值 并且传给父组件
	 * @param {any} value 选中值
	 * @memberof RadioModal
	 */
	radioClick(children) {
		if (!this.props.disabledAll) {
			let value = children[this.props.options.value];
			this.setState((pre) => {
				return {
					selected: value
				};
			});
			this.props.onChange(children);
		}
	}
	/**
	 * @description 初始化单选项
	 * @memberof RadioButton
	 */
	radioInit() {
		let init = this.props.selectedValue ? this.props.selectedValue : "";
		this.setState((pre) => {
			return {
				selected: init
			};
		});
	}
	componentDidMount() {
		this.radioInit();
	}
	/**
	 * @description 创建单选配置
	 * @param {any} child 每个子选项的数据
	 * @param {any} index 索引
	 * @param {any} props 是否还有子属性
	 * @returns ReactDOM
	 * @memberof RadioButton
	 */
	createInner(child, index, props) {
		const {
			selectedValue,
			seledImg,
			disabledAll,
			innerStyle,
			txtColor,
			activeTxtColor,
			backgroundColor,
			activeBackgroundColor,
			size
		} = this.props;
		//单选项text
		let itemText = child[props.text];
		//单选项value
		let itemValue = child[props.value];
		//当前选项的禁用情况
		let disabled = child[props.disabled];
		//当前选项的选中情况
		let radioSelect = this.state.selected == itemValue ? true : false;
		return (
			<Radio
				//索引
				index={index}
				//循环key值
				key={index}
				//子元素数据Object
				child={child}
				//展示文案
				text={itemText}
				//radio对应value值
				value={itemValue}
				//禁用情况
				disabled={disabled}
				//选中情况
				radioSelect={radioSelect}
				//选中值
				selectedValue={selectedValue}
				//点击事件
				onclick={this.radioClick.bind(this)}
				//选中图标
				seledImg={seledImg}
				//是否全部禁用
				disabledAll={disabledAll}
				//radio字体颜色
				txtColor={txtColor}
				activeTxtColor={activeTxtColor}
				backgroundColor={backgroundColor}
				activeBackgroundColor={activeBackgroundColor}
				size={size}
			/>
		);
	}
	render() {
		const { dataOption, options, size } = this.props;
		return (
			<ScrollView
				{...scrollPersistTaps}
				contentContainerStyle={[
					{flexDirection:'row'},
				]}
				horizontal={true} // 横向
				showsHorizontalScrollIndicator ={false}
				testID='settings-view-list'
			>
				{dataOption &&
				dataOption.map((item, index) => this.createInner(item, index, options))}

			</ScrollView>
		);
	}
}

class Radio extends Component {
	constructor(props) {
		super(props);
	}
	click(value) {
		if (this.props.disabled) {
			return;
		} else {
			this.props.onclick(value);
		}
	}
	render() {
		const {
			child,
			radioSelect,
			activeBackgroundColor,
			backgroundColor,
			activeTxtColor,
			txtColor,
			seledImg,
			size,
			text
		} = this.props;
		let style={
			flexDirection:'column',
			alignItems: "center",
			width: size[0],
			height: size[1],
			justifyContent:'center',
		}
		if(!radioSelect){
			style.backgroundColor = backgroundColor;
		}
		return (
			<TouchableOpacity activeOpacity={1} onPress={this.click.bind(this, child)} >
				<View
					style={[
						style
					]}>

					<Text
						style={[
							styles.textColor,
							{ color: radioSelect ? 'red' : txtColor ,flex:9,marginTop:size[1]/3,}
						]}>
						{text}
					</Text>
					<View
						style={[
							{
								backgroundColor: radioSelect ? 'red' : backgroundColor,
								width: size[0],
								height: 1,
								flex:1,
							}
						]}/>
				</View>
			</TouchableOpacity>
		);
	}
}
