import React, { useState, useRef } from 'react';
import { SvgXml } from 'react-native-svg';
// import Menu from '../../assets/icons/'
import { View, Text, StyleSheet, Image, StatusBar, Animated, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { mainThemeFonts } from './../../globals/fonts';
import { mainThemeColors } from './../../globals/colors';
import OverlayMenu from './../../screens/OverlayMenu';

const RoomListHeader = (props) => {

    const [menuItems, setMenuItems] = useState(props.menu);
    const [currMenuIndex, setCurrMenuIndex] = useState(0);
    const listRef = useRef(null);
    const [shiftDistance, setShiftDistance] = useState(new Animated.Value(0));
    const [menuVisible, setMenuVisible] = useState(false);

    const handleScroll = () => {
        setMenuItems([...menuItems, ...menuItems])
        console.log(currMenuIndex);
        listRef.current.scrollToIndex({index: 1})
        setCurrMenuIndex(currMenuIndex+1)
    }

    const _onViewableItemsChanged = ({ viewableItems, changed }) => {
        console.log("Visible items are", viewableItems);
        console.log("Changed in this iteration", changed);
      };
    
     const  _viewabilityConfig = {
        itemVisiblePercentThreshold: 50
      };

    return <View style={styles.header}>
        {
            menuVisible == true ? 
            <Modal
                animationType={"fade"}
                transparent={true}   
                onRequestClose={()=> Alert.alert('Closing Model', 'Modal is closing now. Thanks!')}
                >
                <OverlayMenu 
                    visible={menuVisible} 
                    onClose={()=>{
                        setMenuVisible(false)
                    }}
                />
            </Modal>
            :
            null
        }
        
        <StatusBar
        barStyle="dark-content"
        backgroundColor={mainThemeColors.light}
        translucent={true}
      />
        <View style={styles.headerLeft}>
            {/* {
                menuItems.map((item, index) => {
                    let style = index == currMenuIndex ? 'headerLeftTextMain' : 'headerLeftTextGeneric';
                    return (
                        <Text style={{ ...styles[style], ...styles.headerLeftTextCommon }}>{item}</Text>
                    )
                })
            } */}

            <FlatList
                horizontal
                style={{}}
                data={menuItems}
                ref={listRef}
                keyExtractor={item=> {return item}}
                renderItem={({item, index})=>{
                    console.log(`item is ${item}`)
                    let style = index == currMenuIndex ? 'headerLeftTextMain' : 'headerLeftTextGeneric';
                    return (
                            <Text style={{ ...styles[style], ...styles.headerLeftTextCommon }}>{item}</Text>
                    )
                }}
            />


        </View>
        <View>
                <TouchableOpacity 
                    onPress={()=> {
                        setMenuVisible(!menuVisible);
                    }}
                >
                    <Image
                        style={styles.headerImageRight}
                        source={require('../../assets/icons/menu.png')} />
                    {/* <SvgXml width="200" height="200" xml={Menu} />; */}
                </TouchableOpacity>
        </View>

        
    </View>
}

const styles = StyleSheet.create({
    screen: {
        position: "absolute",
        display: "flex",

        top: 20
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 0,
        borderColor: "blue"
    },
    headerLeft: {
        display: "flex",
        flexDirection: "row",
        borderColor:"black",
        borderWidth: 0,
        width: 300

    },
    headerLeftTextMain: {
        fontFamily: mainThemeFonts.family.quicksand('Bold'),
        left: 0

    },
    headerLeftTextGeneric: {
        fontFamily: mainThemeFonts.family.quicksand('Light'),
        left: 0
    },
    headerLeftTextCommon: {
        fontSize: 40,
        margin: 5
    },
    headerImageRight: {
        marginRight: 10
    },
    overlaymenu:{
        position: "absolute",
        left:-20,
    
    }
});


export default RoomListHeader;

