import React from "react"
import Footer from "@/components/Footer/Footer"
import Link from "next/link"
import { fetcher } from "@/utils/API"
import Navbar from "@/components/Navbar/Navbar"
import ActorsCard from "@/components/Cards/ActorsCard"

//fetch Popular Actors data
export async function getStaticProps() {
  const popularActors = await fetcher("person/popular?language=en-US&page=1")

  return {
    props: {
      popularActors,
    },
  }
}
//pass the data fetched as props
function Actors({ popularActors }) {
  return (
    <main className="bg-gradient-to-r from-slate-600 to-slate-950 text-slate-200">
      <Navbar />
      <div
        className="container mx-auto mt-5 pl-4 pr-4"
        style={{ marginTop: 0, paddingTop: 20, paddingBottom: 20 }}
      >
        <h1 className="text-3xl rounded font-semibold mb-5 bg-gradient-to-r from-sky-950 via-blue-950 to-slate-500 p-1 text-center md:text-center lg:text-center">
          POPULAR ACTORS
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularActors.results.map((actor) => (
            <Link key={actor.name} href={`/actors/actorId?id=${actor.id}`}>
              <ActorsCard actor={actor} />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Actors
