import MovieLoop from "@/components/Cards/Loop"
import MovieCard from "@/components/Cards/Movie-Card"
import { fetcher } from "@/utils/API"
import Navbar from "@/components/Navbar/Navbar"
import Link from "next/link"
import Footer from "@/components/Footer/Footer"
import SeriesCard from "@/components/Cards/SeriesCard"

export default function Home({ latestMovies, trendingMovies, popularSeries }) {
  return (
    <main className="bg-gradient-to-r from-slate-600 to-slate-950 text-slate-300">
      <Navbar />
      <MovieLoop />
      <h1 className="rounded rounded-r-none pb-1 w-full md:w-full lg:w-2/4 text-center md:text-center lg:text-end bg-gradient-to-r from-sky-950 to-slate-600 bg-primary ml-auto text-3xl mt-10 mb-10">
        <strong>LATEST MOVIES</strong>
      </h1>
      <div className="first-container pr-4 pl-4 h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        {latestMovies?.results.slice(0, 18).map((movie) => {
          return (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              style={{ display: "block", textDecoration: "none" }}
            >
              <MovieCard {...movie} />
            </Link>
          )
        })}
      </div>
      <h1 className=" rounded rounded-l-none pl-2 pt-1 pb-1 bg-gradient-to-r from-sky-950 to-slate-500 w-full md:w-full lg:w-2/4 text-center md:text-center lg:text-start mr-auto text-3xl mt-10 mb-10">
        <strong>LATEST TV SHOWS</strong>
      </h1>
      <div className="wrapper pl-4 pr-4 grid grid-cols-8 gap-4 pb-4">
        <div className="second-container col-span-8 md:col-span-8 lg:col-span-8">
          <div className="latest-movies-section grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
            {popularSeries?.results.slice(0, 18).map((series) => {
              return (
                <div key={series.id}>
                  <Link href={`/tv/${series.id}`}>
                    <SeriesCard {...series} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

//Fetch Side
export async function getServerSideProps() {
  const latestMoviesData = await fetcher("trending/movie/day")
  const trendingMoviesData = await fetcher("movie/top_rated")
  const popularSeriesData = await fetcher("trending/tv/day")

  return {
    props: {
      latestMovies: latestMoviesData,
      trendingMovies: trendingMoviesData,
      popularSeries: popularSeriesData,
    },
  }
}
