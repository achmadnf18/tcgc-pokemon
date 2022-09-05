/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';

export const convert = ({ Component, style = {}, tag = 'span', className }) =>
  function (props) {
    const container = useRef(null);
    const component = useRef(null);
    const [mounted, setMount] = useState(false);

    useEffect(() => {
      const eventRe = /on([A-Z]+[A-Za-z]*)/;
      const watchRe = /watch([A-Z]+[A-Za-z]*)/;

      component.current = new Component({ target: container.current, props });

      const watchers = [];
      for (const key in props) {
        const eventMatch = key.match(eventRe);
        const watchMatch = key.match(watchRe);

        if (eventMatch && typeof props[key] === 'function') {
          component.current.$on(
            `${eventMatch[1][0].toLowerCase()}${eventMatch[1].slice(1)}`,
            props[key],
          );
        }

        if (watchMatch && typeof props[key] === 'function') {
          watchers.push([`${watchMatch[1][0].toLowerCase()}${watchMatch[1].slice(1)}`, props[key]]);
        }
      }

      if (watchers.length > 0) {
        const { update } = component.current.$$;
        component.current.$$.update = function () {
          watchers.forEach(([name, callback]) => {
            const index = component.current.$$.props[name];
            callback(component.current.$$.ctx[index]);
          });
          Reflect.apply(update, null, arguments);
        };
      }

      return () => {
        component.current.$destroy();
      };
    }, []);

    useEffect(() => {
      if (!mounted) {
        setMount(true);
        return;
      }

      component.current.$set(props);
    }, [props]);

    return React.createElement(tag, { ref: container, style, className });
  };
