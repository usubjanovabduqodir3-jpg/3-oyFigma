import havitGamepad from '../assets/Frame 611.png'
import keyboard from '../assets/ak-900-01-500x500 1.png'
import monitor from '../assets/g27cq4-500x500 1.png'
import chair from '../assets/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash 1.png'
import coat from '../assets/Frame 605.png'
import duffleBag from '../assets/547953_9C2ST_8746_001_082_0000_Light-Gucci-Savoy-medium-duffle-bag 1.png'
import cpuCooler from '../assets/gammaxx-l240-argb-1-500x500 1.png'
import bookshelf from '../assets/sam-moghadam-khamseh-L_7MQsHl_aU-unsplash 1.png'
import dogFood from '../assets/Frame 604.png'
import camera from '../assets/Frame 604 (1).png'
import curology from '../assets/Curology.png'
import laptop from '../assets/Frame 604 (2).png'
import electricCar from '../assets/Frame 608.png'
import cleats from '../assets/Copa_Sense 1.png'
import shooterGamepad from '../assets/Frame 608 (1).png'
import satinJacket from '../assets/Frame 608 (2).png'

export const flashProducts = [
  {
    id: 1,
    title: 'HAVIT HV-G92 Gamepad',
    price: 120,
    oldPrice: 160,
    discount: '-40%',
    rating: 5,
    reviews: 88,
    img: havitGamepad,
  },
  {
    id: 2,
    title: 'AK-900 Wired Keyboard',
    price: 960,
    oldPrice: 1160,
    discount: '-35%',
    rating: 4.5,
    reviews: 75,
    img: keyboard,
  },
  {
    id: 3,
    title: 'IPS LCD Gaming Monitor',
    price: 370,
    oldPrice: 400,
    discount: '-30%',
    rating: 5,
    reviews: 99,
    img: monitor,
  },
  {
    id: 4,
    title: 'S-Series Comfort Chair',
    price: 375,
    oldPrice: 400,
    discount: '-25%',
    rating: 4.5,
    reviews: 99,
    img: chair,
  },
]

export const bestSellingProducts = [
  {
    id: 101,
    title: 'The north coat',
    price: 260,
    oldPrice: 360,
    rating: 5,
    reviews: 65,
    img: coat,
  },
  {
    id: 102,
    title: 'Gucci duffle bag',
    price: 960,
    oldPrice: 1160,
    rating: 5,
    reviews: 65,
    img: duffleBag,
  },
  {
    id: 103,
    title: 'RGB liquid CPU Cooler',
    price: 160,
    oldPrice: 170,
    rating: 4.5,
    reviews: 65,
    img: cpuCooler,
  },
  {
    id: 104,
    title: 'Small BookSelf',
    price: 360,
    oldPrice: null,
    rating: 5,
    reviews: 65,
    img: bookshelf,
  },
]

export const exploreProducts = [
  {
    id: 201,
    title: 'Breed Dry Dog Food',
    price: 100,
    rating: 3,
    reviews: 35,
    isNew: false,
    img: dogFood,
  },
  {
    id: 202,
    title: 'CANON EOS DSLR Camera',
    price: 360,
    rating: 4,
    reviews: 95,
    isNew: false,
    img: camera,
  },
  {
    id: 203,
    title: 'ASUS FHD Gaming Laptop',
    price: 700,
    rating: 5,
    reviews: 325,
    isNew: false,
    img: laptop,
  },
  {
    id: 204,
    title: 'Curology Product Set',
    price: 500,
    rating: 4,
    reviews: 145,
    isNew: false,
    img: curology,
  },
  {
    id: 205,
    title: 'Kids Electric Car',
    price: 960,
    rating: 5,
    reviews: 65,
    isNew: true,
    colors: ['#db4444', '#000000'],
    img: electricCar,
  },
  {
    id: 206,
    title: 'Jr. Zoom Soccer Cleats',
    price: 1160,
    rating: 5,
    reviews: 35,
    isNew: false,
    colors: ['#eeff00', '#db4444'],
    img: cleats,
  },
  {
    id: 207,
    title: 'GP11 Shooter USB Gamepad',
    price: 660,
    rating: 4.5,
    reviews: 55,
    isNew: true,
    colors: ['#000000', '#db4444'],
    img: shooterGamepad,
  },
  {
    id: 208,
    title: 'Quilted Satin Jacket',
    price: 660,
    rating: 4.5,
    reviews: 55,
    isNew: false,
    colors: ['#184a48', '#db4444'],
    img: satinJacket,
  },
]

// Wishlist sahifasidagi "Just For You" bloki — explore ro'yxatidagi mahsulotlar
// (avval Wishlist.jsx ichida bir xil ma'lumot takror yozilgan edi).
const RECOMMENDED_IDS = [205, 206, 207, 208]

export const recommendedProducts = exploreProducts.filter((p) =>
  RECOMMENDED_IDS.includes(p.id)
)
