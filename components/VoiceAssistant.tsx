import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, X, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<string>('در انتظار دستور...');
  // Fix: nextStartTime acts as a cursor to track the end of the audio playback queue.
  // Using a ref avoids stale closures and ensures smooth, gapless playback.
  const nextStartTimeRef = useRef(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Fix: Implemented manual decode function for base64 as per GenAI guidelines
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  // Fix: Implemented manual encode function for base64 as per GenAI guidelines
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Fix: Implemented manual PCM decoding as per GenAI guidelines to handle raw audio streams
  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const startAssistant = async () => {
    try {
      setIsActive(true);
      setStatus('در حال اتصال به هوش مصنوعی...');
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const inputCtx = new AudioContext({ sampleRate: 16000 });
      const outputCtx = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setStatus('آماده شنیدن (فارسی صحبت کنید)');
            setIsListening(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              // Fix: Use manual encode function to convert PCM audio to base64
              const base64Data = encode(new Uint8Array(int16.buffer));
              // CRITICAL: Solely rely on sessionPromise resolves and then call `session.sendRealtimeInput`
              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  media: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64EncodedAudioString =
              message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString && audioContextRef.current) {
              const ctx = audioContextRef.current;
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                ctx,
                24000,
                1,
              );
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              // Fix: Use Ref value to avoid stale closure issues and ensure gapless playback
              const startTime = Math.max(nextStartTimeRef.current, ctx.currentTime);
              source.start(startTime);
              nextStartTimeRef.current = startTime + audioBuffer.duration;
              sourcesRef.current.add(source);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
            }
            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current.values()) {
                source.stop();
                sourcesRef.current.delete(source);
              }
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsActive(false),
          onerror: () => setIsActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'You are a professional assistant for ATA Management System. Speak exclusively in Persian (Farsi). Answer short and helpful. You can help with loans, customers and team management queries.'
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsActive(false);
    }
  };

  const stopAssistant = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsActive(false);
    setIsListening(false);
    nextStartTimeRef.current = 0;
  };

  return (
    <div className="fixed bottom-[2rem] left-[2rem] z-[400] no-print">
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-indigo-100 w-[20rem] flex flex-col items-center gap-4"
          >
            <div className="flex justify-between w-full items-center">
              <span className="text-[0.625rem] font-black text-slate-400 uppercase tracking-widest">Ata Voice Assistant</span>
              <button onClick={stopAssistant} className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><X size={16} /></button>
            </div>
            
            <div className="relative">
              <div className="w-[5rem] h-[5rem] bg-indigo-50 rounded-full flex items-center justify-center relative z-10">
                {isListening ? (
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping" />
                ) : (
                  <Loader2 size={32} className="text-indigo-400 animate-spin" />
                )}
                <Mic size={32} className={isListening ? "text-indigo-600" : "text-slate-300"} />
              </div>
            </div>

            <div className="text-center">
              <p className="text-[0.875rem] font-black text-slate-800 mb-1">{status}</p>
              <div className="flex gap-1 justify-center">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-indigo-600' : 'bg-slate-200'} animate-bounce`} style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={isActive ? stopAssistant : startAssistant}
        className={`w-[4.5rem] h-[4.5rem] rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 ${
          isActive ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-indigo-600 text-white shadow-indigo-200'
        }`}
      >
        {isActive ? <MicOff size={28} /> : <Mic size={28} />}
        {!isActive && (
          <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 p-1 rounded-full shadow-lg">
            <Sparkles size={14} />
          </div>
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;