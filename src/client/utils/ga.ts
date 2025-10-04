import { useGtag} from 'vue-gtag-next';

export function logEvent(name: string, params: Record<string, any>) {
  const gtag = useGtag();
  gtag.event(name, params);
}
