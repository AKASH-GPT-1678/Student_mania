import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';

export default function MyTextArea() {
  const [text, setText] = useState('');

  return (
    <SafeScreenWrapper>
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
    </SafeScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    marginTop : 10
  },
  textArea: {
    height: "100%",
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top', // keeps text at top-left corner
    borderRadius: 10,
  },
});
