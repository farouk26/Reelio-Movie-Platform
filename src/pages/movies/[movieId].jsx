import { FaStar } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import ActorsCard from "@/components/Cards/ActorsCard"
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"

export default function MoviePage({ movieData, creditsData, relatedData }) {
  const director = creditsData?.crew?.find(
    (crewMember) => crewMember.job === "Director",
  )

  return (
    <div className=" bg-gray-900 text-white">
      <Navbar />
      <section className="p-0 m-0 h-96 relative">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
            alt={movieData.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-900"></div>
        </div>
      </section>
      <section className="bg-gray-900 text-white p-8">
        <div className="container flex flex-col md:flex-row items-start">
          <div className="pr-4">
            <Image
              className="rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
              width={220}
              height={300}
            />
          </div>
          <div className="w-full md:w-1/2 md:ml-0">
            <h1 className=" mb-2 ml-0 text-4xl tracking-tight font-extrabold text-white">
              {movieData.title}
            </h1>
            <div className="flex items-center justify-start mb-4">
              <p className="mr-4">
                {movieData.original_language?.toUpperCase()}
              </p>
              <p className="mr-4">{movieData.runtime} min</p>
              <p className="flex justify-between mr-4">
                <span className="text-yellow-200 mr-2 mt-1">
                  <FaStar />
                </span>
                {movieData.vote_average}
              </p>
              <p className="mr-1">({movieData.vote_count} Votes)</p>
            </div>
            <p className="mb-2 text-base">{movieData.overview}</p>
            <div className="text-lg">
              <ul>
                <li>
                  <span className="text-white">
                    <strong>Genres :</strong>
                  </span>{" "}
                  {movieData.genres?.map((genre) => genre.name).join(", ")}
                </li>
                <li>
                  <span className="text-white">
                    <strong>Release Date :</strong>
                  </span>{" "}
                  {movieData.release_date}
                </li>
                <li>
                  <span className="text-white">
                    <strong>Director :</strong>
                  </span>{" "}
                  {director ? director.name : "N/A"}
                </li>
                <li>
                  <div className="text-sm">
                    <ul>
                      <div className="flex  items-center mt-2">
                        <span className="text-white text-base">
                          <strong>Production :</strong>
                        </span>{" "}
                        <div className="flex ml-4 space-x-4">
                          {movieData?.production_companies
                            ?.slice(0, 3)
                            .map((company) => (
                              <div
                                key={company.id}
                                className="flex items-center"
                              >
                                <img
                                  src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                  alt={company.name}
                                  className="w-6 h-6 rounded-full mr-2"
                                />
                                <span>
                                  <strong>{company.name}</strong>
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-4 ml-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
        Cast
      </div>
      <div className="mt-6 grid p-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {creditsData?.cast?.slice(0, 6).map((actor) => (
          <Link key={actor.id} href={`/actors/actorId?id=${actor.id}`}>
            <ActorsCard actor={actor} />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { movieId } = context.query
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
  const relatedUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`
  const options = {
    headers: {
      accept: "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmZlZjIwMmQ0MjFhNTYxNzg2YzU3ODQ5YzRhZmJjMyIsInN1YiI6IjY1MDFiNjcxNmEyMjI3MDBjM2I2YWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XJjyQmVwx0bDppP1jD0WnR_WV0eH7kBhZBRVRQFEMhQ",
    },
  }

  const response = await fetch(url, options)
  const creditsResponse = await fetch(creditsUrl, options)
  const relatedResponse = await fetch(relatedUrl, options)

  const data = await response.json()
  const creditsData = await creditsResponse.json()
  const relatedData = await relatedResponse.json()

  return {
    props: {
      movieData: data,
      creditsData: creditsData,
      relatedData: relatedData,
    },
  }
}
