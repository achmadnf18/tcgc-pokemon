import { NextSeo } from 'next-seo';

export default function AboutPage() {
  return (
    <>
      <NextSeo title="About" />
      <h1 className="h1 pb-7">About Pokémon TCG Center</h1>

      <div className="max-w-2xl space-y-5">
        <p>
          Pokémon TCG Center is a simple yet rich-featured Pokémon Trading Card Game Center website
          that is built in order to allow Pokémon lovers to easily explore Pokémon Trading Card Game
          and do many more things. Anyone can use this site to search for Pokémon TCG by name and
          filter them by set, type, subtype, supertype & rarity.
        </p>
        <p>
          Cool Right ?!
          <br />
          Tell all your Pokémon-lovers friends around the world about this site!
        </p>
      </div>

      <h2 className="pt-11 pb-5 text-2xl font-bold">Notes</h2>
      <div className="max-w-2xl space-y-5">
        <p>
          All Pokémon TCG data used in this project comes from{' '}
          <a className="text-elm-water hover:underline" href="https://docs.pokemontcg.io/">
            Pokémon TCG API
          </a>
          .
        </p>
      </div>
    </>
  );
}
