import { StyleSheet, Text, View, Alert, Platform } from 'react-native';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import Button from '../utils/button';
import axios from 'axios';
import { ENV } from '../utils/ENV';
import { useAppSelector } from '../redux/reduxhooks';

const AttendanceForm = () => {
  const [file, setFile] = React.useState<any>(null);
  const token = useAppSelector((state) => state.user.token);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: '*/*', // You can restrict to CSV: 'text/csv'
      });

      if (res.canceled) {
        console.log('User cancelled');
        return;
      }

      const pickedFile = res.assets[0];

      if (pickedFile.size && pickedFile.size > 5 * 1024 * 1024) {
        Alert.alert('File too large', 'Please select a file smaller than 5 MB');
        return;
      }

      setFile(pickedFile);
      Alert.alert('File selected', `File: ${pickedFile.name}`);
      console.log('File picked:', pickedFile);
    } catch (error) {
      console.error('Document picker error:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const uploadDocument = async () => {
    if (!file) {
      Alert.alert('No file selected', 'Please choose a file to upload');
      return;
    }

    try {
      const formData = new FormData();

      if (Platform.OS === 'web') {
        // Web platform: Fetch blob and create File object
        console.log('Web platform detected, processing file...');
        
        const response = await fetch(file.uri);
        const blob = await response.blob();
        
        const fileObject = new File(
          [blob],
          file.name || 'attendance.csv',
          { type: file.mimeType || 'text/csv' }
        );
        
        console.log('File object created:', {
          name: fileObject.name,
          type: fileObject.type,
          size: fileObject.size
        });
        
        formData.append('file', fileObject);
      } else {
        // Native platform (iOS/Android)
        console.log('Native platform detected, processing file...');
        
        const fileToUpload = {
          uri: file.uri,
          type: file.mimeType || 'text/csv',
          name: file.name || 'attendance.csv',
        };
        
        console.log('File to upload:', fileToUpload);
        formData.append('file', fileToUpload as any);
      }

      console.log('Sending request to:', `${ENV.BASE_URL}/api/class/attendance`);

      const response = await axios.post(
        `${ENV.BASE_URL}/api/class/attendance`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type manually - axios will set it with boundary
          },
        }
      );

      console.log('Upload response:', response.data);

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Attendance uploaded successfully!');
        setFile(null);
      }
    } catch (error: any) {
      console.error('Upload error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      const message =
        error.response?.data?.message || 
        error.message || 
        'Failed to upload attendance file';
      
      Alert.alert('Upload Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          title={file ? 'Change File' : 'Select File'} 
          onPress={pickDocument} 
          width={150} 
        />
        {file && (
          <Text style={styles.fileInfo}>
            Selected: {file.name}
          </Text>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title='Upload Attendance' 
          onPress={uploadDocument} 
          width={150}
          disabled={!file}
        />
      </View>
    </View>
  );
};

export default AttendanceForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  buttonContainer: {
    gap: 10,
  },
  fileInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});