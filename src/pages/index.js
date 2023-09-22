import MovieLoop from "@/components/Cards/Loop"
import MovieCard from "@/components/Cards/Movie-Card"
import SideCard from "@/components/Cards/Side-Card"
import { fetcher } from "@/utils/API"
import Navbar from "@/components/Navbar/Navbar"
import Link from "next/link"
import Footer from "@/components/Footer/Footer"

export default function Home({ latestMovies, trendingMovies, popularSeries }) {
  return (
    <main className="bg-gradient-to-r from-slate-600 to-slate-950 text-slate-300">
      <Navbar />
      <MovieLoop />
      <div className="series-section w-full">
        <div className="carousel w-full">
          <div id="item1" className="carousel-item w-full space-x-4">
            {popularSeries?.results.slice(0, 3).map((series, index) => (
              <div
                key={series.id}
                className={`carousel-card${index === 0 ? " active" : ""}`}
              >
                <SideCard {...series} />
              </div>
            ))}
          </div>
          <div id="item2" className="carousel-item w-full space-x-4">
            {popularSeries?.results.slice(3, 6).map((series, index) => (
              <div
                key={series.id}
                className={`carousel-card${index === 0 ? " active" : ""}`}
              >
                <SideCard {...series} />
              </div>
            ))}
          </div>
          <div id="item3" className="carousel-item w-full space-x-4">
            {popularSeries?.results.slice(6, 9).map((series, index) => (
              <div
                key={series.id}
                className={`carousel-card${index === 0 ? " active" : ""}`}
              >
                <SideCard {...series} />
              </div>
            ))}
          </div>
          <div id="item4" className="carousel-item w-full space-x-4">
            {popularSeries?.results.slice(9, 12).map((series, index) => (
              <div
                key={series.id}
                className={`carousel-card${index === 0 ? " active" : ""}`}
              >
                <SideCard {...series} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          <a href="#item2" className="btn btn-xs">
            2
          </a>
          <a href="#item3" className="btn btn-xs">
            3
          </a>
          <a href="#item4" className="btn btn-xs">
            4
          </a>
        </div>
      </div>
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
      <h1 className=" rounded pl-2 pt-1 pb-1 bg-gradient-to-r from-sky-950 to-slate-500 w-full md:w-full lg:w-2/4 text-center md:text-center lg:text-start mr-auto text-3xl mt-10 mb-10">
        <strong>TRENDING</strong>
      </h1>
      <div className="wrapper pl-4 pr-4 grid grid-cols-8 gap-4 pb-4">
        <div className="second-container col-span-8 md:col-span-6 lg:col-span-8">
          <div className="latest-movies-section grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
            {trendingMovies?.results.slice(0, 18).map((movie) => {
              return (
                <div key={movie.id}>
                  <Link href={`/movies/${movie.id}`}>
                    <MovieCard {...movie} />
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
export async function getStaticProps() {
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
