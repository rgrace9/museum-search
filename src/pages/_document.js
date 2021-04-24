import Document, { Html, Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
         

        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Julius+Sans+One&family=Parisienne&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&display=swap" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
// import Document, { Html, Head, Main, NextScript } from "next/document";
// import { createGlobalStyle, ServerStyleSheet } from 'styled-components'
// import {  } from 'styled-components';
// export const GlobalStyle = createGlobalStyle`
//   body {
//     color: ${props => (props.whiteColor ? 'white' : '#130D05')};
//   }
// `

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const sheet = new ServerStyleSheet();
//     const initialProps = await Document.getInitialProps(ctx);
//     const page = await ctx.renderPage();
//     return { ...initialProps, ...page, ...styles };
//   }

//   render() {
//     return (
//       <Html lang="en">

//        <GlobalStyle />
//         <body>
//           <Provider>
//             <Main />
//             <NextScript />
//           </Provider>
//         </body>
//       </Html>
//     );
//   }
// }
