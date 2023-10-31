import React from 'react';

const ShowImg = ({imgs}) => {
    const {img} = imgs;
    return (
        <div>
            {/* data show by car element */}
            <div className="card card-compact w-full ">
                <figure><img src={img} alt="images" /></figure>
            </div>
        </div>
    );
};

export default ShowImg;