import { useState, useEffect } from 'react'
import { MasonryLayout, Spinner } from '..'
import { useParams } from 'react-router-dom'
import { client } from "../../sanityClient"

import { feedQuery, searchQuery } from '../../utils/sanityData'

export default function Feed() {
    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState([])
    const { categoryId } = useParams()
    useEffect( () => {
        const getFeed = async() => {
            if(categoryId) {
                const query = searchQuery(categoryId);
                const data = await client.fetch(query)
                setLoading(false)
                setPins(data)
            } else {
                const data = await client.fetch(feedQuery);
                setLoading(false)
                setPins(data)
            }
        }
        // call getFeed
        setLoading(true)
        getFeed()
    }, [categoryId])
   
    if(loading) return <Spinner message="We are adding new ideas to your feed !"/>
    return (
        <div>
            {pins && <MasonryLayout pins={pins}/>}
        </div>
    )
}
