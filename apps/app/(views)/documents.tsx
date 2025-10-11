import { StyleSheet, Text, View, Platform ,Alert } from 'react-native';
import Button from '../utils/button';
import React from 'react';
import SafeScreenWrapper from '../wrapper/safescreenwrapper';
import axios from 'axios';
import { ENV } from '../utils/ENV';
import { useAppSelector } from '../redux/reduxhooks';
import * as DocumentPicker from 'expo-document-picker';


const Documents = () => {
    const [file, setFile] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const token = useAppSelector((state) => state.user.token);
    const [upload, setUpload] = React.useState<boolean>(false)


    const pickDocument = async () => {
        try {
            const res: any = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: true,
                type: '*/*',
            });

            if (res.type === 'cancel') {
                console.log('User cancelled');
                return;
            }

            if (res.size && res.size > 5 * 1024 * 1024) {
                Alert.alert('File too large', 'Please select a file smaller than 5 MB');
                return;
            }

            setFile(res);
            Alert.alert('File selected', `File: ${res.name}`);
        } catch (error) {
            console.error(error);
        }
    };



    const saveNewDocument = async () => {
        if (!file) {
            Alert.alert('No file selected', 'Please choose a file to upload');
            return;
        }

        try {
            const formData = new FormData();

            const fileToUpload = {
                uri: file.uri,
                type: file.type || 'application/octet-stream',
                name: file.name || 'document',
            };

            formData.append('image', fileToUpload as any);

            setLoading(true);

            const response = await axios.post(`${ENV.BASE_URL}/api/document/create`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Document uploaded successfully!');
                setFile(null);
            }

        } catch (error) {
            console.error(error);
            setError(true);
            Alert.alert('Upload failed', 'Something went wrong while uploading');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>


            {upload && <View style={styles.container}>
                <Text style={styles.title}>Upload Documents</Text>

                <Button title="Pick Document" onPress={pickDocument} width={120}/>

                {file && <Text style={styles.fileName}>Selected: {file.name}</Text>}

                <View style={{ marginTop: 20 }}>
                    <Button
                        title={loading ? 'Uploading...' : 'Upload File'}
                        onPress={saveNewDocument}
                        disabled={loading}
                        width={120}
                    />
                </View>
            </View>}

            <View style={{ marginTop: 20, flex: 1 }}>
                <Button title='Upload' onPress={() => { }} width={120} >
                    </Button>

            </View>
        </View>


    );
};

export default Documents;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 30


    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    fileName: {
        marginTop: 10,
        textAlign: 'center',
    },
});
