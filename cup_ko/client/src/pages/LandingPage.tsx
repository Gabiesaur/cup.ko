import landing_bg from '../assets/landing_bg.png';

const LandingPage = () => {
    return (
        <main
            className='min-h-screen w-full bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${landing_bg})`}}
        >
            <h1 style={{ fontFamily: "Opun Mai Bold Italic" }}>
                Chewy with a Tropical Soul.
            </h1>
        </main>
    )
}

export default LandingPage