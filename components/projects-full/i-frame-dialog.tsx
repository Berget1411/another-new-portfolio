"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface IFrameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
}

export function IFrameDialog({
  isOpen,
  onClose,
  title,
  url,
}: IFrameDialogProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className='sm:max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-background-secondary'>
        <DialogHeader className='p-4 flex flex-row items-center justify-between border-b border-background-tertiary'>
          <DialogTitle className='text-lg font-medium'>
            {title} Preview
          </DialogTitle>
          <Button variant='icon' size='md' onClick={onClose}>
            <X className='h-4 w-4' />
          </Button>
        </DialogHeader>

        {url ? (
          <div className='relative w-full h-[80vh]'>
            {isLoading && (
              <div className='absolute inset-0 flex items-center justify-center bg-background-secondary'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
              </div>
            )}

            <iframe
              src={url}
              className='w-full h-full border-0'
              onLoad={() => setIsLoading(false)}
              title={`${title} preview`}
              sandbox='allow-same-origin allow-scripts allow-forms'
              referrerPolicy='no-referrer'
            />
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center p-10 h-[80vh] text-center'>
            <div className='text-5xl mb-4'>🚧</div>
            <h3 className='text-2xl font-semibold mb-2'>
              No Preview Available
            </h3>
            <p className='text-text-secondary max-w-md'>
              This project doesn&apos;t have a live preview URL configured.
              Please check the GitHub repository for more details.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
