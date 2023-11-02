import React, { useEffect, useState } from 'react';
import ShowImg from '../ShowImg/ShowImg';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const Gallery = () => {
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=87dfc5cdbb93451ca3d6aa8a9fc25647` ;

    // fetch images data
    const{data: imgdata = [],isLoading: loading, refetch } = useQuery({
        queryKey: ['imgdata'],
        queryFn: async()=>{
            const res = await fetch('http://localhost:5000/imgdata');
            return res.json();
        }
    })

    // image upload function
    const onSubmit = data =>{
        const formData = new FormData();
        formData.append('image', data.img[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res=> res.json())
        .then(imgResponse =>{
            if(imgResponse.success){
                const imgUrl = imgResponse.data.display_url;
                const data = {img: imgUrl}
                axios.post('http://localhost:5000/imgdata', data)
                .then(data =>{
                    if(data.data.insertedId){
                        refetch();
                        // alert
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Image added!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
            }
        })
    }
    

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
                
                {/* add image using react hook form */}
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='card card-compact w-full shadow-xl'>
                        <div className="card-body">
                            <label className="label"> <p className='font-semibold'>Add Image</p> </label>
                            <input type="file" {...register("img", { required: true })} className="file-input file-input-bordered file-input-ghost file-input-lg w-full max-w-lg" />
                        </div>
                        {/* submit button */}
                        <button  className="btn btn-ghost px-5 mt-2 text-white btn-outline  btn-active btn-sm md:btn-md lg:btn-md"  type="submit"> Add Image </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default Gallery;