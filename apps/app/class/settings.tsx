import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react'

const Settings = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteClass = () => {
    // Implement delete logic here
    console.log('Class deleted')
    setShowDeleteModal(false)
  }
  interface SettingItemProps {
    icon: string;
    title: string;
    description: string;
    onPress: () => void;
  }

  const SettingItem = ({ icon, title, description, onPress } : SettingItemProps) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingIcon}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Class Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your class preferences</Text>
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GENERAL</Text>
          
          <SettingItem
            icon="📝"
            title="Class Information"
            description="Edit class name, description, and details"
            onPress={() => console.log('Navigate to class info')}
          />
          
          <SettingItem
            icon="👥"
            title="Manage Members"
            description="Add, remove, or manage student roles"
            onPress={() => console.log('Navigate to members')}
          />
          
          <SettingItem
            icon="🎨"
            title="Class Appearance"
            description="Customize theme and display options"
            onPress={() => console.log('Navigate to appearance')}
          />
        </View>

        {/* Content Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTENT</Text>
          
          <SettingItem
            icon="📚"
            title="Assignments"
            description="View and manage all assignments"
            onPress={() => console.log('Navigate to assignments')}
          />
          
          <SettingItem
            icon="📢"
            title="Announcements"
            description="Manage class announcements and posts"
            onPress={() => console.log('Navigate to announcements')}
          />
          
          <SettingItem
            icon="📎"
            title="Shared Files"
            description="Organize and manage class materials"
            onPress={() => console.log('Navigate to files')}
          />
          
          <SettingItem
            icon="💬"
            title="Chat Settings"
            description="Configure messaging and notifications"
            onPress={() => console.log('Navigate to chat settings')}
          />
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRIVACY & PERMISSIONS</Text>
          
          <SettingItem
            icon="🔒"
            title="Privacy"
            description="Control who can join and view content"
            onPress={() => console.log('Navigate to privacy')}
          />
          
          <SettingItem
            icon="🔔"
            title="Notifications"
            description="Manage notification preferences"
            onPress={() => console.log('Navigate to notifications')}
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <Text style={styles.sectionTitle}>DANGER ZONE</Text>
          
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowDeleteModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteIcon}>🗑️</Text>
            <View style={styles.deleteContent}>
              <Text style={styles.deleteTitle}>Delete Class</Text>
              <Text style={styles.deleteDescription}>Permanently remove this class and all its data</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>⚠️</Text>
            <Text style={styles.modalTitle}>Delete Class?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete this class? This action cannot be undone. All assignments, announcements, messages, and files will be permanently deleted.
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={handleDeleteClass}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmDeleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 16,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
  },
  chevron: {
    fontSize: 24,
    color: '#ccc',
    marginLeft: 8,
  },
  dangerSection: {
    marginTop: 32,
    marginBottom: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#fee',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  deleteIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  deleteContent: {
    flex: 1,
  },
  deleteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 2,
  },
  deleteDescription: {
    fontSize: 13,
    color: '#666',
  },
  bottomSpacing: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  confirmDeleteButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#dc2626',
    alignItems: 'center',
  },
  confirmDeleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
})