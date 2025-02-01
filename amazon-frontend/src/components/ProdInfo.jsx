import {Link} from "react-router-dom"


function ProdInfo(){
    return (
        <>
         <div className='bg-gray-200 grid grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2 px-4 pt-10  w-full '>
            <div className='bg-white p-2 px-4'>
                <h1 className=' font-bold text-xl mb-2'>Pet care</h1>
                <img src='https://images-eu.ssl-images-amazon.com/images/G/02/AISExports_UK_GW/Desktop/AIS_GW_DESKTOP_CATCARD_PETS_758x608._SY608_CB642486966_.jpg' alt='gaming-banner-img'></img>
                <p className='text-blue-800 pt-5 font-semibold'>Shop Now</p>
            </div>
            <div className='bg-white p-2'>
                <h1 className=' font-bold text-xl'>Home Appliances</h1>
                <div className='grid grid-cols-2 gap-2 mt-2'>
                    <div>
                        <img  src='https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-372x232----B08RDL6H79._SY232_CB667322346_.jpg'></img>
                        <p className='text-sm'>air conditioners</p>
                    </div>
                    <div>
                        <img  src='https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B08345R1ZW---372x232._SY232_CB667322346_.jpg'></img>
                        <p className='text-sm'>refrigerators</p>
                    </div>
                    <div className='pt-2'>
                        <img  src='https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B07G5J5FYP._SY232_CB667322346_.jpg'></img>
                       <p className='text-sm'>microwaves</p>
                    </div>
                    <div className='pt-2'>
                        <img  src='https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg'></img>
                        <p className='text-sm'>Machine</p>
                    </div>
                </div>
                <p className='text-blue-800  font-semibold pt-2'>Shop Now</p>
            </div>
            <div className='bg-white p-2 px-3'>
                <h1 className='font-bold text-xl mb-2'>Clothing</h1>
                <div className="flex justify-center">
                <img className="lg:h-[215px] h-[120px]" src='https://m.media-amazon.com/images/I/61VmstpY2KL._SY879_.jpg'></img>
                </div>
                <p className='text-blue-800  font-semibold pt-4'>See More</p>
            </div>
            <div className='bg-white p-2 px-3'>
                <h1 className='font-bold text-xl mb-2'>Toys & Games</h1>
                <img src='https://images-eu.ssl-images-amazon.com/images/G/02/Exports_2023/UK_Exports_2024/DCC_Toys_758x608_V2._SY608_CB558825168_.jpg'></img>
                <p className='text-blue-800  font-semibold pt-4'><Link to="/ToyProducts">See More</Link></p>
            </div>
            </div>
        </>
    )
}
export default ProdInfo;