import React, { useEffect, useState } from 'react';
import ShowImg from '../ShowImg/ShowImg';

const Gallery = () => {
    const [imgdata, setImgdata] = useState([]);

    // load all images from database
    useEffect( ()=>{
        fetch('http://localhost:5000/imgdata')
            .then(res => res.json())
            .then( data => {
                setImgdata(data)
                console.log(data)
            });
    } )

    return (
        <div className='container mx-auto'>
            <p className='text-center mt-10 text-2xl font-semibold'> Images Gallery </p>
             <div className="divider"></div>
            <br />
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                {
                    imgdata.map( (imgs) => <ShowImg 
                        key={imgs._id} imgs={imgs}
                    ></ShowImg> )
                }
            </div>
        </div>
    );
};

export default Gallery;