import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import { Movie } from '../typings';
import requests from '../utils/requests';
import { useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Modal from '../components/Modal';

interface Props {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
}

const Home = ({
    netflixOriginals,
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    romanceMovies,
    topRated,
    trendingNow,
}: Props) => {
    const { logout, loading } = useAuth();
    const showModal = useRecoilValue(modalState);

    if (loading) return null;

    return (
        <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]'>
            <Head>
                <title>Home - Netflix</title>
                <link
                    rel='icon'
                    href='/favicon.ico'
                />
            </Head>

            {/* Header component */}
            <Header />

            <main className='relative pl-4 pb-4 lg:space-y-24 lg:pl-16'>
                {/* Banner */}
                <Banner netflixOriginals={netflixOriginals} />
                <section className='md:space-y-24'>
                    <Row
                        title='Trending Now'
                        movies={trendingNow}
                    />
                    <Row
                        title='Top Rated'
                        movies={topRated}
                    />
                    <Row
                        title='Action Thrillers'
                        movies={actionMovies}
                    />
                    <Row
                        title='Comedies'
                        movies={comedyMovies}
                    />
                    <Row
                        title='Scary Movies'
                        movies={horrorMovies}
                    />
                    <Row
                        title='Romance Movies'
                        movies={romanceMovies}
                    />
                    <Row
                        title='Documentaries'
                        movies={documentaries}
                    />
                </section>
            </main>

            {showModal && <Modal />}
        </div>
    );
};

export default Home;

// Naming is important here
// Get data the website will need to be rendered initally
export const getServerSideProps = async () => {
    // Use Promise.all to get all information instaad of having multiple awaits
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ]);

    return {
        // Can be accessed from the props in the jsx elements
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
        },
    };
};
