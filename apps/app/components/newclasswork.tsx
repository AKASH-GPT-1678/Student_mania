import React, { useState, } from 'react';
import {

    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import Button from '../utils/button';
import axios from 'axios';
import { ENV } from '../utils/ENV';
import { useAppSelector } from '../redux/reduxhooks';

export default function AssignmentForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<any>(null);
    const [dueDate, setDueDate] = useState(new Date().toISOString());
    const [classId, setClassId] = useState('d8c36ddc-4358-4b39-be31-233593e18b53');
    const [selectedRecipients, setSelectedRecipients] = useState(['Akash', 'All students']);
    const token = useAppSelector((state) => state.user.token);

const pickDocument = async () => {
  try {
    const res = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: '*/*',
    });

    // Check if user cancelled
    if (res.canceled) {
      console.log('User cancelled');
      return;
    }

    // Access the first asset from the assets array
    const pickedFile = res.assets[0];

    if (pickedFile.size && pickedFile.size > 5 * 1024 * 1024) {
      Alert.alert('File too large', 'Please select a file smaller than 5 MB');
      return;
    }

    setFile(pickedFile);
    Alert.alert('File selected', `File: ${pickedFile.name}`);
  } catch (error) {
    console.error(error);
  }
};
    const toggleRecipient = (name: string) => {
        setSelectedRecipients(prev =>
            prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
        );
    };







const handleSubmit = async () => {
  const formData = new FormData();

  if (file) {
    // React Native FormData expects the file object in this specific format
    formData.append("file", {
      uri: file.uri,
      type: file.mimeType || file.type || "application/octet-stream",
      name: file.name || "upload",
    } as any);
  }

  formData.append("title", title);
  formData.append("description", description);
  formData.append("dueDate", dueDate);
  formData.append("classId", classId);

  try {
    const response = await axios.post(`${ENV.BASE_URL}/class/assignments`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Add this header
      },
    });

    console.log("Upload success:", response.data);
  } catch (err: any) {
    console.log("Upload error:", err.response?.data || err.message);
  }
};

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>

                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.iconText}>✕</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.assignButton} onPress={handleSubmit}>
                        <Text style={styles.assignText}>Assign</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.body}>

                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Assignment title (required)"
                        placeholderTextColor="#9aa0a6"
                        style={styles.titleInput}
                    />

                    {/* Recipients chips */}
                    <View style={styles.chipsRow}>
                        <View style={styles.chipsIcon}>
                            <Text style={{ fontSize: 18 }}>👥</Text>
                        </View>
                        <View style={styles.chipsWrap}>
                            {['Akash', 'All students'].map(name => {
                                const selected = selectedRecipients.includes(name);
                                return (
                                    <TouchableOpacity
                                        key={name}
                                        activeOpacity={0.8}
                                        onPress={() => toggleRecipient(name)}
                                        style={[styles.chip, selected && styles.chipSelected]}
                                    >
                                        <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{name}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <Text>Upload Documents</Text>

                        <Button title="Pick Document" onPress={pickDocument} width={120} />


                    </View>


                    <View style={styles.descriptionBox}>
                        <Text style={styles.descriptionLabel}>Description</Text>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Add a description"
                            placeholderTextColor="#c3c6c8"
                            multiline
                            style={styles.descriptionInput}
                        />
                    </View>


                    <View style={styles.rowSpace}>
                        <TouchableOpacity style={styles.attachmentButton}>
                            <Text style={styles.attachmentText}>📎  Add attachment</Text>
                        </TouchableOpacity>

                        <View style={styles.pointsPill}>
                            <Text style={styles.pointsText}>{dueDate} points</Text>
                            <TouchableOpacity style={styles.pointsX} onPress={() => setDueDate('')}>
                                <Text style={styles.pointsXText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <TouchableOpacity style={styles.linkRow}>
                        <Text style={styles.linkText}>Set due date</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkRow}>
                        <Text style={styles.linkText}>Add topic</Text>
                    </TouchableOpacity>


                    <View style={{ height: 200 }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#ffffff' },
    container: { flex: 1 },
    topBar: {
        height: 64,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6e6',
        backgroundColor: '#f8fafb',
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: { fontSize: 18, color: '#333' },
    assignButton: {
        backgroundColor: '#1e88e5',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 22,
    },
    assignText: { color: 'white', fontWeight: '600' },

    body: { padding: 16 },
    titleInput: {
        height: 56,
        fontSize: 20,
        paddingHorizontal: 6,
        color: '#111',
    },

    chipsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 12 },
    chipsIcon: { width: 36, alignItems: 'center' },
    chipsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        borderRadius: 24,
        backgroundColor: '#e9f0f7',
    },
    chipSelected: { backgroundColor: '#cfe9ff' },
    chipText: { color: '#1b3a52' },
    chipTextSelected: { color: '#08306b', fontWeight: '600' },

    descriptionBox: {
        borderWidth: 1,
        borderColor: '#e6e6e6',
        borderRadius: 8,
        padding: 12,
        minHeight: 96,
        marginBottom: 14,
        backgroundColor: 'white',
    },
    descriptionLabel: { position: 'absolute', left: 18, top: 10, color: '#6f7781' },
    descriptionInput: { marginTop: 18, lineHeight: 20, color: '#222' },

    rowSpace: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
    attachmentButton: { paddingVertical: 8 },
    attachmentText: { color: '#1a73e8', fontWeight: '500' },
    pointsPill: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 18 },
    pointsText: { marginRight: 8, color: '#333' },
    pointsX: { paddingLeft: 6 },
    pointsXText: { color: '#666' },

    linkRow: { paddingVertical: 18 },
    linkText: { color: '#1a73e8', fontWeight: '500' },
});

