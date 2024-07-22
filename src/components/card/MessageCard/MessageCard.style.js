import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export default StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: colors.darkgreen,
        borderRadius: 10,
      },
      user: {
        color: 'white',
        fontSize: 15,
        marginHorizontal: 3,
      },
      title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        marginHorizontal: 10,
        marginBottom:5,
        paddingLeft:2
      },
      inner_container: {
        padding: 8,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
      },
      date: {
        fontStyle: 'italic',
        color: 'white',
      },
})