import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 16, marginBottom: 5 },
  content: { fontSize: 12, marginBottom: 10 },
})

export const NotesDocument = ({ name, notes, profileImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image
          src={profileImage}
          width={'100'}
          height={'100'}
          alt="profile image"
        />
        <Text>Profile : {name}</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Liste des notes</Text>
      {notes.map((note) => (
        <View key={note.id} style={styles.section}>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.content}>{note.content}</Text>
        </View>
      ))}
    </Page>
  </Document>
)
