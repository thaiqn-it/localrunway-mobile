import {Dimensions, StyleSheet} from "react-native";

export const FULL_WIDTH = Dimensions.get('window').width; //full width
export const FULL_HEIGHT = Dimensions.get('window').height; //full height

export const BOX_RADIUS = 35
export const PRIMARY_COLOR = "#F1A5A5"
export const SUB_PRIMARY_COLOR = "#FAE0E1"
export const CLEAR_COLOR = "#fff"
export const INACTIVE_COLOR = "grey"
export const RESCUE_COLOR = "red"
export const LOGOUT_COLOR = "red"
export const ADOPTION_COLOR = "green"
export const COLD_COLOR = "#0c4271"
export const BACK_BUTTON_COLOR = "#FAE0E1"
export const BACK_GROUND_COLOR_FOR_PET_INFOR = "#F6F6F6"
export const ICON_SIZE = 30

//for BlockCard.js
export const Block_Card_POS_FONT_SIZE = 12

//for Setting
export const Setting_DEVIDE_BORDER_COLOR = "#FAFAFA"

export const defaultStyles = StyleSheet.create({
    button: {
        marginTop: 10,
        minHeight: 60,
        borderWidth: 2,
        borderColor: COLD_COLOR,
        backgroundColor: CLEAR_COLOR,
        padding: 10
    },
    buttonTitle: {
        color: COLD_COLOR
    },
    textBold: {
        fontWeight: "bold"
    },
    shadow: {
        shadowOffset: {},
        shadowOpacity: .2,
        shadowRadius: 20
    }
})