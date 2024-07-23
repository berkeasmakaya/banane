import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import styles from './Login.style';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { Formik } from "formik";
import auth from "@react-native-firebase/auth";
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";

const initalFormValues = {
    usermail:'',
    password:'',
}

function Login({navigation}){
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        navigation.navigate("SignPage");
    }

    async function handleFormSubmit(formValues){
        try {
            setLoading(true)
            await auth().signInWithEmailAndPassword(
                formValues.usermail, 
                formValues.password
            );
            setLoading(false)
        } catch (error) {
            showMessage({
                message:authErrorMessageParser(error.code),
                type:'danger'
            })
            setLoading(false)
        }
        
    }
    
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.header}>banane?</Text>
            <Formik initialValues={initalFormValues} onSubmit={handleFormSubmit}>
                {({values, handleChange, handleSubmit}) => (
                        <>
                        <Input 
                            value={values.usermail} 
                            placeholder="e-postanızı giriniz..."
                            onType={handleChange('usermail')}
                        />
                        <Input 
                            value={values.password} 
                            placeholder="şifrenizi giriniz..."
                            onType={handleChange('password')}
                            isSecure
                        />
                        <Button text="Giriş Yap" onPress={handleSubmit} loading={loading}/>
                    </>
                )}         
            </Formik>
            <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp}/>
        </ScrollView>
    )
}

export default Login;