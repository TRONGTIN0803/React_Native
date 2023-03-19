import { createContext, useState } from "react";

//su dung kho,goi thang nay
export const AppConText = createContext();

//tao kho
export const AppConTextProvider = (props) => {

    const { children } = props;
    const [isLogin, setisLogin] = useState(false);
    

    return (
        //tat ca man hinh phai nam trong thang nay

        //*key {navigation,route}, children
        <AppConText.Provider value={{ isLogin, setisLogin}}>
            {children}
        </AppConText.Provider>
    )


}