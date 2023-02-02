import cors from "cors";
import * as dotenv from 'dotenv';
import express from "express";
import { MongoClient } from "mongodb";
import { movieRouter } from './routes/movies.js';
import { showRouter } from './routes/shows.js';
import { usersRouter } from './routes/users.js';
dotenv.config();

const app     = express();

app.use(cors()); 

// console.log(process.env.MONGO_URL);
const PORT = process.env.PORT;

// const movies = [
//     {
//       id: 1,
//       name: "The Dark Knight",
//       poster: "https://i.pinimg.com/564x/d7/e6/d1/d7e6d1128af050e5e722591ab39b7867.jpg",
//       rating: 9,
//       summary: "After Gordon, Dent and Batman begin an assault on Gotham's organised crime, the mobs hire the Joker, a psychopathic criminal mastermind who offers to kill Batman and bring the city to its knees.",
//       trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
//       language: "english",
//       casts: [
//         {
//           name: "Christian Bale",
//           pic: "https://i.pinimg.com/564x/4c/c6/f1/4cc6f1f365fce288fcae170fa17b6875.jpg"
//         },
//         {
//           name: "Heath Ledger",
//           pic: "https://i.pinimg.com/564x/73/55/2e/73552ed7fc52a7c93bc4939147d76540.jpg"
//         },
//         {
//           name: "Aaron Eckhart",
//           pic: "https://i.pinimg.com/564x/bd/58/60/bd58606c1a3b21ca881a5407158cde7a.jpg"
//         },
//         {
//           name: "Michael Caine",
//           pic: "https://i.pinimg.com/564x/65/ef/6d/65ef6d0444a3a2f2b2f7838dcd97a909.jpg"
//         },
//         {
//           name: "Maggie Gyllenhaal",
//           pic: "https://i.pinimg.com/564x/43/e0/15/43e0156e686239692fc343935f98ccff.jpg"
//         },
//         {
//           name: "Gary Oldman",
//           pic: "https://i.pinimg.com/236x/7c/a0/35/7ca035ef341bda3b45d45f38249ad888.jpg"
//         }
//       ]
//     },
//     {
//       id: 2,
//       name: "Inception",
//       poster: "https://i.pinimg.com/564x/7c/88/d5/7c88d530f9cf8c8661295ef5d2921a86.jpg",
//       rating: 8.8,
//       summary: "Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobb's criminal history as payment for performing an inception on his sick competitor's son.",
//       trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
//       language: "english",
//       casts: [
//         {
//           name: "Leonardo Dicaprio",
//           pic: "https://i.pinimg.com/236x/63/ec/41/63ec412052730a603b58064ec0d9aca7.jpg"
//         },
//         {
//           name: "Joseph Gordon-Levitt",
//           pic: "https://i.pinimg.com/236x/6a/48/62/6a4862193deabe05bb21ee4b8b50e284.jpg"
//         },
//         {
//           name: "Elliot Page",
//           pic: "https://i.pinimg.com/236x/84/0d/10/840d106688bd846bafa9c50d047fbea1.jpg"
//         },
//         {
//           name: "Ken Watanabe",
//           pic: "https://i.pinimg.com/236x/55/12/8a/55128ab03ce639f35fa48a845257901c.jpg"
//         },
//         {
//           name: "Tom Hardy",
//           pic: "https://i.pinimg.com/236x/04/07/97/040797c27150259db0b010be8bdf6da3.jpg"
//         },
//         {
//           name: "Dileep Rao",
//           pic: "https://i.pinimg.com/236x/94/ad/f2/94adf2cf0c0185c538571cfb270edc0a.jpg"
//         }
//       ]
//     },
//     {
//       id: 3,
//       name: "Interstellar",
//       poster: "https://i.pinimg.com/564x/74/0d/6a/740d6a357af69c2be1e911beebc37895.jpg",
//       rating: 8.6,
//       summary: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
//       trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
//       language: "english",
//       casts: [
//         {
//           name: "Matthew McConaughey",
//           pic: "https://i.pinimg.com/236x/18/51/73/185173ef6b380ed4c6006c2b4f5c44f0.jpg"
//         },
//         {
//           name: "Anne Hathaway",
//           pic: "https://i.pinimg.com/236x/66/e6/93/66e693b760a46f3e9d70bbb33d64ebe2.jpg"
//         },
//         {
//           name: "Jessica chastain",
//           pic: "https://i.pinimg.com/236x/d6/69/38/d6693831a33be7289fb0d3b5bb04cd28.jpg"
//         },
//         {
//           name: "Mackenzie foy",
//           pic: "https://i.pinimg.com/236x/65/2d/9a/652d9a4e68eb31a0a92e2f200d0df2ea.jpg"
//         },
//         {
//           name: "Ellen burstyn",
//           pic: "https://i.pinimg.com/236x/1c/c6/1b/1cc61bca9df381324430d0ffd95ab8e5.jpg"
//         },
//         {
//           name: "John lithgow",
//           pic: "https://i.pinimg.com/564x/c7/bc/5e/c7bc5e00670eaf5950c9624aa14ba3ad.jpg"
//         }
//       ]
//     },
//     {
//       id: 4,
//       name: "KGF Chapter 2",
//       poster: "https://i.pinimg.com/564x/f2/c8/43/f2c8430afff5c23e04efe3c522ef2a4b.jpg",
//       rating: 8.3,
//       summary: "The blood-soaked land of Kolar Gold Fields has a new overlord now, Rocky, whose name strikes fear in the heart of his foes. His allies look up to him as their Savior, the government sees him as a threat, and his enemies are clamouring for revenge.",
//       trailer: "https://www.youtube.com/embed/Qah9sSIXJqk",
//       language: "kannada",
//       casts: [
//         {
//           name: "Yash",
//           pic: "https://i.pinimg.com/236x/40/e8/8f/40e88fc6b47ab8a54797cd7a1c9184a9.jpg"
//         },
//         {
//           name: "Srinidhi Shetty",
//           pic: "https://i.pinimg.com/236x/51/99/a2/5199a2cc1645e3cf6a31e446ab7a7abc.jpg"
//         },
//         {
//           name: "Sanjay Dutt",
//           pic: "https://i.pinimg.com/236x/e0/c1/8e/e0c18e5ee5400b58bad283c779a246ee.jpg"
//         },
//         {
//           name: "Archana Jois",
//           pic: "https://i.pinimg.com/236x/c8/9f/91/c89f916dd70997989ca84444a3323437.jpg"
//         },
//         {
//           name: "Raveena Tandon",
//           pic: "https://i.pinimg.com/236x/99/9c/43/999c43ed4114d7744cadab15fe6eca1f.jpg"
//         },
//         {
//           name: "Sonu",
//           pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmD6wGoqq588N6krGTOiAeDJ8HDROC7Db5bqXU3yRDz6XG5dxYOM77tzdicVzaS0JShkE&usqp=CAU"
//         }
//       ]
//     },
//     {
//       id: 5,
//       name: "Soorarai Pottru",
//       poster: "https://i.pinimg.com/564x/3c/57/11/3c5711c122a1de55b347f38c4c2c006d.jpg",
//       rating: 8.7,
//       summary: "Maara, a young man from a remote village, dreams of launching his own airline service. However, he must overcome several obstacles and challenges in order to be successful in his quest.",
//       trailer: "https://www.youtube.com/embed/fa_DIwRsa9o",
//       language: "tamil",
//       casts: [
//         {
//           name: "Surya",
//           pic: "https://i.pinimg.com/236x/d3/bf/8e/d3bf8e40676f5c428db5dd73a60d3786.jpg"
//         },
//         {
//           name: "Aparna Balamurali",
//           pic: "https://i.pinimg.com/236x/81/0b/a4/810ba44421cd8a473293aef926053daf.jpg"
//         },
//         {
//           name: "Paresh Rawal",
//           pic: "https://i.pinimg.com/236x/b2/2e/b4/b22eb489327ef660557b0704f2e022e8.jpg"
//         },
//         {
//           name: "Krishnakumar Balasubramanian",
//           pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEiTE_OnrKUHtbTFrIe_atX38C1nlidA452UlwZfsDXHzgNtLq9fPvX_ThTAbYBABZRac&usqp=CAU"
//         },
//         {
//           name: "Karunas",
//           pic: "https://i.pinimg.com/236x/b8/a8/3e/b8a83e986c516ec9cf63ab2d8d5c687f.jpg"
//         },
//         {
//           name: "Kaali Venkat",
//           pic: "https://i.pinimg.com/236x/34/21/65/3421654bee41e114a0ea21169fbf1899.jpg"
//         }
//       ]
//     },
//     {
//       id: 6,
//       name: "Vaaranam Aayiram",
//       poster: "https://i.pinimg.com/564x/e9/cc/65/e9cc65da756956b25d90ea13c7c83403.jpg",
//       rating: 8.2,
//       summary: "Surya, an NSG official, is on a mission to rescue someone when he gets the news of his father's demise. He starts reminiscing about the bond he shared with his father and the stories related to him.",
//       trailer: "https://www.youtube.com/embed/QdM9L1FxFkY",
//       language: "tamil",
//       casts: [
//         {
//           name: "Surya",
//           pic: "https://i.pinimg.com/236x/d3/bf/8e/d3bf8e40676f5c428db5dd73a60d3786.jpg"
//         },
//         {
//           name: "Sameera Reddy",
//           pic: "https://i.pinimg.com/236x/54/5d/86/545d8611b067219602e7b4c5b7d4d25f.jpg"
//         },
//         {
//           name: "Simran",
//           pic: "https://i.pinimg.com/236x/79/0f/ac/790facdeb17ea66b5f16990cb565dc2b.jpg"
//         },
//         {
//           name: "Divya Spandana",
//           pic: "https://i.pinimg.com/236x/5b/69/50/5b69505410e2cc2cc045b0901d2fddc6.jpg"
//         },
//         {
//           name: "Babloo Prithiveeraj",
//           pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnsI_XcY88D2TT7hcZMakN3rhuB2X1Irw2hg&usqp=CAU"
//         },
//         {
//           name: "VTV Ganesh",
//           pic: "https://i.pinimg.com/236x/98/f4/2a/98f42aa6d9030a3833f96e0dad17b37f.jpg"
//         }
//       ]
//     },
//     {
//       id: 7,
//       name: "Vinnaithandi varuvaya",
//       poster: "https://i.pinimg.com/564x/8b/31/e0/8b31e0a75af9ee7ed898e3207819754a.jpg",
//       rating: 8.1,
//       summary: "A Hindu assistant director, Karthik, falls in love with Jessie, a Christian from a traditional family. Things change when Karthik becomes busy during a forty-day shoot in Goa.",
//       trailer: "https://www.youtube.com/embed/9z-NeZyiyF8",
//       language: "tamil",
//       casts: [
//         {
//           name: "Simbu",
//           pic: "https://i.pinimg.com/236x/e8/34/2e/e8342ef40b239027e56bc5bfef409aa6.jpg"
//         },
//         {
//           name: "Trisha Krishnan",
//           pic: "https://i.pinimg.com/236x/a0/38/4d/a0384d6907a8bcb6ed0f06688f532f1c.jpg"
//         },
//         {
//           name: "VTV Ganesh",
//           pic: "https://i.pinimg.com/236x/98/f4/2a/98f42aa6d9030a3833f96e0dad17b37f.jpg"
//         },
//         {
//           name: "Samantha",
//           pic: "https://i.pinimg.com/564x/5c/17/ae/5c17ae1a16980ae0c3dceb003d5aece6.jpg"
//         },
//         {
//           name: "Naga Chaitanya",
//           pic: "https://i.pinimg.com/236x/77/0d/eb/770deb5aa457c31bd686e92ab586543d.jpg"
//         },
//         {
//           name: "Uma Padmanabhan",
//           pic: "https://i.pinimg.com/564x/ef/53/7d/ef537d18b363124145ab82002075ce40.jpg"
//         }
//       ]
//     },
//     {
//       id: 8,
//       name: "Alai Payuthey",
//       poster: "https://i.pinimg.com/564x/ec/66/97/ec66972648912b7aceda8fc0ced2761e.jpg",
//       rating: 8.3,
//       summary: "Karthik and Shakti marry against the wishes of their families and start their new life. However, they soon realise that marriage is not the bed of roses they had imagined it would be.",
//       trailer: "https://www.youtube.com/embed/BRFdGc3ku-k",
//       language: "tamil",
//       casts: [
//         {
//           name: "R. Madhavan",
//           pic: "https://i.pinimg.com/236x/ec/14/9e/ec149ee653a8714d87e352793c1b1c7b.jpg"
//         },
//         {
//           name: "Shalini",
//           pic: "https://i.pinimg.com/236x/ad/74/9e/ad749e69e9f858b1499e456161e8fe92.jpg"
//         },
//         {
//           name: "Swarnamalya",
//           pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiQGOJXLCbg133t7s00a9tik0w3N0Kn59-pA&usqp=CAU"
//         },
//         {
//           name: "Vivek",
//           pic: "https://i.pinimg.com/236x/6f/32/9c/6f329cc5c16a87292d0a035347b63ad3.jpg"
//         },
//         {
//           name: "Jayasudha",
//           pic: "https://i.pinimg.com/236x/42/8c/76/428c7622a3c90eec930d8f435c23df0d.jpg"
//         },
//         {
//           name: "Kushboo",
//           pic: "https://i.pinimg.com/236x/a7/b6/82/a7b682f9844427572c51d7605326162a.jpg"
//         }
//       ]
//     },
//     {
//       id: 9,
//       name: "Ponniyin Selvan: I",
//       poster: "https://i.pinimg.com/564x/e5/66/fc/e566fcb918c32685d6d2aff08d50745d.jpg",
//       rating: 7.8,
//       summary: "Vandiyathevan sets out to cross the Chola land to deliver a message from the crown prince Aditha Karikalan. Meanwhile, Kundavai attempts to establish political peace as vassals and petty chieftains plot against the throne.",
//       trailer: "https://www.youtube.com/embed/D4qAQYlgZQs",
//       language: "tamil",
//       casts: [
//         {
//           name: "Aishwarya Rai",
//           pic: "https://i.pinimg.com/236x/48/7a/66/487a66ce1fa9e01181fa9f0fda81a55f.jpg"
//         },
//         {
//           name: "Vikram ",
//           pic: "https://i.pinimg.com/236x/ce/18/22/ce182269cd7d8c8e2e77813a2cbaf612.jpg"
//         },
//         {
//           name: "Trisha Krishnan",
//           pic: "https://i.pinimg.com/236x/a0/38/4d/a0384d6907a8bcb6ed0f06688f532f1c.jpg"
//         },
//         {
//           name: "Jayam Ravi",
//           pic: "https://i.pinimg.com/236x/75/77/4d/75774d0352d6cf47a7ef8b5dafe530e2.jpg"
//         },
//         {
//           name: "Karthik",
//           pic: "https://i.pinimg.com/236x/76/d3/a0/76d3a06779013c908e338595bb5759f2.jpg"
//         },
//         {
//           name: "Aishwarya Lekshmi",
//           pic: "https://i.pinimg.com/236x/a5/4e/9d/a54e9ddcadfd7f41182cec91193124ce.jpg"
//         }
//       ]
//     },
//     {
//       id: 10,
//       name: "Avatar",
//       poster: "https://i.pinimg.com/564x/2b/14/98/2b149826f852f8aece90543a40daeb1e.jpg",
//       rating: 7.8,
//       summary: "Jake, who is paraplegic, replaces his twin on the Na'vi inhabited Pandora for a corporate mission. After the natives accept him as one of their own, he must decide where his loyalties lie.",
//       trailer: "https://www.youtube.com/embed/5PSNL1qE6VY",
//       language: "english",
//       casts: [
//         {
//           name: "Sam Worthington",
//           pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXuHUSYdDP5ytQg62iVQredvf6ahZrGpYCVQ&usqp=CAU"
//         },
//         {
//           name: "Zoe Saldaña",
//           pic: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRpvvoYY4EnR1LS-yCAvOtrl6WKM-q44tz6E-gRm2RIsEIWkBzJdawalQLP_cIL_mi53nXa1sw091fjntI"
//         },
//         {
//           name: "Michelle Rodriguez",
//           pic: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTfUBchegN6Rx1AsAsCYoa0HiX8CEBmghbSW8luEgxxvrH4tgFdZyt9BDeV6RvA6bx-1-dL4ajo-g1l-hY"
//         },
//         {
//           name: "Sigourney Weaver",
//           pic: "https://i.pinimg.com/236x/cc/a2/de/cca2de9494ed2f490d03deb2e644def8.jpg"
//         },
//         {
//           name: "Stephen Lang",
//           pic: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcS1mvVV1byKC2jBY4W-mpg5ku7KbV4lvaIZoiMte0RqSzYjf9zqW2bjL_HXIKY-JeIiThvV5DfL3kQjrN0"
//         },
//         {
//           name: "Giovanni Ribisi",
//           pic: "https://i.pinimg.com/236x/8f/8a/b6/8f8ab6757bd97ab4c0598c565659481c.jpg"
//         }
//       ]
//     },
//     {
//       id: 11,
//       name: "Avatar 2",
//       poster: "https://i.pinimg.com/564x/df/7b/c9/df7bc982ed3c23912aebe4cce3d8940f.jpg",
//       rating: 8,
//       summary: "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora. When an ancient threat resurfaces, Jake must fight a difficult war against the humans.",
//       trailer: "https://www.youtube.com/embed/d9MyW72ELq0",
//       language: "english",
//       casts: [
//         {
//           name: "Sam Worthington",
//           pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXuHUSYdDP5ytQg62iVQredvf6ahZrGpYCVQ&usqp=CAU"
//         },
//         {
//           name: "Zoe Saldaña",
//           pic: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRpvvoYY4EnR1LS-yCAvOtrl6WKM-q44tz6E-gRm2RIsEIWkBzJdawalQLP_cIL_mi53nXa1sw091fjntI"
//         },
//         {
//           name: "Michelle Rodriguez",
//           pic: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTfUBchegN6Rx1AsAsCYoa0HiX8CEBmghbSW8luEgxxvrH4tgFdZyt9BDeV6RvA6bx-1-dL4ajo-g1l-hY"
//         },
//         {
//           name: "Sigourney Weaver",
//           pic: "https://i.pinimg.com/236x/cc/a2/de/cca2de9494ed2f490d03deb2e644def8.jpg"
//         },
//         {
//           name: "Vin Diesel",
//           pic: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSs7Zp6IVqeT1e9Fyrl1chSs0YtEkZw7oDxvi1zwQK4yZtqyBLRZqdli7CO15FTpFeNn773qRSAHvyLDks"
//         },
//         {
//           name: "Giovanni Ribisi",
//           pic: "https://i.pinimg.com/236x/8f/8a/b6/8f8ab6757bd97ab4c0598c565659481c.jpg"
//         }
//       ]
//     },
//     {
//       id: 12,
//       name: "After",
//       poster: "https://i.pinimg.com/564x/9d/21/9a/9d219aa5939c5362193ba40a1faa728d.jpg",
//       rating: 5.3,
//       summary: "Tessa Young is a dedicated student, dutiful daughter and loyal girlfriend to her high school sweetheart. Entering her first semester of college, Tessa's guarded world opens up when she meets Hardin Scott, a mysterious and brooding rebel who makes her question all she thought she knew about herself -- and what she wants out of life.",
//       trailer: "https://www.youtube.com/embed/p13hKXKWtsU",
//       language: "english",
//       casts: [
//         {
//           name: "Josephine Langford",
//           pic: "https://i.pinimg.com/236x/81/c6/a5/81c6a5583cb0c33463546abe06a1851a.jpg"
//         },
//         {
//           name: "Hero Fiennes Tiffin",
//           pic: "https://i.pinimg.com/236x/f6/11/7f/f6117fb9f55766775f033878047bef87.jpg"
//         },
//         {
//           name: "Selma Blair",
//           pic: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSvzbfHpa3ESFEq2dn8DP3vR3JM2ioHccIDgSbl8Yk5qKoUpNjmTFATgnJLTd6B1tKubzRJ4_OW-Xd2OF4"
//         },
//         {
//           name: "Dylan Arnold",
//           pic: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRyPQofL-koYIi7t6EZpZEZjSj8vBnQ4GmzR_t6C7V_LmhwTVzOpI1IWh8CPSKgu0eCLIoSkScTD2pe2Xc"
//         },
//         {
//           name: "Inanna Sarkis",
//           pic: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPzC0pGERPV8sQvXJHYT-odJO8aKDzMalIvPz8UqRAVlGn4AIQjJQ1UdC0Vmhd5m527dnUmwk4m5ErAc4"
//         },
//         {
//           name: "Shane Paul McGhie",
//           pic: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQw1MrgPpx_XHghiZocxiTTT1As9D-b7MuXTVMWH3PAHW9UVaPxBXXtqDJpTisC-xylYhbs2CLi1_SOA5Y"
//         }
//       ]
//     },
//     {
//       id: 13,
//       name: "After We Collided",
//       poster: "https://i.pinimg.com/564x/f7/ec/5a/f7ec5ad8eaaaf0ccc31ddafcb70df41a.jpg",
//       rating: 5,
//       summary: "Tessa finds herself struggling with her complicated relationship with Hardin; she faces a dilemma that could change their lives forever.",
//       trailer: "https://www.youtube.com/embed/2SvwX3ux_-8",
//       language: "english",
//       casts: [
//         {
//           name: "Josephine Langford",
//           pic: "https://i.pinimg.com/236x/81/c6/a5/81c6a5583cb0c33463546abe06a1851a.jpg"
//         },
//         {
//           name: "Hero Fiennes Tiffin",
//           pic: "https://i.pinimg.com/236x/f6/11/7f/f6117fb9f55766775f033878047bef87.jpg"
//         },
//         {
//           name: "Selma Blair",
//           pic: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSvzbfHpa3ESFEq2dn8DP3vR3JM2ioHccIDgSbl8Yk5qKoUpNjmTFATgnJLTd6B1tKubzRJ4_OW-Xd2OF4"
//         },
//         {
//           name: "Dylan Sprouse",
//           pic: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRyPQofL-koYIi7t6EZpZEZjSj8vBnQ4GmzR_t6C7V_LmhwTVzOpI1IWh8CPSKgu0eCLIoSkScTD2pe2Xc"
//         },
//         {
//           name: "Inanna Sarkis",
//           pic: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRPzC0pGERPV8sQvXJHYT-odJO8aKDzMalIvPz8UqRAVlGn4AIQjJQ1UdC0Vmhd5m527dnUmwk4m5ErAc4"
//         },
//         {
//           name: "Candice King",
//           pic: "https://i.pinimg.com/236x/28/38/70/283870074b201541f4e62d63ac440d45.jpg"
//         }
//       ]
//     },
//     {
//       id: 14,
//       name: "After We Fell",
//       poster: "https://i.pinimg.com/564x/8f/b2/f6/8fb2f6b7ad75cb1894617e52c2153904.jpg",
//       rating: 4.7,
//       summary: "As Tessa makes a life-changing decision, revelations about her family and Hardin's past threaten to derail her plans and end the couple's intense relationship.",
//       trailer: "https://www.youtube.com/embed/3OHPCurXcTU",
//       language: "english",
//       casts: [
//         {
//           name: "Josephine Langford",
//           pic: "https://i.pinimg.com/236x/81/c6/a5/81c6a5583cb0c33463546abe06a1851a.jpg"
//         },
//         {
//           name: "Hero Fiennes Tiffin",
//           pic: "https://i.pinimg.com/236x/f6/11/7f/f6117fb9f55766775f033878047bef87.jpg"
//         },
//         {
//           name: "Arielle Kebbel",
//           pic: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQBITQACm6adf9Mwer2mfzfjfizr4MYPTp46qq2cu5wmfzKJl40EAYGwi7jIJ8iNzo5uBLzni7UCn6YkDM"
//         },
//         {
//           name: "Carter Jenkins",
//           pic: "https://i.pinimg.com/236x/0f/a3/aa/0fa3aa2aa449e1e04f4b3236a61c74e9.jpg"
//         },
//         {
//           name: "Kiana Madeira",
//           pic: "https://i.pinimg.com/236x/e1/f0/f2/e1f0f243545ca89323090e037e95546a.jpg"
//         },
//         {
//           name: "Chance Perdomo",
//           pic: "https://i.pinimg.com/236x/77/44/0c/77440cbd94d5267b7bb7f16c6c60a27d.jpg"
//         }
//       ]
//     },
//     {
//       id: 15,
//       name: "After Ever Happy",
//       poster: "https://i.pinimg.com/564x/df/7b/0a/df7b0afd8ee709a7ddfd64b507a93859.jpg",
//       rating: 4.5,
//       summary: "As a shocking truth about a couple's families emerges, the two lovers discover they are not so different from each other. Tessa is no longer the sweet, simple girl she was when she met Hardin.",
//       trailer: "https://www.youtube.com/embed/hLQ-5exgctI",
//       language: "english",
//       casts: [
//         {
//           name: "Josephine Langford",
//           pic: "https://i.pinimg.com/236x/81/c6/a5/81c6a5583cb0c33463546abe06a1851a.jpg"
//         },
//         {
//           name: "Hero Fiennes Tiffin",
//           pic: "https://i.pinimg.com/236x/f6/11/7f/f6117fb9f55766775f033878047bef87.jpg"
//         },
//         {
//           name: "Arielle Kebbel",
//           pic: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQBITQACm6adf9Mwer2mfzfjfizr4MYPTp46qq2cu5wmfzKJl40EAYGwi7jIJ8iNzo5uBLzni7UCn6YkDM"
//         },
//         {
//           name: "Carter Jenkins",
//           pic: "https://i.pinimg.com/236x/0f/a3/aa/0fa3aa2aa449e1e04f4b3236a61c74e9.jpg"
//         },
//         {
//           name: "Kiana Madeira",
//           pic: "https://i.pinimg.com/236x/e1/f0/f2/e1f0f243545ca89323090e037e95546a.jpg"
//         },
//         {
//           name: "Chance Perdomo",
//           pic: "https://i.pinimg.com/236x/77/44/0c/77440cbd94d5267b7bb7f16c6c60a27d.jpg"
//         }
//       ]
//     }
//   ];

const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL = "mongodb://127.0.0.1:27017";

async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();
//interceptor || converting body to json
app.use(express.json());


 
app.get("/", (req,res) => {
    res.send(`Enter  /TVShows or  /Movies to get the particular data`)
});

app.use("/Movies", movieRouter);
app.use("/TVShows", showRouter);
app.use("/users", usersRouter);




app.listen(PORT, () => console.log("Server started on the PORT", PORT));







