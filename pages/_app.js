function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        ::-webkit-scrollbar {
          width: .5em;
        }
         
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 6px #F91024;
        }
         
        ::-webkit-scrollbar-thumb {
          background-color: #364966;
          outline: 1px solid #364966y;
        }
        
        /* ./App fit Height */  
        
      `}</style>
    );
  }

export default function MyApp ({Component, pageProps}){
   
    return (
        <>
        <GlobalStyle/>
        <Component{...pageProps}/>
        </>
        
    )
}