import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'
import shareVid from '../../assets/share.mp4'
import logoWhite from '../../assets/logowhite.png'
import { jwtDecode } from "jwt-decode";
import { client } from '../..//sanityClient'
export default function Login() {

    const navigate = useNavigate();
    const responseGoogle = (response) => {
        const decoded = jwtDecode(response.credential)
        console.log("decoded: ", decoded)
        const doc = {
            _id: decoded.sub,
            _type: 'user',
            name: decoded.name,
            gmail: decoded.email,
            image: decoded.picture
        }
        localStorage.setItem("shareme-user", JSON.stringify(doc))
        client.createIfNotExists(doc)
        .then(() => {
            navigate('/', { replace: true})
        })
    }
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVid}
                    type='videos/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover' 
                />
                <div className="absolute  flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img  src={logoWhite} width={130} alt="logo"/>
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
