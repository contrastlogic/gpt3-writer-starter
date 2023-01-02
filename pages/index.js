import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

import { useState, useRef, useEffect } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI... ring, ring...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI has replied... ", output.text)

    function formatOutput() {
        return (<div dangerouslySetInnerHTML={{ __html: output.text.replace(/\n/g, '</br>') }} />
        );
      }


    setApiOutput(formatOutput);
    setIsGenerating(false);

  };


  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root root-fire-bg">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1 className="burning active">Inbox Inferno</h1>
          </div>
          <div className="header-subtitle">
            <h2>The AI-Powered Spam Burner that Delivers a Scalding Response</h2>
          </div>
          <p>With Inbox Inferno, we'll turn up the heat on pesky spammers and unsolicited messages. One scorching burn from us and they'll think twice before sending another message.</p>
        </div>
        <div className="prompt-container">
          {isGenerating ? (
            <div className="fire">
              <div className="fire-left">
                <div className="main-fire"></div>
                <div className="particle-fire"></div>
              </div>
              <div className="fire-main">
                <div className="main-fire"></div>
                <div className="particle-fire"></div>
              </div>
              <div className="fire-right">
                <div className="main-fire"></div>
                <div className="particle-fire"></div>
              </div>
              <div className="fire-bottom">
                <div className="main-fire"></div>
              </div>
            </div>

          ) : (
            <textarea
            className="prompt-box"
            placeholder="What are we responding to?"
            value={userInput}
            onChange={onUserChangedText}
          />
          )}


        <div className="prompt-buttons">
          <a className={isGenerating ? 'generate-button-hidden' : 'generate-button'} onClick={callGenerateEndpoint}><p className="burnText">BURN!</p></a>
        </div>


          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>The Burn</h3>
                </div>
              </div>
            <div className="output-content">
              <div className="alert alert-danger" role="alert">{apiOutput}</div>
              
            </div>
          </div>
        )}

        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
