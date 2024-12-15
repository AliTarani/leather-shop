import { useSyncExternalStore } from "react";

export function makeMediaQueryStore(mediaQuery: string) {
  function getSnapshot() {
    return window.matchMedia(mediaQuery).matches;
  }

  function subscribe(callback: () => void) {
    const mediaQueryList = window.matchMedia(mediaQuery);
    mediaQueryList.addEventListener("change", callback);
    return () => {
      mediaQueryList.removeEventListener("change", callback);
    };
  }

  return function useMediaQuery() {
    return useSyncExternalStore(subscribe, getSnapshot);
  };
}

//usage
/* 
const useMediaQuery = makeMediaQueryStore('(max-width: 768px)');

function MyComponent() {
    const isSmallScreen = useMediaQuery();

    return (
        <div>
            {isSmallScreen ? (
                <p>You are on a small screen!</p>
            ) : (
                <p>You are on a large screen!</p>
            )}
        </div>
    );
}
*/
