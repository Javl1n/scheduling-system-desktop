import { ImgHTMLAttributes } from "react";
import { app } from 'electron';

export default function AppLogoSeait(props: ImgHTMLAttributes<any>) {
    // console.log(app.getPath('appData'))
    return (
        <img {...props} src={"http://scheduling-web.test/storage/Seait.png"} alt="" />
    );
}