declare module 'remark-link-card' {
  import type {Plugin} from 'unified';
  const remarkLinkCard: Plugin<[{cache?: boolean; shortenUrl?: boolean}?]>;
  export default remarkLinkCard;
}
