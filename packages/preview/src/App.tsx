import './App.css';
import { useEffect, useState } from 'react';
import { highlight } from '@calor/highlighter';
import lightTheme from '@calor/highlighter/themes/github-light.css';
import darkTheme from '@calor/highlighter/themes/github-dark.css';

const exampleCode: Record<string, string> = {
  typescript: 'typescript.ts',
  golang: 'golang.go',
};

const fetchFile = async (path: string) => {
  const res = await fetch(path);
  return await res.text();
};

function App() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('typescript');
  const [code, setCode] = useState('');
  useEffect(() => {
    (async () => {
      const text = await fetchFile(`./examples/${exampleCode[language]}`);
      const highlightedCode = highlight(text);
      setCode(highlightedCode);
    })();
  }, [language]);
  return (
    <>
      <style>{theme === 'light' ? lightTheme : darkTheme}</style>
      <h1>🔥 calor preview</h1>
      <div className={'btn-container'}>
        <button
          onClick={() =>
            setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
          }
        >
          theme: {theme}
        </button>
      </div>
      <div className={'btn-container'}>
        {Object.keys(exampleCode).map((lang) => (
          <button
            key={lang}
            className={language === lang ? 'selected' : ''}
            onClick={() => setLanguage(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: code }}></div>
    </>
  );
}

export default App;
