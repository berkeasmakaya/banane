import React from "react";
import { Text, View } from "react-native";
import styles from './MessageCard.style';
import { formatDistance, parseISO, subDays } from "date-fns";
import { tr } from "date-fns/locale";

const MessageCard = ({message}) => {
    const formattedDate = formatDistance(parseISO(message.date), new Date(), {
        addSuffix:true,
        locale:tr,
    });
    return(
        <View style={styles.container}>
            <View style={styles.inner_container}>
                <Text style={styles.user}>{message.username}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <Text style={styles.title}>{message.text}</Text>
        </View>
    )
}

export default MessageCard;