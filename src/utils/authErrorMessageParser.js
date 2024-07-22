export default function(errorCode){
    switch (errorCode) {
        case "auth/invalid-email":
            return "Geçersiz E-posta Adresi"
        case "auth/email-already-exists":
            return "Kullanıcı Zaten Mevcut"
        case "auth/user-not-found":
            return "Kullanıcı Bulunamadı"
        case "auth/weak-password":
            return "Zayıf Parola"
        default:
            return errorCode;
    }
}