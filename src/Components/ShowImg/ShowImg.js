import React, { useState } from 'react';

const ShowImg = ({imgs}) => {
    const {img, _id} = imgs;

    // handle checkbox
    const [selectedImages, setSelectedImages] = useState([]);

    const handleCheckboxChange = (imageId) =>{
        if(selectedImages.includes(imageId)){
            setSelectedImages(selectedImages.filter((_id) => _id !== imageId ));
        } else{
            setSelectedImages([...selectedImages, imageId])
        }
    }

    return (
        <div>
            {/* data show by car element */}
            <div  className="card card-compact shadow-xl w-full relative group " >
                <figure><img className='object-cover rounded-lg w-full h-full' src={img} alt="images" /></figure>
                
                {/* checkbox */}
                <div
                    className={`absolute top-2 right-2 ${
                    selectedImages.includes(_id) ? "opacity-100" : "opacity-0"
                    } group-hover:opacity-100`}>
                    <input
                    type="checkbox"
                    className="w-5 h-5 checkbox border-2 border-black bg-white hover:bg-black  appearance-none"
                    checked={selectedImages.includes(_id)}
                    onChange={() => handleCheckboxChange(_id)}
                    />
                </div>
                

                
                
                
            </div>
        </div>
    );
};

export default ShowImg;