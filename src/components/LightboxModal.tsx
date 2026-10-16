import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  title: string | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageSrc,
  title,
  onClose,
}) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full overflow-hidden rounded-[32px] sm:rounded-[40px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] shadow-2xl">
          <img
            src={imageSrc}
            alt={title || '3D Project Preview'}
            className="w-full max-h-[75vh] object-contain mx-auto"
          />
        </div>

        {title && (
          <div className="mt-4 flex items-center justify-between w-full px-2 text-[#D7E2EA]">
            <p className="font-medium uppercase tracking-wider text-sm sm:text-base">
              {title}
            </p>
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
            >
              <span>Open Original</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
