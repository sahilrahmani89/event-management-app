import { useRef, useCallback } from 'react';

type Refs = {
  [key: string]: HTMLElement | null;
};

type RegisterRef = (name: string, ref: HTMLElement | null) => void;


type ScrollToSection = (name: string) => void;

const useSectionRefs = () => {

  const refs = useRef<Refs>({});

 
  const registerRef: RegisterRef = useCallback((name, ref) => {
    refs.current[name] = ref;
  }, []);

  const scrollToSection: ScrollToSection = useCallback((name) => {
    refs.current[name]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return { registerRef, scrollToSection };
};

export default useSectionRefs;