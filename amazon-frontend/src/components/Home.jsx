import Banner from "./Banner"
import FeaturedElectronics from "./FeaturedElectronics"
import FeaturedGamingProds from "./FeaturedGamingProds"
import FeaturedHomeProds from "./FeaturedHomeProds"
import FeaturedToyProds from "./FeaturedToyProds"
import Banner1 from "./Banner1"
import Header from "./Header"
import ProdInfo from "./ProdInfo"
import FeaturedClothProds from "./FeaturedClothProds"
import Footer from "./Footer"
import PropTypes from 'prop-types';

function Home(props){
    return (
        <>
        <Header cartLength={props.cartLength} searchName={props.searchName} productdes={props.productdes}></Header>
        <Banner productdes={props.productdes} ></Banner>
        <FeaturedHomeProds productdes={props.productdes} ></FeaturedHomeProds>
        <FeaturedElectronics productdes={props.productdes} ></FeaturedElectronics>
        <ProdInfo></ProdInfo>
        <FeaturedGamingProds productdes={props.productdes} ></FeaturedGamingProds>
        <FeaturedToyProds productdes={props.productdes} ></FeaturedToyProds>
        <Banner1></Banner1>
        <FeaturedClothProds productdes={props.productdes} ></FeaturedClothProds>
        <Footer></Footer>
        </>
    )
}

Home.propTypes = {
    searchName:PropTypes.func.isRequired,
    productdes:PropTypes.func.isRequired,
    cartLength : PropTypes.number.isRequired
}

export default Home