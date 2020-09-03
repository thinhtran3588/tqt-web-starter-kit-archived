import React from 'react';
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import {ServerStyleSheets} from '@material-ui/core/styles';
import {config} from '@app/core/config';

export class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render(): JSX.Element {
    // eslint-disable-next-line no-underscore-dangle
    const lng = (this.props.__NEXT_DATA__.query.lng as string) || 'en';
    return (
      <Html lang={lng}>
        <Head>
          <link
            rel='preload'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
            as='style'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onLoad={"this.onload=null;this.rel='stylesheet'" as any}
          />
          <meta name='application-name' content={config.appName} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={config.appName} />
          <meta name='description' content={config.appDescription} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />
          <link rel='apple-touch-icon' sizes='180x180' href='/images/icons/apple-touch-icon-180x180.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/images/icons/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  // eslint-disable-next-line no-param-reassign
  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/jsx-props-no-spreading
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
