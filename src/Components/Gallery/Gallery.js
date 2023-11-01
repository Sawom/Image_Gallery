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
        <div className='container mx-auto mb-10 '>
            <p className='text-center mt-10 text-2xl font-semibold'> Images Gallery </p>
             <div className="divider"></div>
            <br />
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    imgdata.map( (imgs) => <ShowImg 
                        key={imgs._id} imgs={imgs}
                    ></ShowImg> )
                }
                <div className='card card-compact w-full shadow-xl'>
                    <div className="card-body">
                        <label className="label"> <p className='font-semibold'>Add Image</p> </label>
                        <input type="file" className="file-input file-input-bordered file-input-ghost file-input-lg w-full max-w-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;