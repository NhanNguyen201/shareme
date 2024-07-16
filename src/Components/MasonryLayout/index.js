import Mansonry from 'react-masonry-css'
import { Pin } from '..'

const breakPointsObj = {
    default: 4,
    3000 : 6, // 6
    2000 : 5, // 5
    1200 : 3, //3
    1000 : 2, //2
    500 : 1  //1
}

export default function MasonryLayout({pins}) {
    return (
        <Mansonry className='flex animate-slide-fwd' breakpointCols={breakPointsObj}>
            {pins.map(pin => <Pin key={pin._id} pin={pin} className='w-max'/>)}
        </Mansonry>
    )
}
