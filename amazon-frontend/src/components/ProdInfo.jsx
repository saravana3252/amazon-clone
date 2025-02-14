import {Link} from "react-router-dom"


function ProdInfo(){
    return (
        <>
         <div className='bg-gray-200 grid grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-2 px-4 pt-10  w-full '>
            <div className='bg-white p-2 lg:px-3 px-3'>
                <h1 className=' font-bold text-xl mb-2 '>Save 30% on Tech!</h1>
                <img src='https://images-eu.ssl-images-amazon.com/images/G/29/Events/2021/IT_fallback_campaigns/XCM_CUTTLE_1321861_1653915_DE_3783397_758x608_2X_IT._SY608_CB639715330_.jpg' alt='gaming-banner-img'></img>
                <p className='text-blue-800 lg:pt-4 pt-3.5 font-semibold'><a href="/electronics">Shop Now</a></p>
            </div>
            <div className='bg-white p-2'>
                <h1 className=' font-bold text-xl'>Home Appliances</h1>
                <div className='lg:grid grid-cols-2 gap-2 lg:mt-2 mt-3 hidden'>
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
                        <p className='text-sm'>washing machine</p>
                    </div>
                </div>
                <div className="lg:hidden mt-2">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/37/Gateway-New/OHL/June2020/SmallKitchenAppliances_CC_758x608._SY608_CB430833266_.jpg"></img>
                </div>
                <p className='text-blue-800  font-semibold pt-2'><a href="/homeproducts">Shop Now</a></p>
            </div>
            <div className='bg-white p-2 px-3'>
                <h1 className='font-bold text-xl mb-2'>Clothing</h1>
                <div className="flex justify-center">
                <img  src='https://images-fe.ssl-images-amazon.com/images/G/35/AU-hq/2024/img/Events/XCM_CUTTLE_2115052_6183719_758x608_2X_en_AU_MensDesktop._SY608_CB539591921_.jpg'></img>
                </div>
                <p className='text-blue-800  font-semibold pt-4'><Link to="/clothingproducts">See More</Link></p>
            </div>
            <div className='bg-white p-2 px-3'>
                <h1 className='font-bold text-xl mb-2'>Toys & Games</h1>
                <img src='https://images-eu.ssl-images-amazon.com/images/G/02/Exports_2023/UK_Exports_2024/DCC_Toys_758x608_V2._SY608_CB558825168_.jpg'></img>
                <p className='text-blue-800  font-semibold pt-4'><a href="/toyproducts">See More</a></p>
            </div>
            </div>
        </>
    )
}
export default ProdInfo;