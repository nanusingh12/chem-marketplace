import React, { useEffect, useCallback } from 'react';

const GoogleTranslate = () => {
  // Initialize Google Translate
  const initializeGoogleTranslate = useCallback(() => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement({
        pageLanguage: 'fa',
        includedLanguages: 'en,fa,ar,es,fr,de,it,zh-CN,ru,ja,ko,tr,hi',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        gaTrack: true,
        gaId: 'UA-XXXXX-Y' // Replace with your Analytics ID if needed
      }, 'google_translate_element');
    }
  }, []);

  // Load Google Translate script
  useEffect(() => {
    const scriptId = 'google-translate-script';
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }

    // Define the callback function globally
    window.googleTranslateElementInit = initializeGoogleTranslate;

    // Cleanup function
    return () => {
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, [initializeGoogleTranslate]);

  // Handle language change
  const handleLanguageChange = useCallback((languageCode) => {
    if (window.google && window.google.translate) {
      const selectField = document.querySelector('.goog-te-combo');
      if (selectField) {
        selectField.value = languageCode;
        selectField.dispatchEvent(new Event('change'));
      }
    }
  }, []);

  return (
    <div className="language-selector-container">
      {/* Google Translate Widget */}
      <div 
        id="google_translate_element" 
        style={{ 
          display: 'inline-block',
          margin: '0 var(--space-2)'
        }}
      />
      
      {/* Optional: Custom language buttons that trigger Google Translate */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-2)',
        alignItems: 'center'
      }}>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => handleLanguageChange('fa')}
          title="فارسی"
        >
          🇮🇷 فارسی
        </button>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => handleLanguageChange('en')}
          title="English"
        >
          🇺🇸 English
        </button>
      </div>
    </div>
  );
};

export default GoogleTranslate;