//components\account\IdProofUpload.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Firestore documents have a hard 1MiB limit, and this field shares the
// document with the rest of the profile. Base64 also inflates the raw file
// size by ~33%, so keep the source file well under that ceiling.
const MAX_FILE_BYTES = 350 * 1024; // 350KB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface IdProofUploadProps {
  user: User;
  initialUrl: string | null;
  onUploaded: (url: string) => void;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function IdProofUpload({ user, initialUrl, onUploaded }: IdProofUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openPicker() {
    inputRef.current?.click();
  }

  // Close the full-image modal on Escape, and only while it's actually open
  useEffect(() => {
    if (!modalOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError(`That file is ${(file.size / 1024).toFixed(0)}KB. ID proof must be under ${MAX_FILE_BYTES / 1024}KB.`);
      return;
    }

    setUploading(true);

    try {
      const dataUrl = await readFileAsDataUrl(file);

      await setDoc(
        doc(db, "users", user.uid),
        { idProofUrl: dataUrl, idProofUploadedAt: serverTimestamp() },
        { merge: true }
      );

      setPreview(dataUrl);
      onUploaded(dataUrl);
    } catch {
      setError("Upload failed. Please try again.");
      setPreview(initialUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {preview ? (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="relative flex min-h-36 w-full items-center justify-center overflow-hidden rounded-lg border border-ink/15 bg-white transition hover:border-ink/30 focus:outline-2 focus:outline-offset-2 focus:outline-ink/40"
            aria-label="View full ID proof image"
          >
            <img
              src={preview}
              alt="ID proof thumbnail"
              className="h-full min-h-36 w-full object-contain"
            />
            {uploading && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white">
                Uploading...
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={openPicker}
            disabled={uploading}
            className="text-sm font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink disabled:opacity-60"
          >
            Replace
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          disabled={uploading}
          className="flex min-h-36 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ink/20 bg-ink/2 px-4 py-8 text-center transition hover:border-ink/40 hover:bg-ink/4 disabled:opacity-60"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink/40"
          >
            <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium text-ink">
            {uploading ? "Uploading..." : "Upload ID proof"}
          </span>
          <span className="text-xs text-ink/50">JPG, PNG, or WEBP — max {MAX_FILE_BYTES / 1024}KB</span>
        </button>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {modalOpen && preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ID proof full image"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={preview}
            alt="ID proof full size"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}