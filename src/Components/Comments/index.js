import { useState, useEffect, Fragment } from "react"
import {pinCommentQuery} from '../../utils/sanityData'
import { client } from "../../sanityClient"
import { Link, useParams } from 'react-router-dom'



export default function Comments({user}){
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState("")
    const [addingComment, setAddingComment] = useState(false)
    const { pinId } = useParams()

    const addComment = () => {
      if (commentInput) {
        setAddingComment(true);
  
        client.create({
          _type: 'comment',
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          },
          pin: {
            _type: 'reference',
            _ref: pinId
          },
          comment: commentInput

        }).then(async() => {
          await fetchComments()
          setAddingComment(false)
          setCommentInput("")
        })
          
      }
    };
    const fetchComments = async() => {
      const data = await client.fetch(pinCommentQuery(pinId))
      setComments(data)
    }
    useEffect(() => {
      fetchComments()
      // eslint-disable-next-line
    }, [])
    return (
        <Fragment>
          <h2 className="mt-5 text-2xl">Comments</h2>

          <div className="max-h-370 overflow-y-auto">
              {comments.map((item) => (
                  <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                    <img
                      src={item.postedBy?.image}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      alt="user-profile"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{item.postedBy?.name}</p>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                ))}
          </div>
          {user && (
            <div className="flex flex-wrap mt-6 gap-3">
                <Link to={`/user-profile/${user._id}`}>
                  <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                </Link>
                <input
                  className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                  type="text"
                  placeholder="Add a comment"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                  onClick={addComment}
                >
                  {addingComment ? 'Doing...' : 'Done'}
                </button>
              </div>
          )}
        </Fragment>
    )
}