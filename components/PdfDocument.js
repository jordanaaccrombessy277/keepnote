import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})
export const PdfDocument = ({ name, email, profileImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image
          src={profileImage}
          width={'100'}
          height={'100'}
          alt="profile image"
        />
        <Text>Profile</Text>
      </View>
      <View style={styles.section}>
        <Text>Nom : {name}</Text>
        <Text>Email : {email}</Text>
      </View>
    </Page>
  </Document>
)
