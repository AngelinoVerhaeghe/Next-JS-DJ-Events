import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* Set up a div with ID modal-root where the modal has to go */}
          {/* To get access because server side rendering dont get access */}
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
