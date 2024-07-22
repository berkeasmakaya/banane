import React, {useState}from "react";
import { Text, View} from "react-native";
import styles from './Sign.style';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { Formik } from "formik";
import auth from "@react-native-firebase/auth";
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";

const initalFormValues = {
    usermail:'',
    password:'',
    repassword:'',
}


function Sign({navigation}){  
    const [loading, setLoading] = useState(false);

    const handleLogin  = () => {
        navigation.goBack();
    }

    async function handleFormSubmit(formValues){
        if (formValues.password !== formValues.repassword) {
            showMessage({
                message:'Şifreler uyuşmuyor!',
                type:'danger'
            })
            return;
        }
        try {
            setLoading(true)
            await auth().createUserWithEmailAndPassword(
                formValues.usermail,
                formValues.password
            );
            showMessage({
                message:"Kullanıcı Başarıyla Oluşturuldu.",
                type:"success"
            })
            navigation.navigate("LoginPage")
            setLoading(false)
        } catch (error) {
            showMessage({
                message:authErrorMessageParser(error.code),
                type:"danger"
            })
            setLoading(false)
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}>banane?</Text>
            <Formik initialValues={initalFormValues} onSubmit={handleFormSubmit}>
            {({values, handleChange, handleSubmit}) => (
                <>
                    <Input 
                        value={values.usermail}
                        onType={handleChange('usermail')}
                        placeholder="e-postanızı giriniz"
                    />
                    <Input
                        onType={handleChange('password')}
                        value={values.password}
                        placeholder="şifrenizi giriniz"
                        isSecure
                    />
                    <Input
                        onType={handleChange('repassword')}
                        value={values.repassword}
                        placeholder="şifrenizi tekrar giriniz"
                        isSecure
                    />
                    <Button text="Giriş Yap" onPress={handleSubmit} loading={loading} />
                </>
            )}
            </Formik>
            <Button text="Geri" theme="secondary" onPress={handleLogin} />
        </View>
    )
}

export default Sign;