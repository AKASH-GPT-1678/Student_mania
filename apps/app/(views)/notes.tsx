import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default function MyTextArea() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textArea}
        placeholder="Write something here..."
        multiline
        numberOfLines={28}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textArea: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top', // keeps text at top-left corner
    borderRadius: 10,
  },
});
