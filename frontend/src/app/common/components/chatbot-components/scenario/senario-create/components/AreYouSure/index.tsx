'use client';
import React, { useEffect, useState } from 'react';

function AreYouSure({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        'You have unsaved changes. Are you sure you want to leave?';
      event.preventDefault();
      event.returnValue = message; // Certaines versions de Chrome nécessitent cette ligne
      return message; // Pour la compatibilité avec les anciens navigateurs
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.onbeforeunload = null;
    };
  }, []);

  return <>{children}</>;
}

export default AreYouSure;
