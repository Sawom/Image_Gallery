import React, { useEffect, useState } from 'react';
import ShowImg from '../ShowImg/ShowImg';
import { useQuery } from '@tanstack/react-query';

const Gallery = () => {

    // fetch images data
    const{data: imgdata = [],isLoading: loading, refetch } = useQuery({
        queryKey: ['imgdata'],
        queryFn: async()=>{
            const res = await fetch('http://localhost:5000/imgdata');
            return res.json();
        }
    })
    

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