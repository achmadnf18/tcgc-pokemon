/* eslint-disable no-param-reassign */
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDebounceFn } from 'react-power-ups';

import { QueryCardFilter } from '@/api/tcg-queries/cards';
import { useQueryCardRarity } from '@/api/tcg-queries/rarities';
import { useQueryCardSet } from '@/api/tcg-queries/sets';
import { useQueryCardSubType } from '@/api/tcg-queries/subtypes';
import { useQueryCardSuperType } from '@/api/tcg-queries/supertypes';
import { useQueryCardType } from '@/api/tcg-queries/types';
import { getFilterParam, getNewRoute } from '@/utils/url';

type Props = {
  filter: QueryCardFilter;
  setFilter: Dispatch<SetStateAction<QueryCardFilter>>;
};

export default function TcgListFilter({ filter, setFilter }: Props) {
  const querySet = useQueryCardSet();
  const queryType = useQueryCardType();
  const querySubType = useQueryCardSubType();
  const querySuperType = useQueryCardSuperType();
  const queryRarity = useQueryCardRarity();

  const { query, replace } = useRouter();
  const [showFilter, setShowFilter] = useState(false);

  const [setKeyword] = useDebounceFn<[ChangeEvent<HTMLInputElement>]>(({ target }) => {
    const value = target.value.trim();
    const name = value && value !== '' ? `name:${value}` : undefined;

    setFilter((prev) => ({ ...prev, name }));
    replace(getNewRoute({ name: value }));
  }, 600);

  const isFiltered =
    filter.set || filter.types || filter.subtypes || filter.supertype || filter.rarity;

  useEffect(() => {
    const { name, set, types, subtypes, supertype, rarity } = getFilterParam();
    if (name || set || types || subtypes || supertype || rarity) {
      setFilter({
        name: name ? `name:"${name}*"` : undefined,
        set: set ? `set.id:${set}` : undefined,
        types: types ? `types:${types}` : undefined,
        subtypes: subtypes ? `subtypes:${subtypes}` : undefined,
        supertype: supertype ? `supertype:${supertype}` : undefined,
        rarity: rarity ? `rarity:"${rarity}"` : undefined,
      });
      // replace(asPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFilter = ({ key, value }: { key: string; value: string | undefined }) => {
    let param = key;
    let filterValue = value ? `${param}:"${value}"` : undefined;

    if (key === 'name' && filterValue) filterValue = `${param}:"${value}*"`;
    if (key === 'set') param = 'set.id';
    if (value === '0') value = undefined;

    setFilter((prev) => ({ ...prev, [key]: filterValue }));
    replace(getNewRoute({ [key]: value }));
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex h-[38px] gap-3">
        <input
          type="text"
          placeholder="🔍 Search Trading Card"
          className="h-full w-full rounded-md bg-slate-200 px-3 dark:bg-dark-base lg:w-52 dark:lg:ring-1 dark:lg:ring-dark-light"
          onInput={setKeyword}
          defaultValue={query.name}
        />
        <div className="flex">
          <button
            type="button"
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-md border text-2xl lg:hidden',
              isFiltered && 'bg-emerald-50 dark:bg-transparent',
            )}
            onClick={() => setShowFilter(!showFilter)}
            title="Filter"
            aria-label="Filter"
          >
            ⚙️
          </button>
          <button
            type="button"
            className={clsx(
              'absolute top-2.5 hidden h-10 w-10 items-center justify-center rounded-md border border-slate-500 text-2xl shadow group-focus-within:flex lg:!hidden',
              isFiltered && 'bg-emerald-50 dark:bg-transparent',
            )}
            title="Filter"
            aria-label="Filter"
          >
            ⚙️
          </button>
          <div
            className={clsx(
              'absolute top-1.5 right-2 m-px h-3 w-3 rounded-full bg-emerald-500 lg:hidden',
              isFiltered ? 'block' : 'hidden',
            )}
          />
        </div>
      </div>
      <div className="group flex flex-row">
        <div
          id="wrapper-filter"
          className={clsx(
            'absolute inset-x-0 top-14 mt-0.5 grid-cols-2 gap-2.5 border-b bg-slate-50/80 py-3 px-3.5 backdrop-blur transition-all dark:bg-dark-light/70 lg:relative lg:!inset-auto lg:z-auto lg:m-0 lg:flex lg:border-0 lg:!bg-transparent lg:p-0 lg:backdrop-blur-0',
            showFilter ? 'grid' : 'hidden',
          )}
        >
          <select
            value={query.set}
            onChange={({ target }) => onChangeFilter({ key: 'set', value: target.value })}
            className="mx-px h-[38px] rounded-md border-x-[12px] border-white bg-white ring-1 ring-gray-200 dark:border-dark-base dark:bg-dark-base dark:ring-dark-light"
          >
            <option value="0">All Sets</option>
            {querySet.data?.sets.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={query.types}
            onChange={({ target }) => onChangeFilter({ key: 'types', value: target.value })}
            className="mx-px h-[38px] rounded-md border-x-[12px] border-white bg-white ring-1 ring-gray-200 dark:border-dark-base dark:bg-dark-base dark:ring-dark-light"
          >
            <option value="0">All Types</option>
            {queryType.data?.types.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={query.subtypes}
            onChange={({ target }) => onChangeFilter({ key: 'subtypes', value: target.value })}
            className="mx-px h-[38px] rounded-md border-x-[12px] border-white bg-white ring-1 ring-gray-200 dark:border-dark-base dark:bg-dark-base dark:ring-dark-light"
          >
            <option value="0">All SubTypes</option>
            {querySubType.data?.subtypes.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={query.supertype}
            onChange={({ target }) => onChangeFilter({ key: 'supertype', value: target.value })}
            className="mx-px h-[38px] rounded-md border-x-[12px] border-white bg-white ring-1 ring-gray-200 dark:border-dark-base dark:bg-dark-base dark:ring-dark-light"
          >
            <option value="0">All SuperTypes</option>
            {querySuperType.data?.supertypes.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={query.rarity}
            onChange={({ target }) => onChangeFilter({ key: 'rarity', value: target.value })}
            className="mx-px h-[38px] rounded-md border-x-[12px] border-white bg-white ring-1 ring-gray-200 dark:border-dark-base dark:bg-dark-base dark:ring-dark-light"
          >
            <option value="0">All Rarities</option>
            {queryRarity.data?.rarities.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="absolute inset-x-0 top-0 -z-10 h-[60px] border-b bg-white dark:bg-dark-light lg:hidden" />
      </div>
    </div>
  );
}
