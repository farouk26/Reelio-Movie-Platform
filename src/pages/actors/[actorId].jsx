import React from "react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import { fetcher } from "@/utils/API"
import MovieCard from "@/components/Cards/Movie-Card"
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"

function ActorDetailsPage() {
  // Retrieve the actor's ID from the route
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return
    getActorData(id)
    getRelatedMovies(id)
  }, [id])

  // useState for actorData
  const [actorData, setActorData] = useState(null)

  // Fetch actor data using the ID and display it
  async function getActorData(actorId) {
    const fetchActorData = await fetcher(`person/${actorId}`)
    setActorData(fetchActorData)
  }

  // useState for relatedMovies
  const [relatedMovies, setRelatedMovies] = useState([])

  // Fetch Actor related movies using the id
  async function getRelatedMovies(actorId) {
    const actorRelatedMovies = await fetcher(`person/${actorId}/movie_credits`)
    setRelatedMovies(actorRelatedMovies.cast)
  }

  return (
    <main className="bg-gradient-to-r from-slate-600 to-slate-950 text-slate-300">
      <Navbar />
      <div className="hero bg-gradient-to-r from-slate-600 to-slate-950 text-slate-300">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={"https://image.tmdb.org/t/p/w500" + actorData?.profile_path}
            className="w-full lg:max-w-sm rounded-lg shadow-2xl"
            alt="actor_image"
          />
          <div className="lg:pl-4 lg:w-1/2">
            <h1 className="text-3xl lg:text-5xl font-bold">
              {actorData?.name}
            </h1>
            <p className="py-2 lg:py-4">
              Gender: {actorData?.gender === 1 ? "Female" : "Male"}
            </p>
            <p className="py-2 lg:py-4">Popularity: {actorData?.popularity}</p>
            <p className="py-2 lg:py-4">Biography: {actorData?.biography}</p>
          </div>
        </div>
      </div>

      {/* Related Movies*/}
      <div className="mt-8 pl-4 pr-4">
        <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-sky-950 to-slate-500 md:text-center lg:text-start w-full md:w-full p-1 rounded lg:w-1/3 mr-auto bg-slate-800">
          RELATED MOVIES
        </h2>
        <div className="grid grid-cols-2 md:grid-col-4 lg:grid-cols-4 w-full gap-4">
          {relatedMovies?.slice(0, 4).map((movie) => (
            <Link key={movie.name} href={`/movies/${movie.id}`}>
              <MovieCard {...movie} />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ActorDetailsPage
