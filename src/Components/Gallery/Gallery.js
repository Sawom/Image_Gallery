import React, { useState } from 'react';
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

    // handle checkbox
    const [selectedImages, setSelectedImages] = useState([]);

    const handleCheckboxChange = (imageId) =>{
        if(selectedImages.includes(imageId)){
            setSelectedImages(selectedImages.filter((_id) => _id !== imageId ));
        } else{
            setSelectedImages([...selectedImages, imageId])
        }
    }

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
                        // reset();
                        // alert image added
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
    
    // images delete
    const handleDeleteImages = () =>{
        selectedImages.forEach(async(imageId)=>{
            await axios.delete(`http://localhost:5000/imgdata/${imageId}`)
            .then(res=>{
                if(res.data.deletedCount > 0){
                    refetch();
                    // delete message alert
                    Swal.fire(
                            'Deleted!',
                            'images have been deleted.',
                            'success'
                    )
                    setSelectedImages([]);    
                }
            })
        })
    }

    // drag and drop
   


    return (
        <div className='container mx-auto mb-10 '>
            
            {/* condition to show selected images and delete button */}
            <div className="navbar bg-base-100">
                {
                    selectedImages.length === 0 ?
                    <p className='text-xl font-bold navbar-start'> Gallery </p>
                    
                    :  
                    <>
                        <p className='text-xl font-bold navbar-start'> {selectedImages.length} Files Selected </p>
                        <span className='navbar-end'><button onClick={ ()=> handleDeleteImages()} className="btn btn-ghost text-red-600">Delete files</button></span>
                    </>
                }
            </div>

            {/* it is a divider that show an underline */}
            <div className="divider"></div>
            <br />

            <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-6'>
                {
                    imgdata.map( (imgs, index) => (
                        <div key={imgs._id}  className={
        "group shadow-xl  relative before:content-[''] before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move" +
        (index === 0 ? " md:col-span-2 md:row-span-2" : " col-span-1") +
        (imgdata.find((photo) => photo.id === imgs._id)
          ? " opacity-100"
          : " hover:before:bg-black/50")
      } 

    
      
      

       >
                            <figure><img className='object-cover rounded-lg w-full ' src={imgs.img} alt="images" /></figure>
                            
                            {/* checkbox handle */}
                            <div
                                className={`absolute top-2 right-2 ${
                                selectedImages.includes(imgs._id) ? "opacity-100" : "opacity-0"
                                } group-hover:opacity-100`}>
                                <input
                                type="checkbox"
                                className="w-5 h-5 checkbox border-2 border-black bg-white hover:bg-black  appearance-none"
                                checked={selectedImages.includes(imgs._id)}
                                onChange={() => handleCheckboxChange(imgs._id)}
                                />
                            </div>
                
                        </div>
                    ) )
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