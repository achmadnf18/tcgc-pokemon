/* eslint-disable @typescript-eslint/no-use-before-define */
import { Fragment } from 'react';

import { QueryCardsData } from '@/api/tcg-queries/cards';
import { MAX_BASE_STATS, STATS_LABELS } from '@/constants';

type Props = {
  card: QueryCardsData[0];
};

export default function StatsAndAbility({ card }: Props) {
  const cardType = card.types[0].toLowerCase();
  return (
    <div className="tcg-card__stats-ability">
      <h2 className="h3 lg:h2 pb-3">☀️Series {card.set.series}</h2>
      <h3 className="h3 pb-3">📜Stats</h3>
      <div className="px-3 pb-3 text-sm">
        <div className="pb-1 font-semibold">Type</div>
        <div className="flex items-center gap-1.5 pl-4 pb-3">
          <div className={`h-2.5 w-2.5 rounded-full bg-elm-${cardType}`} />
          <div>{card.types[0]}</div>
        </div>
        {STATS_LABELS.map((label: string) => {
          let baseStat = '0';
          if (label === 'HP') baseStat = card.hp;

          return (
            <Fragment key={label}>
              <div className="flex justify-between text-sm font-semibold">
                <div>{label}</div>
                <div>
                  {baseStat}/{MAX_BASE_STATS}
                </div>
              </div>
              <div className="mt-1 mb-2 h-2 w-full flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-dark-base">
                <div
                  className={`h-full bg-elm-${cardType} transition-all`}
                  style={{
                    width: `${(Number(baseStat) / MAX_BASE_STATS) * 100}%`,
                  }}
                />
              </div>
            </Fragment>
          );
        })}
      </div>
      <Abilities abilities={card.abilities} />
      <Attacks attacks={card.attacks} />
      <WeaknessesAndResistances weaknesses={card.weaknesses} resistances={card.resistances} />
    </div>
  );
}

function Abilities({ abilities }: { abilities: QueryCardsData[0]['abilities'] }) {
  return (
    <div className="pb-1">
      <h3 className="h3 pb-3">✨Abilities</h3>
      <div className="px-3 pb-3">
        {!abilities && <span className="pl-4 text-sm italic">No Data</span>}
        {abilities?.map((ability) => (
          <Fragment key={ability.name}>
            <div className="pb-1 font-semibold">🌀{ability.name}</div>
            <div className="pl-4 pb-3 text-sm">
              <div className="italic">{ability.text}</div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function Attacks({ attacks }: { attacks: QueryCardsData[0]['attacks'] }) {
  return (
    <div className="pb-1">
      <h3 className="h3 pb-3">⚔️Attacks / Skills</h3>
      <div className="px-3 pb-3">
        {!attacks && <span className="pl-4 text-sm italic">No Data</span>}
        {attacks?.map((attack) => (
          <Fragment key={attack.name}>
            <div className="pb-1 font-semibold">🌀{attack.name}</div>
            <div className="pl-4 pb-3 text-sm">
              <div className="flex gap-5 font-semibold">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-elm-fire" />
                  Damage: <span className="font-normal">{attack.damage}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-elm-water" />
                  Cost: <span className="font-normal">{attack.convertedEnergyCost}</span>
                </div>
              </div>
              <div className="italic">{attack.text}</div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

type WeakResistanceProps = {
  weaknesses: QueryCardsData[0]['weaknesses'];
  resistances: QueryCardsData[0]['resistances'];
};
function WeaknessesAndResistances({ weaknesses, resistances }: WeakResistanceProps) {
  return (
    <div className="pb-1">
      <h3 className="h3 pb-1">🏋️Resistances</h3>
      <div className="px-3 pb-3">
        {!resistances && <span className="pl-4 text-sm italic">No Data</span>}
        {resistances?.map((resistant) => (
          <Fragment key={resistant.type}>
            <div className="pl-4 pb-3 text-sm">
              <div className="flex gap-5 font-semibold">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-2.5 w-2.5 rounded-full bg-elm-${resistant.type.toLowerCase()}`}
                  />
                  <span>{resistant.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  Enemy Dmg. <span className="font-normal">{resistant.value}</span>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <h3 className="h3 pb-1">💔Weaknesses</h3>
      <div className="px-3 pb-3">
        {!weaknesses && <span className="pl-4 text-sm italic">No Data</span>}
        {weaknesses?.map((weakness) => (
          <Fragment key={weakness.type}>
            <div className="pl-4 pb-3 text-sm">
              <div className="flex gap-5 font-semibold">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-2.5 w-2.5 rounded-full bg-elm-${weakness.type.toLowerCase()}`}
                  />
                  <span>{weakness.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  Enemy Dmg. <span className="font-normal">{weakness.value}</span>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
