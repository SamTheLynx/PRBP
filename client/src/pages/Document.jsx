import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { useParams } from 'react-router-dom';
import React from 'react';
  // Create styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      color: "black",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: window.innerHeight, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
  });
  
  const PDFDocument = () => {
    // Accessing URL parameters
    const { id, name } = useParams();
  
    return (
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>ID: {id}</Text>
            </View>
            <View style={styles.section}>
              <Text>Business Name: {name}</Text>
            </View>
            <View style={styles.section}>
              <Text>You are finally certified to operate your restaurant!</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  };

  export default PDFDocument;