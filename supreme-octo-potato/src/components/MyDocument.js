import React from 'react';
import { Document, Page, Text, Image, View, StyleSheet, Font } from '@react-pdf/renderer';

const imageStyle = {
  "background-color": "black"
}

const MyDocument = (props) => (
  <Document>
    <Page style={styles.body} wrap>
      <Text style={styles.header} fixed>
        Image Iterations {new Date().toLocaleString()}
      </Text>
      <View wrap={true}>
        {props.proxyUrls.map((url, idx) => {
          return (
            <View key={'container-' + idx}>
              <Image src={url} style={imageStyle} key={idx + url} debug={true}></Image>
              <Text style={styles.text}>{url}</Text>
              
            </View>
          )
        })}
      </View>
      <View render={({ pageNumber }) => (
        pageNumber % 2 === 0 && (
          <View style={{ background: 'red' }}>
            <Text>I'm only visible in odd pages!</Text>
          </View>
        )
      )} />

    </Page>
  </Document>
);

Font.register(
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  { family: 'Oswald' },
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
export default MyDocument;
// ReactPDF.render(<MyDocument />);
//ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);