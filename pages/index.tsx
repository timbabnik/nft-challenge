import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { sanityClient, urlFor } from "../sanity";
import { Collection } from "../typings"

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div style={{backgroundColor: "#14001a"}} className="mx-auto flex flex-col min-h-screen py-20 px-10 2xl:px-0  ">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-10 text-2xl font-extralight text-gray-300 px-20">
                    The 
                    {" "}<span className="font-extrabold underline decoration-purple-500">TIM BABNIK</span>{" "}
                     NFT Market Place
      </h1>

      <main className=" p-10 mt-20 ">
        <div className="grid space-x-3 md:grid lg:grid 2xl:grid-cols-2 items-center">
          <h1 className="text-white text-6xl font-light 2xl:px-10 2xl:text-8xl">The king of <span className="text-purple-400 font-bold">NFT</span><br/>marketplaces</h1>
          {collections.map(collection => (
            <Link href={`/nft/${collection.slug.current}`}>
            <div className="2xl:flex xl:flex md:flex items-center cursor-pointer transition-all duration-200 hover:scale-105">
              <img className="h-96 w-60 rounded-2xl object-cover bg-gradient-to-br from-purple-100 to-purple-600 p-2 rounded-xl mt-20 sm:ml-10" src="https://i.postimg.cc/fbmwxcsP/Group-2-11.png" alt="" />
              <img className="h-96 w-60 rounded-2xl object-cover bg-gradient-to-br from-purple-100 to-purple-600 p-2 rounded-xl ml-10 sm:mt-10" src={"https://i.postimg.cc/50Q2Kh8s/Group-3-3.png"} alt="" />
              <img className="h-96 w-60 rounded-2xl object-cover bg-gradient-to-br from-purple-100 to-purple-600 p-2 rounded-xl ml-10 mb-10 sm:mt-10" src={"https://i.postimg.cc/SK8PZVJW/Group-3-4.png"} alt="" />

              
            </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
  },
  previewImage {
    asset
  },
  slug {
    current
  },
  creator-> {
        _id,
        name,
        address,
        slug {
          current
      },
    },
  }`

  const collections = await sanityClient.fetch(query)
  
  return {
    props: {
      collections,
    }
  }
}