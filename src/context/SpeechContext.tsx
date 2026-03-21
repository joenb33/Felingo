import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { textForTtsPlayback, sha256HexShortSync } from "@/lib/ttsHash";

export interface SpeechContextValue {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  speakingText: string | null;
  isSupported: boolean;
}

const SpeechContext = createContext<SpeechContextValue | null>(null);

function resolveAudioUrl(hash: string): string {
  const base = import.meta.env.BASE_URL ?? "/";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}audio/${hash}.mp3`;
}

export function SpeechProvider({ children }: { children: ReactNode }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const canUseAudio = useMemo(() => typeof Audio !== "undefined", []);
  const canUseSpeech = useMemo(
    () => typeof window !== "undefined" && "speechSynthesis" in window,
    [],
  );
  const isSupported = canUseAudio || canUseSpeech;

  useEffect(() => {
    if (!canUseSpeech) return;
    const synth = window.speechSynthesis;
    const load = () => {
      synth.getVoices();
    };
    load();
    synth.addEventListener("voiceschanged", load);
    return () => synth.removeEventListener("voiceschanged", load);
  }, [canUseSpeech]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (canUseSpeech) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingText(null);
  }, [canUseSpeech]);

  const speakWithWebSpeech = useCallback(
    (text: string) => {
      if (!canUseSpeech) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) => v.lang.startsWith("en") && v.localService,
      );
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakingText(text);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingText(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingText(null);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [canUseSpeech],
  );

  const speak = useCallback(
    (raw: string) => {
      const text = textForTtsPlayback(raw);
      if (!text) return;
      stop();
      setSpeakingText(text);

      if (!canUseAudio) {
        speakWithWebSpeech(text);
        return;
      }

      setIsSpeaking(true);

      const hash = sha256HexShortSync(text);
      const url = resolveAudioUrl(hash);
      const audio = new Audio(url);
      audioRef.current = audio;

      const fallback = () => {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
        speakWithWebSpeech(text);
      };

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
        setSpeakingText(null);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        setSpeakingText(null);
        fallback();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsSpeaking(false);
          setSpeakingText(null);
          fallback();
        });
      }
    },
    [canUseAudio, speakWithWebSpeech, stop],
  );

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  const value = useMemo<SpeechContextValue>(
    () => ({
      speak,
      stop,
      isSpeaking,
      speakingText,
      isSupported,
    }),
    [speak, stop, isSpeaking, speakingText, isSupported],
  );

  return (
    <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>
  );
}

export function useSpeech(): SpeechContextValue {
  const ctx = useContext(SpeechContext);
  if (!ctx) {
    throw new Error("useSpeech must be used within a SpeechProvider");
  }
  return ctx;
}
