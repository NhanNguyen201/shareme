import { useState } from "react";
import { v4 as uuid4 } from 'uuid';
import { urlFor, client } from "../../sanityClient";
import { Link, useNavigate } from 'react-router-dom'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser } from "../../utils/fetchUser";
export default function Pin({pin}) {
    const [postHover, setPostHover] = useState(false)
    const navigate = useNavigate()
    const { postedBy, destination, image, _id, save } = pin
    const user = fetchUser()
    const alreadySaved = !!(save?.filter(item => item.postedBy._id === user?._id))?.length
    const isLogin = !!user._id
    const saveBtn = isLogin ? (
        alreadySaved ? (
            <button 
                type="button" 
                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 rounded-3xl hover:shadow-md outline-none"
            >
                {save?.length > 1 ?? `You and ${save?.length - 1} others`} Saved
            </button>
        ):  (
            <button 
                type="button" 
                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 rounded-3xl hover:shadow-md outline-none"
                onClick={e => {
                    e.stopPropagation()
                    savePin(_id)
                }}
            >
                Save
            </button>
        )) : null 
    const savePin = id  => {
        if(!alreadySaved){
            client.patch(id)
                .setIfMissing({save: []})
                .insert('after', 'save[-1]', [{
                    _key: uuid4(),
                    userId: user?._id,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?._id
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload()
                })
        }
    }
    const deletePin = id => {
        client.delete(id)
        .then(() => {
            window.location.reload()
        })
    }
    return (
        <div className="m-2">
            <div 
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                onMouseEnter={e => setPostHover(true)}
                onMouseLeave={e => setPostHover(false)}
                onClick={() => navigate(`/pin/${_id}`)}
            >
                <img className="rounded-lg w-full" src={(urlFor(image).width(250).url())} alt="user-post" />
                {postHover && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
                        style={{ height: '100%'}}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={e => e.stopPropagation()}
                                    className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 outline-none"
                                >
                                    <MdDownloadForOffline/>
                                </a>
                            </div>
                            {saveBtn}
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full ">
                            {destination && (
                                <a 
                                    href={"//" + destination}
                                    target="_blank"
                                    rel="noreferer"
                                    className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity:70 hover:opacity-100 hover:shadow-md'
                                >
                                    <BsFillArrowUpRightCircleFill/>
                                    {destination.length > 20 ? destination.slice(8,20) : destination.slice(8)}
                                </a>
                            )}
                            {postedBy._id === user._id && (
                                <button 
                                type="button" 
                                className="bg-white opacity-70 hover:opacity-100 text-base font-bold text-dark p-2 rounded-3xl hover:shadow-md outline-none"
                                onClick={e => {
                                    e.stopPropagation()
                                    deletePin(_id)
                                }}
                            >
                                <AiTwotoneDelete/>
                            </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link 
                to={`user/${postedBy._id}`}
                className="flex gap-2 mt-2 items-center"
            >
                <img src={postedBy.image} className="w-8 h-8 rounded-full object-cover" alt="user profile"/>
                <p className="font-semibold capitalize">{postedBy.name}</p>
            </Link>
        </div>
    )
}
