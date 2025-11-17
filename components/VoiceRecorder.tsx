"use client";

import { useState, useRef } from "react";
import { FiMic, FiStopCircle, FiPlay } from "react-icons/fi";

export default function VoiceRecorder({ onRecorded }: { onRecorded: (file: File) => void }) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioChunksRef = useRef<any[]>([]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const file = new File([audioBlob], `voice-note-${Date.now()}.webm`, {
        type: "audio/webm",
      });

      setAudioURL(URL.createObjectURL(file));
      onRecorded(file);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="mt-6 bg-purple-50 p-4 rounded-xl border border-purple-200">
      <p className="text-sm text-purple-700 font-medium mb-2">
        Optional Voice Note
      </p>

      {!recording && (
        <button
          onClick={startRecording}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700"
        >
          <FiMic size={18} />
          Start Recording
        </button>
      )}

      {recording && (
        <button
          onClick={stopRecording}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
        >
          <FiStopCircle size={20} />
          Stop Recording
        </button>
      )}

      {audioURL && (
        <div className="mt-3 flex items-center gap-3">
          <audio controls src={audioURL} className="w-full"></audio>
        </div>
      )}
    </div>
  );
}
