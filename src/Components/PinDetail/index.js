import { useState, useEffect } from "react"
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { client, urlFor } from "../../sanityClient"
import { MasonryLayout } from ".."
import { pinDetailQuery, pinDetailMorePinQuery } from '../../utils/sanityData'
import { Spinner } from ".."
import Comments from "../Comments"

export default function PinDetail({user}) {
    const [pins, setPins] = useState(null)
    const [pinDetail, setPinDetail] = useState(null)
    
    const { pinId } = useParams()
    
    const fetchPinDetails = async() => {
        const query = pinDetailQuery(pinId);

        if (query) {
            const data = await client.fetch(query)
            setPinDetail(data[0]);
            if (data[0]) {
                const query1 = pinDetailMorePinQuery(data[0]);
                client.fetch(query1).then((res) => {
                    setPins(res);
                });
            }
        }
    }
    
    useEffect(() => {
        fetchPinDetails()

    }, [pinId])
    // useEffect(() => {
    //   set
    // }, [pinDetail])
    if(!pinDetail) return <Spinner message="Loading"/>
    
    return (
        <>
        {pinDetail && (
          <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
            <div className="flex justify-center items-center md:items-start flex-initial">
              <img
                className="rounded-t-3xl rounded-b-lg"
                src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
                alt="user-post"
              />
            </div>
            <div className="w-full p-5 flex-1 xl:min-w-620">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <a
                    href={`${pinDetail.image.asset.url}?dl=`}
                    download
                    className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>
                <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                  {pinDetail.destination?.slice(8)}
                </a>
              </div>
              <div>
                <h1 className="text-4xl font-bold break-words mt-3">
                  {pinDetail.title}
                </h1>
                <p className="mt-3">{pinDetail.about}</p>
              </div>
              <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
                <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                <p className="font-bold">{pinDetail?.postedBy.name}</p>
              </Link>
              <Comments user={user}/>  
              
            </div>
          </div>
        )}
        {pins?.length > 0 && (
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
        )}
        {pins ? (
          <MasonryLayout pins={pins} />
        ) : (
          <Spinner message="Loading more pins" />
        )}
      </>
    )
}
