function getBasename() {
  let basename = '/';
  if (window.blocklet && window.blocklet.prefix) {
    basename = window.blocklet.prefix;
  }
  return basename;
}
export function useQuery() {
  return new URLSearchParams(window.location.search);
}

export const basename = getBasename();
