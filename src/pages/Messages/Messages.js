import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import styles from './Messages.style';
import ContentInputModal from "../../components/modal/ContentInput/ContentInputModal";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import parseContentData from "../../utils/parseContentData";
import MessageCard from "../../components/card/MessageCard/MessageCard";


const Messages = () => {
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [contentList, setContentList] = useState([]);

    useEffect(()=>{
        database().ref('/messages')
        .on('value', snapshot => {
            const contentData = snapshot.val();
            const parsedData = parseContentData(contentData || {});
            setContentList(parsedData);
        });
    }, []);

    function handleInputToggle(){
        setInputModalVisible(!inputModalVisible)
    }

    function handleSendContent(content){
        handleInputToggle();
        sendContent(content);
    }

    function sendContent(content) {
        const userMail = auth().currentUser.email;
        
        const contentObject = {
            text:content,
            username:userMail.split('@')[0],
            date: new Date().toISOString(),
        };
        database().ref('/messages').push(contentObject);
    }
    const renderContent = ({item}) => <MessageCard message={item}/>
    
    return(
        <View style={styles.container}>
            <FlatList 
                data={contentList}
                renderItem={renderContent}
            />
            <FloatingButton icon="plus" onPress={handleInputToggle}/>
            <ContentInputModal 
                visible={inputModalVisible} 
                onClose={handleInputToggle}
                onSend={handleSendContent}
            />
        </View>
    )
}

export default Messages;