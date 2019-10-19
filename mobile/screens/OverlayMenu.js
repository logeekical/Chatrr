import React, { useState } from 'react';

import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import {mainThemeColors} from './../globals/colors';
import {getScreenDims} from './../globals/helpers/dimensions';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { mainThemeFonts } from './../globals/fonts';
import {  ConfirmDialog } from 'react-native-simple-dialogs';

const OverlayMenu = ({onClose}) => {

  const [exitMenuVisible, setExitMenuVisible] =  useState(false);



    const menu = [{
        id: "chatroom",
        label: "Chat Rooms",
        screen: "RoomList",
    },{
        id: "activechats",
        label: "Active Chats",
        screen: "Conversations"
    },{
        id: "profile",
        label: "Profile",
        screen: "Profile"
    },{
        id: "settings",
        label: "Settings",
        screen: "Settings"
    },{
        id: "contact",
        label: "Contact Us",
        type: "function",

    },{
        id: "rate",
        label: "Rate us",
        type: "function",
    },{
        id:"logout",
        label: "Sign Out",
        type: "function",
        action: () => { 
          setExitMenuVisible(true)
        }
    }]


  return (
    <View style={styles.screen}>
      <ConfirmDialog
        visible={exitMenuVisible}
        title="Sign Out ? "
        onTouchOutside={()=> setExitMenuVisible(false)}
        positiveButton={
          {title: "Yes"}
        }
       negativeButton={
          {title: "Yes"}
        }
      >
        <Text> Helloooo </Text>


      </ConfirmDialog>


      <View style={styles.mainBG}>
        <View style={styles.mainFG}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={mainThemeColors.lightneonpurple}
            translucent={true}
          />
          <View>

          </View>
          <View style={styles.menu}>

          
        <FlatList 
            
            data={menu}
            keyExtractor={(item)=>{
                return item.id
            }}
            renderItem={({item})=>{
                return (
                  <TouchableOpacity
                    onPress={item.action}
                  >
                    <Text
                        style={{
                            fontFamily: mainThemeFonts.family.quicksand('Bold'),
                            fontSize: 30,
                            color: mainThemeColors.light,
                            marginVertical: 10,
                        }}
                    >
                        {item.label}
                    </Text>
                    </TouchableOpacity>
                )
            }}
          />
          </View>
        </View>
      </View>
      <View style={styles.closeContainer}>
          <TouchableOpacity 
             onPress={() => {
                onClose();
              }}
          >
          <Material name={"close-circle"} color={mainThemeColors.lightneonpurple} size={70} />
          </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between"
  },
  mainBG: {
    backgroundColor: mainThemeColors.lightpurple,
    height: getScreenDims().wh * 0.7,
    borderBottomStartRadius: 500,
  },
  mainFG: {
    backgroundColor: mainThemeColors.lightneonpurple,
    height: getScreenDims().wh * 0.6,
    borderBottomStartRadius: 500,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  menu:{
    padding: 10
  },
  closeContainer:{
      alignItems: "center",
      borderColor: "red",
      borderWidth: 0,
      justifyContent: "center",
      marginBottom: 20
  }
});

export default OverlayMenu;