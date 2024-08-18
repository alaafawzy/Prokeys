import axios from "axios";
const baseUrl = 'https://api.111prokeys.com/'

export const isAuthenticated = () => {
    const userToken = localStorage.getItem('USER');
    if (!userToken) {
        return null
    }
    return JSON.parse(userToken);
};
export const LoginApi = async (user) => {
    let Obj = {
        data: "",
        status: true
    }
    try {
        const { data } = await axios.post(
            `${baseUrl}/login`,
            {
                email: user.Email,
                password: user.Password
            }
        );
        Obj.data = data
        Obj.status = true
    } catch (error) {
        Obj.data = ""
        Obj.status = false
    }
    return Obj
};

export const RegisterApi = async (user) => {
    let Obj = {
        data: "",
        status: true
    }
    try {
        let { data } = await axios.post(`${baseUrl}/register`, {
            "firstName": user.Name.split(' ')[0],
            "lastName": user.Name.split(' ')[1],
            "email": user.Email,
            "phone": user.Phone,
            "password": user.Password,
        });
        Obj.data = data
        Obj.status = true
    } catch (error) {
        Obj.data = ""
        Obj.status = false
    }
    return Obj
};
export const sendMessage = async (message) => {
    let Obj = {
        data: "",
        status: true
    }
    try {
        let { data } = await axios.post(`${baseUrl}/contact-us/create`, {

            "name": message.Name,
            "email": message.Email,
            "companyName": message.Company,
            "phone": message.Phone,
            "message": message.Phone
        }, {
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json"
            }
        });
        Obj.data = data
        Obj.status = true
    } catch (error) {
        Obj.data = ""
        Obj.status = false
    }
    return Obj
};